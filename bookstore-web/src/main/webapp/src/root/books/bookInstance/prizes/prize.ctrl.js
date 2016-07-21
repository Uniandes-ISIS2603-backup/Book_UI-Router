(function (ng) {

    var mod = ng.module("prizeModule");

    mod.controller("prizeCtrl", ["$scope", '$state', '$stateParams', "$http", "prizeContext",
        function ($scope, $state, $stateParams, $http, context) {

            $scope.refId = $stateParams.bid;
            bookId = $scope.refId;
            $http.get(context + "/" + bookId + "/prizes").then(function (response)
            {
                $scope.records = response.data;
            }, responseError);

            $scope.alerts = [];

            $scope.today = function () {
                $scope.value = new Date();
            };

            $scope.clear = function () {
                $scope.value = null;
            };

            $scope.open = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();

                $scope.opened = true;
            };

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
                bookId = $scope.refId;
                prizeId = record.id;
                return $http.get(context + "/" + bookId + "/prizes/" + prizeId).then(function (response) {
                    $scope.currentRecord = response.data;
                    self.editMode = true;
                    return response;
                }, responseError);
            };

            this.fetchRecords = function () {
                bookId = $scope.refId;
                return $http.get(context + "/" + bookId + "/prizes").then(function (response) {
                    $scope.records = response.data;
                    $scope.currentRecord = {};
                    self.editMode = false;
                    return response;
                }, responseError);
            };

            this.saveRecord = function () {
                bookId = $scope.refId;
                prize = $scope.currentRecord;
                if (prize.id) {
                    return $http.put(context + "/" + bookId + "/prizes/" + prize.id, prize).then(function () {
                        self.fetchRecords();
                    }, responseError);
                } else {
                    return $http.post(context + "/" + bookId + "/prizes", prize).then(function () {
                        self.fetchRecords();
                    }, responseError);
                }

            };

            this.deleteRecord = function (record) {
                bookId = $scope.refId;
                prizeId = record.id;
                $http.delete(context + "/" + bookId + "/prizes/" + prizeId).then(function () {
                    self.fetchRecords();
                }, responseError);
            };
        }]);
})(window.angular);