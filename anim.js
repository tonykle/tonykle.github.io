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
/*
        $("#acc").mouseenter(function () {
            $("#accDescrip").css("display", "flex");
        });

        $("#dsa").mouseenter(function () {
            $("#dsaDescrip").css("display", "flex");
        });

        $("#sp").mouseenter(function () {
            $("#spDescrip").css("display", "flex");
        });

        $("#infoVis").mouseenter(function () {
            $("#infoVisDescrip").css("display", "flex");
        });

        $("#web").mouseenter(function () {
            $("#webDescrip").css("display", "flex");
        });
      
        $("#rdbms").mouseenter(function () {
            $("#rdDescrip").css("display", "flex");
        });
*/

        $("#linkedin, #res, #github, #uw").mouseenter(function () {
            $(this).fadeTo(100, 0.5);
        });

        $("#linkedin, #res, #github, #uw").mouseleave(function () {
            $(this).fadeTo(0, 1.0);
        });
     });
})();