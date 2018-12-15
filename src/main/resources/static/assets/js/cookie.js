/**
 * Created by Hakan Baysal on 6.10.2017.
 */

var html = '<div class="page-tabs-content">\n' +
    '    <ul class="nav nav-tabs tabs-flat" id="pageTabs">\n' +
    '        <li class=""><a data-toggle="tab" href="#pageTabsDashboard" aria-expanded="false"><i class="fa fa-tachometer" aria-hidden="true"></i>  Dashboard</a> </li>\n' +
    '        <li class="active">\n' +
    '            <a href="#pageTabs0">\n' +
    '                <button class="close closeTab" type="button">×</button> Elements <u>Basic Elements</u></a>\n' +
    '        </li>\n' +
    '    </ul>\n' +
    '    <div class="tab-content tabs-flat page-tab-content" id="pageTabsContent">\n' +
    '        <div id="pageTabsDashboard" class="tab-pane page-tab-pane">\n' +
    '            <iframe src="/#!/" id="iframe-page-content-pageTabs" height="100%" width="100%" frameborder="0" scrolling="yes" style="height: 1570px;"></iframe>\n' +
    '        </div>\n' +
    '        <div class="tab-pane page-tab-pane active" id="pageTabs0">\n' +
    '            <iframe src="/#!/tabs/elements" id="iframe-page-content-pageTabs0" height="100%" width="100%" frameborder="0" scrolling="yes" style="height: 3333px;"></iframe>\n' +
    '        </div>\n' +
    '    </div>\n' +
    '</div>';


//setCookie("tabs",html,1);

getTabs();

function getTabs() {
    var tabsht = getCookie("tabs");
    var newTabCount = getCookie("newTabCount");
    //console.log(newTabCount);
    if (tabsht != null) {
        var tabs = tabsht.replace(/###/g, ";");
        $('.page-tabs-content').html(tabs);
    }
}

function setCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}