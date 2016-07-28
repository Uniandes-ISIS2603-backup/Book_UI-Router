(function (ng) {

    var mod = ng.module("mainApp", [
        "ui.router",
        "bookModule",
        "editorialModule",
        "authorsModule",
        "reviewModule",
        "prizeModule",
        "ngMessages"
    ]);

    mod.config(['$logProvider', function ($logProvider) {
            $logProvider.debugEnabled(true);
        }]);

    mod.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/book");
            $stateProvider
                    .state('books', {
                        url: '/books',
                        controller: "bookCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/root/books/book.tpl.html"
                    })
                    .state('books.create', {
                        url: '/create',
                        controller: "bookCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/root/books/create/book.create.tpl.html"
                    })
                    .state('books.bookInstance', {
                        url: '/:bid',
                        controller: "bookCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/root/books/bookInstance/book.edit.tpl.html"
                    })
                    .state('books.bookInstance.reviews', {
                        url: '/reviews',
                        controller: "reviewsCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/root/books/bookInstance/reviews/review.tpl.html"
                    })
                    .state('books.bookInstance.prizes', {
                        url: '/prizes',
                        controller: "prizeCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/root/books/bookInstance/prizes/prize.tpl.html"
                    })
                    .state('books.bookInstance.authors', {
                        url: '/authors',
                        controller: "authorsCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/root/books/bookInstance/authors/book.authors.html"
                    })
                    .state('editorials', {
                        url: '/editorials',
                        controller: "editorialCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/root/editorials/editorial.tpl.html"
                    })
                    .state('editorials.create', {
                        url: '/create',
                        controller: "editorialCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/root/editorials/create/editorial.create.tpl.html"
                    })

                    .state('editorials.editorialInstance', {
                        url: '/:eid',
                        controller: "editorialCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/root/editorials/editorialInstance/editorial.edit.tpl.html"
                    })
                    .state('editorials.editorialInstance.books', {
                        url: '/books',
                        controller: "editorialBooksCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/root/editorials/editorialInstance/books/editorial.books.html"
                    })

                    .state('authors', {
                        url: '/authors',
                        controller: "authorsCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/root/authors/authors.tpl.html"
                    })
                    .state('authors.create', {
                        url: '/create',
                        controller: "authorsCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/root/authors/create/author.create.tpl.html"
                    })

                    .state('authors.authorInstance', {
                        url: '/:aid',
                        controller: "authorsCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/root/authors/authorInstance/author.edit.tpl.html"
                    })
                    .state('authors.authorInstance.books', {
                        url: '/books',
                        controller: "booksCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/root/authors/authorInstance/books/author.books.html"
                    })
                    ;
        }]);


})(window.angular);