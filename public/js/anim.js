// This is the JS file I use to make my portfolio interactive.

(function () {
     $(document).ready(() => {
        $("html").fadeTo(900, 1.0);

        $("#linkedin, #res, #github, #uw").mouseenter(function() {
            $(this).fadeTo(100, 0.5);
        }).mouseleave(function () {
            $(this).fadeTo(0, 1.0);
        });
     });
})();
