(function (ng) {
    var mod = ng.module("authorsModule", ["ui.bootstrap","ngMessages"]);

    mod.constant("authorsContext", "api/authors");
})(window.angular);
