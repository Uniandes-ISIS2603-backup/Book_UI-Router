(function (ng) {

    var mod = ng.module("mainApp", [
        "ui.router",
        "booksModule",
        "editorialsModule",
        "authorsModule",
        "reviewsModule",
        "prizesModule",
        "ngMessages"
    ]);

    mod.config(['$logProvider', function ($logProvider) {
            $logProvider.debugEnabled(true);
        }]);

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
                        controller: "booksCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/root/books/create/create.html"
                    })
                    .state('books.bookInstance', {
                        url: '/:bid',
                        controller: "booksCtrl",
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
                        controller: "authorsCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/root/books/bookInstance/authors/authors.html"
                    })
                    .state('editorials', {
                        url: '/editorials',
                        controller: "editorialsCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/root/editorials/editorials.html"
                    })
                    .state('editorials.create', {
                        url: '/create',
                        controller: "editorialsCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/root/editorials/create/create.html"
                    })

                    .state('editorials.editorialInstance', {
                        url: '/:eid',
                        controller: "editorialsCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/root/editorials/editorialInstance/editorialInstance.html"
                    })
                    .state('editorials.editorialInstance.books', {
                        url: '/books',
                        controller: "editorialsBooksCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/root/editorials/editorialInstance/books/books.html"
                    })

                    .state('authors', {
                        url: '/authors',
                        controller: "authorsCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/root/authors/authors.html"
                    })
                    .state('authors.create', {
                        url: '/create',
                        controller: "authorsCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/root/authors/create/create.html"
                    })

                    .state('authors.authorInstance', {
                        url: '/:aid',
                        controller: "authorsCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/root/authors/authorInstance/authorInstance.html"
                    })
                    .state('authors.authorInstance.books', {
                        url: '/books',
                        controller: "authorBooksCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/root/authors/authorInstance/books/books.html"
                    })
                    ;
        }]);


})(window.angular);