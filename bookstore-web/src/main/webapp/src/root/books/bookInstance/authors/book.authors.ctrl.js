(function (ng) {

    var mod = ng.module("bookModule");

    mod.controller("authorsCtrl", ["$scope", "$modal",'$state', '$stateParams',"$http", "bookContext", "authorContext", function ($scope, $modal, $state, $stateParams, $http, bookContext, authorContext) {
            $scope.currentRecord = {};
            $scope.records = [];
            $scope.refName = "authors";
            $scope.alerts = [];
            
            $scope.refId = $stateParams.bid;
            id = $scope.refId;
            $http.get(bookContext + "/" + id + "/authors").then(function (response) 
            {$scope.records = response.data;}, responseError);

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

            this.removeAuthor = function (index) {
                bookId = $scope.refId;
                authorId = $scope.records[ index ].id;
                $http.delete(bookContext + "/" + bookId + "/authors/" + authorId).then(function () {
                    $scope.records.splice(index, 1);
                }, responseError);
            };

            this.showList = function () {
                var modal = $modal.open({
                    animation: true,
                    templateUrl: "src/modules/book/authorModal.tpl.html",
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
                            return $http.get(authorContext);
                        },
                        currentItems: function () {
                            return $scope.records;
                        }
                    }
                });
                modal.result.then(function (data) {
                    bookId = $scope.refId;
                    authors = data;
                    $http.put(bookContext + "/" + bookId + "/authors", authors).then(function (response) {
                        $scope.records.splice(0, $scope.records.length);
                        $scope.records.push.apply($scope.records, response.data);
                    }, responseError);
                });
            };
        }]);
})(window.angular);