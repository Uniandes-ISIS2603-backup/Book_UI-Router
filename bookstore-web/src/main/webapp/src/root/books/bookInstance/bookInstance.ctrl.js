/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 (function (ng) {

    var mod = ng.module("booksModule");

    mod.controller("bookInstanceCtrl", ["$scope", "$modal", '$state', '$stateParams', "$http", "bookContext","editorialContext", function ($scope, $modal, $state, $stateParams, $http, context, editorialContext) {

           document.getElementById('instance').scrollIntoView();

        id = $stateParams.bid;
        $http.get(context + "/" + id).then(function (response) {
            $scope.currentRecord = response.data;
        });

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

            // Función showMessage: Recibe el mensaje en String y su tipo con el fin de almacenarlo en el array $scope.alerts.
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

            this.showSuccess = function (msg) {
                showMessage(msg, "success");
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


            /*
             * Funcion createRecord emite un evento a los $scope hijos del controlador por medio de la
             * sentencia &broadcast ("nombre del evento", record), esto con el fin cargar la información de modulos hijos
             * al actual modulo.
             * Habilita el modo de edicion. El template de la lista cambia por el formulario.
             *
             */

             this.createRecord = function () {
                this.editMode = true;
                $scope.currentRecord = {};
            };

            /*
             * Funcion editRecord emite el evento ("post-edit") a los $Scope hijos del controlador por medio de la
             * sentencia &broadcast ("nombre del evento", record), esto con el fin cargar la información de modulos hijos
             * al actual modulo.
             * Habilita el modo de edicion.  Carga el template de formulario con los datos del record a editar.
             *
             */

             this.editRecord = function (record) {
                id = record.id;
                return $http.get(context + "/" + id).then(function (response) {
                    $scope.currentRecord = response.data;
                    self.editMode = true;
                    $state.go("books.bookInstance", {bid: record.id}, {reload: false});
                    return response;
                }, responseError);
            };

            /*
             * Funcion fetchRecords consulta el servicio svc.fetchRecords con el fin de consultar
             * todos los registros del modulo book.
             * Guarda los registros en la variable $scope.records
             * Muestra el template de la lista de records.
             */

             this.fetchRecords = function () {
                return $http.get(context).then(function (response) {
                    $scope.records = response.data;
                    $scope.currentRecord = {};
                    self.editMode = false;
                    return response;
                }, responseError);
            };

            /*
             * Funcion saveRecord hace un llamado al servicio svc.saveRecord con el fin de
             * persistirlo en base de datos.
             * Muestra el template de la lista de records al finalizar la operación saveRecord
             */
             this.saveRecord = function () {

                currentRecord = $scope.currentRecord;

                if (currentRecord.id) {
                    return $http.put(context + "/" + currentRecord.id, currentRecord).then(function () {
                        self.fetchRecords();
                        $state.go("books", {}, {reload: true});
                    }, responseError);
                } else {
                    return $http.post(context, currentRecord).then(function () {
                        self.fetchRecords();
                        $state.go("books", {}, {reload: true});
                    }, responseError);
                }
            };

            /*
             * Funcion deleteRecord hace un llamado al servicio svc.deleteRecord con el fin
             * de eliminar el registro asociado.
             * Muestra el template de la lista de records al finalizar el borrado del registro.
             */
             this.deleteRecord = function (record) {
                id = record.id;
                return $http.delete(context + "/" + id).then(function () {
                    self.fetchRecords();
                }, responseError);
            };

            $http.get(editorialContext).then(function (response) {
                $scope.editorials = response.data;
            });

        }]);

})(window.angular);