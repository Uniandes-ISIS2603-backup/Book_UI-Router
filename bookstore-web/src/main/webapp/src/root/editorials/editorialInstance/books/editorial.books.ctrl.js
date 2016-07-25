(function (ng) {
    var mod = ng.module("editorialModule");

    mod.controller("editorialBooksCtrl", ["$scope", "$modal",'$state', '$stateParams', "$http", "editorialContext","bookContext", function ($scope, $modal, $state, $stateParams, $http, context, bookContext) {
            $scope.currentRecord = {};
            $scope.records = [];
            $scope.refName = "books";
            $scope.alerts = [];

            $scope.refId = $stateParams.eid;
            $http.get(context + "/" + $scope.refId + "/books").then(function (response)
            {
                $scope.records = response.data;
            }, responseError);

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

            this.removeBook = function (index) {
                editorialId = $scope.refId;
                bookId = $scope.records[ index ].id;
                $http.delete(context + "/" + editorialId + "/books/" + bookId).then(function () {
                    $scope.records.splice(index, 1);
                }, responseError);
            };

            this.showList = function () {
                var modal = $modal.open({
                    animation: true,
                    templateUrl: "src/modules/editorial/bookModal.tpl.html",
                    controller: ["$scope", "$modalInstance", "items", "currentItems", function ($scope, $modalInstance, items, currentItems) {
                            $scope.records = items.data;
                            $scope.allChecked = false;

                            function loadSelected(list, selected) {
                                ng.forEach(selected, function (selectedValue) {
                                    ng.forEach(list, function (listValue) {
                                        if (listValue.id === selectedValue.id) {
                                            listValue.selected = true;
                                        }
                                    });
                                });
                            }

                            $scope.checkAll = function (flag) {
                                this.records.forEach(function (item) {
                                    item.selected = flag;
                                });
                            };

                            loadSelected($scope.records, currentItems);

                            function getSelectedItems() {
                                return $scope.records.filter(function (item) {
                                    return !!item.selected;
                                });
                            }

                            $scope.ok = function () {
                                $modalInstance.close(getSelectedItems());
                            };

                            $scope.cancel = function () {
                                $modalInstance.dismiss("cancel");
                            };
                        }],
                    resolve: {
                        items: function () {
                            return $http.get(bookContext + "/" + id);
                        },
                        currentItems: function () {
                            return $scope.records;
                        }
                    }
                });
                modal.result.then(function (data) {
                    editorialId = $scope.refId;
                    books = data;
                    $http.put(context + "/" + editorialId + "/books", books).then(function (response) {
                        $scope.records.splice(0, $scope.records.length);
                        $scope.records.push.apply($scope.records, response.data);
                    }, responseError);
                });
            };
        }]);

})(window.angular);