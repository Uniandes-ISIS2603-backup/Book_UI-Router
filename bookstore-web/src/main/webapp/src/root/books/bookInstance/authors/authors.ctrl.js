(function (ng) {

    var mod = ng.module("booksModule");

    mod.controller("bookAuthorsCtrl", ["$scope", "$modal",'$state', '$stateParams',"$http", function ($scope, $modal, $state, $stateParams, $http) {
            $scope.currentRecord = {};
            $scope.records = [];
            $scope.refName = "authors";
            $scope.alerts = [];
            
            $scope.refId = $stateParams.bid;
            id = $scope.refId;
            console.log(id);
            $http.get("api/books/" + id + "/authors").then(function (response)
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
                console.log("borrarAutor "+index);
                bookId = $scope.refId;
                authorId = $scope.records[ index ].id;
                $http.delete("api/books/" + bookId + "/authors/" + authorId).then(function () {
                    $scope.records.splice(index, 1);
                }, responseError);
            };

            this.showList = function () {
                var modal = $modal.open({
                    animation: true,
                    templateUrl: "src/root/books/bookInstance/authors/authorsModal.html",
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
                            return $http.get("api/authors");
                        },
                        currentItems: function () {
                            return $scope.records;
                        }
                    }
                });
                modal.result.then(function (data) {
                    bookId = $scope.refId;
                    authors = data;
                    $http.put("api/books/" + bookId + "/authors", authors).then(function (response) {
                        $scope.records.splice(0, $scope.records.length);
                        $scope.records.push.apply($scope.records, response.data);
                    }, responseError);
                });
            };
        }]);
})(window.angular);