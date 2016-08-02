/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
 (function (ng) {
 	var mod = ng.module("booksModule", ["ui.bootstrap", "ngMessages"]);
 	mod.constant("bookContext", "api/books");

 	mod.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
 		$urlRouterProvider.otherwise("/books");
 		$stateProvider
        .state('books', {
            url: '/books',
            controller: "booksCtrl",
            controllerAs: "ctrl",
            templateUrl: "src/root/books/books.html"
        })
        
        .state('books.create', {
            url: '/create',
            controller: "createBookCtrl",
            controllerAs: "ctrl",
            templateUrl: "src/root/books/create/create.html"
        })
        .state('books.bookInstance', {
            url: '/:bid',
            controller: "bookInstanceCtrl",
            controllerAs: "ctrl",
            templateUrl: "src/root/books/bookInstance/bookInstance.html"
        })
        .state('books.bookInstance.reviews', {
            url: '/reviews',
            controller: "reviewsCtrl",
            controllerAs: "ctrl",
            templateUrl: "src/root/books/bookInstance/reviews/reviews.html"
        })
        .state('books.bookInstance.prizes', {
            url: '/prizes',
            controller: "prizesCtrl",
            controllerAs: "ctrl",
            templateUrl: "src/root/books/bookInstance/prizes/prizes.html"
        })
        .state('books.bookInstance.authors', {
            url: '/authors',
            controller: "bookAuthorsCtrl",
            controllerAs: "ctrl",
            templateUrl: "src/root/books/bookInstance/authors/authors.html"
        });

    }]);


 })(window.angular);

