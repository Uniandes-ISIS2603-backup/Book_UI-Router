(function (ng) {
    var mod = ng.module("createAuthorModule", ["ui.bootstrap","ngMessages"]);

    mod.constant("authorsContext", "api/authors");
})(window.angular);
