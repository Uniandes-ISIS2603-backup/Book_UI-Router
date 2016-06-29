(function (ng) {
    var mod = ng.module("authorModule");

    mod.controller("authorCtrl", ["$scope", "authorService",'$state', '$stateParams', function ($scope, svc, $state, $stateParams) {
            
            if($stateParams.aid != null)
            {     
                    svc.fetchRecord($stateParams.aid).then(function (response) {
                    $scope.currentRecord = response.data;});  
            }
            else
            {
                $scope.currentRecord = {
                    id: undefined /*Tipo Long. El valor se asigna en el backend*/,
                    name: '' /*Tipo String*/,
                    birthDate: '' /*Tipo String*/
                };
                $scope.records = [];
                $scope.alerts = [];
            }

            $scope.today = function () {
                $scope.value = new Date();
            };

            $scope.clear = function () {
                $scope.value = null;
            };
            
            //Función usada para el calendario
            $scope.open = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened = true;
            }

            //Alertas
            this.closeAlert = function (index) {
                $scope.alerts.splice(index, 1);
            };

            function showMessage(msg, type) {
                var types = ["info", "danger", "warning", "success"];
                if (types.some(function (rc) {
                    return type === rc;
                })) {
                    $scope.alerts.push({type: type, msg: msg});
                }
            }

            this.showError = function (msg) {
                showMessage(msg, "danger");
            };

            var self = this;
            function responseError(response) {
                self.showError(response.data);
            }

            //Variables para el controlador
            this.readOnly = false;
            this.editMode = false;

            this.changeTab = function (tab) {
                $scope.tab = tab;
            };

            //Ejemplo alerta
            if($stateParams.aid==null)
            {
            showMessage("Bienvenido!, Esto es un ejemplo para mostrar un mensaje de atención", "warning");
            }

            this.createRecord = function () {
                this.editMode = true;
                $scope.currentRecord = {};
                $scope.$broadcast("post-create", $scope.currentRecord);
            };

            this.editRecord = function (record) {
                return svc.fetchRecord(record.id).then(function (response) {
                    $scope.currentRecord = response.data;
                    self.editMode = true;
                    $state.go("author.edit", {aid:record.id}, {reload: false}); 
                    $scope.$broadcast("post-edit", $scope.currentRecord);
                    return response;
                }, responseError);
            };

            this.fetchRecords = function () {
                return svc.fetchRecords().then(function (response) {
                    $scope.records = response.data;
                    $scope.currentRecord = {};
                    self.editMode = false;
                    return response;
                }, responseError);
            };
            this.saveRecord = function () {
                return svc.saveRecord($scope.currentRecord).then(function () {
                    self.fetchRecords();
                    //Transición al estado author
                    $state.go("author", {}, {reload: true});                                                           
                }, responseError);
            };
            this.deleteRecord = function (record) {
                return svc.deleteRecord(record.id).then(function () {
                    self.fetchRecords();
                }, responseError);
            };

            if($stateParams.aid==null)
            {
            this.fetchRecords();
            }

            function updateBooks(event, args) {
                $scope.currentRecord.books = args;
            }
            ;

            $scope.$on('updateBooks', updateBooks);
        }]);

})(window.angular);