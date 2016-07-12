/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function (ng) {

    var mod = ng.module("bookModule");

    mod.controller("bookCtrl", ["$scope", "bookService", "editorialService", "authorService", "$modal", '$state', '$stateParams', "$http", "bookContext","editorialContext", function ($scope, svc, editorialSvc, authorSvc, $modal, $state, $stateParams, $http, context, editorialContext) {
            //Se almacenan todas las alertas
            if ($stateParams.bid != null)
            {
                id = $stateParams.bid;
                $http.get(context + "/" + id).then(function (response) {
                    $scope.currentRecord = response.data;
                });
            } else
            {
                $scope.alerts = [];
                $scope.currentRecord = {
                    id: undefined /*Tipo Long. El valor se asigna en el backend*/,
                    name: '' /*Tipo String*/,
                    description: '' /*Tipo String*/,
                    isbn: '' /*Tipo String*/,
                    image: '' /*Tipo String*/,
                    editorial: {} /*Objeto que representa instancia de Editorial*/,
                    reviews: [{/*Colección de registros de Review*/
                            id: undefined /*Tipo Long. El backend asigna el valor*/,
                            name: '' /*Tipo String*/,
                            source: '' /*Tipo String*/,
                            description: '' /*Tipo String*/
                        }, {
                            id: undefined /*Tipo Long. El backend asigna el valor*/,
                            name: '' /*Tipo String*/,
                            source: '' /*Tipo String*/,
                            description: '' /*Tipo String*/
                        }] /*Colección de registros de Review*/
                };
                $scope.records = [];
            }

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

            //Ejemplo alerta
            if ($stateParams.bid == null)
            {
                showMessage("Bienvenido!, Esto es un ejemplo para mostrar un mensaje de información", "info");
            }


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
                    $state.go("book.edit", {bid: record.id}, {reload: false});
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
                        $state.go("book", {}, {reload: true});
                    }, responseError);
                } else {
                    return $http.post(context, currentRecord).then(function () {
                        self.fetchRecords();
                        $state.go("book", {}, {reload: true});
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

            /*
             * Funcion fetchRecords consulta todos los registros del módulo book en base de datos
             * para desplegarlo en el template de la lista.
             */
            if ($stateParams.bid == null)
            {
                this.fetchRecords();
            }

        }]);

    mod.controller("reviewsCtrl", ["$scope", "bookService", '$state', '$stateParams', function ($scope, bookSvc, $state, $stateParams) {

            $scope.currentRecord = {};
            $scope.records = [];
            $scope.refName = "reviews";
            $scope.alerts = [];

            bookSvc.fetchRecord($stateParams.bid).then(function (response) {
                $scope.currentRecord = response.data;
            });

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
                    rc[$scope.parent] = {id: $scope.refId};
                    $scope.records.push(rc);
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