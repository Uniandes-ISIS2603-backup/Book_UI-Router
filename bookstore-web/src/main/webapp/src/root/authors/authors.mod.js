(function (ng) {
	var mod = ng.module("authorsModule", ["ui.bootstrap","ngMessages"]);

	mod.constant("authorsContext", "api/authors");

	mod.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/books");
		$stateProvider

		.state('authors', {
			url: '/authors',
			controller: "authorsCtrl",
			controllerAs: "ctrl",
			templateUrl: "src/root/authors/authors.html"
		})
		.state('authors.create', {
			url: '/create',
			controller: "createAuthorCtrl",
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