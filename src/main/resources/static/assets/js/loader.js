/**
 * Created by Hakan Baysal on 6.10.2017.
 */

//afterpageload
$(".page-container").attr("style", "display: none;");
$(document).ready(function () {
    setTimeout(function () {
        $(".page-container").attr("style", "display: block;");
        $(".loading-container, .cloading-container").addClass('loading-inactive');
    }, 1000);
});


