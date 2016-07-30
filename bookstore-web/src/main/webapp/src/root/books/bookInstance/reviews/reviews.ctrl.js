(function (ng) {

    var mod = ng.module("booksModule");

    mod.controller("reviewsCtrl", ["$scope",'$state','$stateParams',"$http", "bookContext", function ($scope, $state, $stateParams, $http, context) {
                      
            $scope.currentRecord = {};
            $scope.records = [];
            $scope.refName = "reviews";
            $scope.alerts = [];
            $scope.refId = $stateParams.bid;

            //LLamado al $scope del padre de este estado
            $scope.records = $scope.$parent.currentRecord.reviews;

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

            //Función para encontrar un registro por ID o CID
            function indexOf(rc) {
                var field = rc.id !== undefined ? 'id' : 'cid';
                for (var i in $scope.records) {
                    if ($scope.records.hasOwnProperty(i)) {
                        var current = $scope.records[i];
                        if (current[field] === rc[field]) {
                            return i;
                        }
                    }
                }
            }

            this.createRecord = function () {
                this.editMode = true;
                $scope.currentRecord = {};
            };

            var self = this;
            this.saveRecord = function () {
                var rc = $scope.currentRecord;
                if (rc.id || rc.cid) {
                    var idx = indexOf(rc);
                    $scope.records.splice(idx, 1, rc);
                } else {
                    rc.cid = -Math.floor(Math.random() * 10000);
                    $scope.$parent.currentRecord.reviews.push(rc);
                }
                this.fetchRecords();
            };

            this.fetchRecords = function () {
                $scope.currentRecord = {};
                this.editMode = false;
            };

            this.editRecord = function (record) {
                $scope.currentRecord = ng.copy(record);
                this.editMode = true;
            };

            this.deleteRecord = function (record) {
                var idx = indexOf(record);
                $scope.records.splice(idx, 1);
            };
        }]);
})(window.angular);