(function (ng) {
    var mod = ng.module("authorsModule");

    mod.controller("authorInstanceCtrl", ["$scope", '$state', '$stateParams', '$http', 'authorsContext', function ($scope, $state, $stateParams, $http, context) {


            id = $stateParams.aid;
            $http.get(context + "/" + id).then(function (response) {
                $scope.currentRecord = response.data;
            });


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


            this.createRecord = function () {
                this.editMode = true;
                $scope.currentRecord = {};
            };

            this.editRecord = function (record) {
                id = record.id;
                return $http.get(context + "/" + id).then(function (response) {
                    $scope.currentRecord = response.data;
                    self.editMode = true;
                    $state.go("authors.authorInstance", {aid: record.id}, {reload: false});
                    return response;
                }, responseError);
            };

            this.fetchRecords = function () {
                return $http.get(context).then(function (response) {
                    $scope.records = response.data;
                    $scope.currentRecord = {};
                    self.editMode = false;
                    return response;
                }, responseError);
            };
            this.saveRecord = function () {
                currentRecord = $scope.currentRecord;
                console.log($state);
                if ($stateParams.aid)
                {
                    console.log('entra');
                    return $http.put(context + "/" + currentRecord.id, currentRecord)
                            .then(function () {
                                self.fetchRecords();
                                //Transición al estado author
                                $state.go("authors", {}, {reload: true});
                            }, responseError);
                } else
                {
                    return $http.post(context, currentRecord).then(function () {
                        self.fetchRecords();
                        //Transición al estado author
                        $state.go("authors", {}, {reload: true});
                    }, responseError);
                }
            };
            this.deleteRecord = function (record) {
                id = record.id;
                return $http.delete(context + "/" + id).then(function () {
                    self.fetchRecords();
                }, responseError);
            };

        }]);

})(window.angular);