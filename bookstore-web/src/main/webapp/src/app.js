(function (ng) {

    var mod = ng.module("mainApp", [
        "ui.router",
        "booksModule",
        "bookInstanceModule",
        "prizesModule",
        "reviewsModule",
        "editorialsModule",
        "editorialInstanceModule",
        "authorsModule",
        "ngMessages"
        ]);

    mod.config(['$logProvider', function ($logProvider) {
        $logProvider.debugEnabled(true);
    }]);


})(window.angular);