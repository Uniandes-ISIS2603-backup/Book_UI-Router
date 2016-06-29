(function (ng) {

    var mod = ng.module("mainApp", [
        "ui.router",
        "bookModule",
        "editorialModule",
        "authorModule",
        "reviewModule",
        "prizeModule",
//        "bookMock",
//        "editorialMock",
//        "authorMock",
//        "reviewMock",
        "ngMessages"
    ]);

    mod.config(['$logProvider', function ($logProvider) {
            $logProvider.debugEnabled(true);
        }]);

    mod.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise("/book");
            $stateProvider
                    .state('book', {
                        url: '/book',
                        controller: "bookCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/modules/book/book.tpl.html"
                    })
                    .state('book.create', {
                        url: '/create',
                        controller: "bookCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/modules/book/book.create.tpl.html"
                    })
                    .state('book.edit', {
                        url: '/:bid',
                        controller: "bookCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/modules/book/book.edit.tpl.html"
                    })
                    .state('book.edit.reviews', {
                        url: '/reviews',
                        controller: "reviewsCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/modules/review/review.tpl.html"
                    })
                    .state('book.edit.prizes', {
                        url: '/prizes',
                        controller: "prizeCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/modules/prize/prize.tpl.html"
                    })
                    .state('book.edit.authors', {
                        url: '/authors',
                        controller: "authorsCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/modules/book/book.authors.html"
                    })
                    .state('editorial', {
                        url: '/editorial',
                        controller: "editorialCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/modules/editorial/editorial.tpl.html"
                    })
                    .state('editorial.create', {
                        url: '/create',
                        controller: "editorialCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/modules/editorial/editorial.create.tpl.html"
                    })

                    .state('editorial.edit', {
                        url: '/:eid',
                        controller: "editorialCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/modules/editorial/editorial.edit.tpl.html"
                    })
                    .state('editorial.edit.books', {
                        url: '/books',
                        controller: "editorialBooksCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/modules/editorial/editorial.books.html"
                    })

                    .state('author', {
                        url: '/author',
                        controller: "authorCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/modules/author/author.tpl.html"
                    })
                    .state('author.create', {
                        url: '/create',
                        controller: "authorCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/modules/author/author.create.tpl.html"
                    })

                    .state('author.edit', {
                        url: '/:aid',
                        controller: "authorCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/modules/author/author.edit.tpl.html"
                    })
                    .state('author.edit.books', {
                        url: '/books',
                        controller: "booksCtrl",
                        controllerAs: "ctrl",
                        templateUrl: "src/modules/author/author.books.html"
                    })
                    ;
        }]);


})(window.angular);