(function (ng) {
    var mod = ng.module("authorInstanceModule", ["ui.bootstrap","ngMessages"]);

    mod.constant("authorsContext", "api/authors");
})(window.angular);
