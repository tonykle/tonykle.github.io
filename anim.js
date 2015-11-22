// This is the JS file I use to make my portfolio interactive.

(function () {
     $(document).ready(function () {
        $("html").fadeTo(900, 1.0);

        $("#dribbb").mouseenter(function () {
            $(this).fadeTo(100, 0.6);
        });

        $("#dribbb").mouseout(function () {
            $(this).fadeTo(100, 1.0);
        });

        $("#linkedin, #res, #github, #uw").mouseenter(function () {
            $(this).fadeTo(100, 0.5);
        });

        $("#linkedin, #res, #github, #uw").mouseleave(function () {
            $(this).fadeTo(0, 1.0);
        });
     });
})();
