(function (ng) {

    var mod = ng.module("mainApp", [
        "ui.router",
        "bookModule",
        "editorialModule",
        "authorModule",
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
                        templateUrl: "src/modules/book/book.tpl.html"
                    })
                    .state('books.create', {
                        url: '/create',
                        controller: "bookCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/modules/book/book.create.tpl.html"
                    })
                    .state('books.bookInstance', {
                        url: '/:bid',
                        controller: "bookCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/modules/book/book.edit.tpl.html"
                    })
                    .state('books.bookInstance.reviews', {
                        url: '/reviews',
                        controller: "reviewsCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/modules/review/review.tpl.html"
                    })
                    .state('books.bookInstance.prizes', {
                        url: '/prizes',
                        controller: "prizeCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/modules/prize/prize.tpl.html"
                    })
                    .state('books.bookInstance.authors', {
                        url: '/authors',
                        controller: "authorsCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/modules/book/book.authors.html"
                    })
                    .state('editorials', {
                        url: '/editorials',
                        controller: "editorialCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/modules/editorial/editorial.tpl.html"
                    })
                    .state('editorials.create', {
                        url: '/create',
                        controller: "editorialCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/modules/editorial/editorial.create.tpl.html"
                    })

                    .state('editorials.editorialInstance', {
                        url: '/:eid',
                        controller: "editorialCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/modules/editorial/editorial.edit.tpl.html"
                    })
                    .state('editorials.editorialInstance.books', {
                        url: '/books',
                        controller: "editorialBooksCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/modules/editorial/editorial.books.html"
                    })

                    .state('authors', {
                        url: '/authors',
                        controller: "authorCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/modules/author/author.tpl.html"
                    })
                    .state('authors.create', {
                        url: '/create',
                        controller: "authorCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/modules/author/author.create.tpl.html"
                    })

                    .state('authors.authorInstance', {
                        url: '/:aid',
                        controller: "authorCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/modules/author/author.edit.tpl.html"
                    })
                    .state('authors.authorInstance.books', {
                        url: '/books',
                        controller: "booksCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/modules/author/author.books.html"
                    })
                    ;
        }]);


})(window.angular);