/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 (function (ng) {

 	var mod = ng.module("editorialsModule", ["ui.bootstrap", "ngMessages"]);

 	mod.constant("editorialContext", "api/editorials");

 	mod.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
 		$urlRouterProvider.otherwise("/editorials");
 		$stateProvider

 		.state('editorials', {
 			url: '/editorials',
 			controller: "editorialsCtrl",
 			controllerAs: "ctrl",
 			templateUrl: "src/root/editorials/editorials.html"
 		})
 		.state('editorials.create', {
 			url: '/create',
 			controller: "createEditorialCtrl",
 			controllerAs: "ctrl",
 			templateUrl: "src/root/editorials/create/create.html"
 		})

 		.state('editorials.editorialInstance', {
 			url: '/:eid',
 			controller: "editorialInstanceCtrl",
 			controllerAs: "ctrl",
 			templateUrl: "src/root/editorials/editorialInstance/editorialInstance.html"
 		})
 		.state('editorials.editorialInstance.books', {
 			url: '/books',
 			controller: "editorialsBooksCtrl",
 			controllerAs: "ctrl",
 			templateUrl: "src/root/editorials/editorialInstance/books/books.html"
        });

    }]);


 })(window.angular);

