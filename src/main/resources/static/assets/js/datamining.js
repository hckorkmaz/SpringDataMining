/*Sets Themed Colors Based on Themes*/

var themeprimary = getThemeColorFromCss('themeprimary');
var themesecondary = getThemeColorFromCss('themesecondary');
var themethirdcolor = getThemeColorFromCss('themethirdcolor');
var themefourthcolor = getThemeColorFromCss('themefourthcolor');
var themefifthcolor = getThemeColorFromCss('themefifthcolor');

//Gets Theme Colors From Selected Skin To Use For Drawing Charts
function getThemeColorFromCss(style) {
    var $span = $("<span></span>").hide().appendTo("body");
    $span.addClass(style);
    var color = $span.css("color");
    $span.remove();
    return color;
}

//Handle RTL SUpport for Changer CheckBox
$("#skin-changer li a").click(function () {
    createCookie("current-skin", $(this).attr('rel'), 10);
    window.location.reload();
});


/*Sets Themed Colors Based on Themes*/
function log(val) {
    console.log(val);
}

var themeprimary = getThemeColorFromCss('themeprimary');
var themesecondary = getThemeColorFromCss('themesecondary');
var themethirdcolor = getThemeColorFromCss('themethirdcolor');
var themefourthcolor = getThemeColorFromCss('themefourthcolor');
var themefifthcolor = getThemeColorFromCss('themefifthcolor');

//Gets Theme Colors From Selected Skin To Use For Drawing Charts
function getThemeColorFromCss(style) {
    var $span = $("<span></span>").hide().appendTo("body");
    $span.addClass(style);
    var color = $span.css("color");
    $span.remove();
    return color;
}

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

//Handle RTL SUpport for Changer CheckBox
$("#skin-changer li a").click(function () {
    createCookie("current-skin", $(this).attr('rel'), 10);
    window.location.reload();
});


// iframe tabs 


/*Sets Themed Colors Based on Themes*/
function log(val) {
    console.log(val);
}

var themeprimary = getThemeColorFromCss('themeprimary');
var themesecondary = getThemeColorFromCss('themesecondary');
var themethirdcolor = getThemeColorFromCss('themethirdcolor');
var themefourthcolor = getThemeColorFromCss('themefourthcolor');
var themefifthcolor = getThemeColorFromCss('themefifthcolor');

//Gets Theme Colors From Selected Skin To Use For Drawing Charts
function getThemeColorFromCss(style) {
    var $span = $("<span></span>").hide().appendTo("body");
    $span.addClass(style);
    var color = $span.css("color");
    $span.remove();
    return color;
}

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

//Handle RTL SUpport for Changer CheckBox
$("#skin-changer li a").click(function () {
    createCookie("current-skin", $(this).attr('rel'), 10);
    window.location.reload();
});

function tabsHTML(newTabCount) {
    var tabsHTML = $('.page-tabs-content').html().replace(/(\r\n|\n|\r)/gm, "");
    var xtabs = tabsHTML.replace(/;/g, "###");
    //console.log(xtabs.trim());
    createCookie("tabs", xtabs.trim(), 1000);
    createCookie("newTabCount", parseInt(newTabCount), 1000);
}


$(function () {
    //default loading text message
    var loading_text = "<div class='xloading'> <div class='bullet'></div><div class='bullet'></div><div class='bullet'></div><div class='bullet'></div></div>";

    //initilize tabs
    var currentTab;
    if (readCookie("newTabCount") != null) {
        var newTabCount = parseInt(readCookie("newTabCount"));
    } else {
        var newTabCount = 0;
    }

    $("#pageTabs").append('<li class="f-r"><button id="close_all_tab" data-toggle="tooltip" data-placement="left" title="' + "Close Tabs" + '" class="btn-link b-ra-none btn btn-default btn-lg icon-only"><i class="fa fa-close text-sm"></i></button></li>');
    $('body').on('click', '#close_all_tab', function (e) {
        bootbox.confirm("Are You Sure?", function (result) {
            if (result == true) {
                $("li", "#pageTabs").removeClass("active");
                $("li", "#pageTabs").first().addClass("active");
                $("#pageTabsContent > div").removeClass("active");
                $("div", "#pageTabsContent").first().addClass("active");
                $(".closeTab", "#pageTabs").each(function () {
                    $(this).trigger("click");
                });
            }
        })
    });

    $('body').on('click', '#pageTabs>li>a', function (e) {
        e.preventDefault();
        $(this).tab('show');
        $currentTab = $(this);
        tabsHTML(newTabCount);
    });

    $('body').on('click', '#sidebar a', function (e) {

        if (typeof $(this).attr('type') === 'undefined') {
            bootbox.alert("menu tab type error!");
            return false;
        }

        e.preventDefault();

        $("#sidebar .sidebar-menu li").removeClass("active");
        $(this).closest("li").addClass("active");

        if ($(this).attr('type') == 'dashboard') {
            $("#pageTabs li a").first().trigger("click")
            return false;
        }

        var tabId = "pageTabs" + newTabCount; //this is id on tab content div where the
        newTabCount = newTabCount + 1; //increment compose count

        var tabIconHtml = '';
        if ($("i", this).length > 0) {
            var $tabIconClass = $("i", this).clone();
            $tabIconClass.removeClass('menu-icon').addClass('pageTabicon');
            tabIconHtml = $tabIconClass.prop('outerHTML');
        }

        var tab_text = $("span", this).html();
        if (typeof $("span", this).closest("ul.submenu").prev().children("span").html() !== "undefined") {
            tab_text = $("span", this).closest("ul.submenu").prev().children("span").html() + " <i class='fa fa-angle-right'></i> " + $("span", this).html();
        }

        $('#pageTabs').append('<li><a href="#' + tabId + '">' + tabIconHtml + ' <button class="close closeTab" type="button" >×</button> ' + tab_text + '</a></li>');
        $('#pageTabsContent').append('<div class="tab-pane page-tab-pane" id="' + tabId + '"></div>');

        craeteNewTabAndLoadUrl(tabId, $(this).attr('type'), $(this).attr('href'), "#" + tabId);

        tabsContentMinHeightResize();

        //$(this).tab('show');
        $('#pageTabs a[href="#' + tabId + '"]').tab('show');

        tabsHTML(newTabCount);
        return false;
    });

    //$(".closeTab").click(function () {
    $('body').on('click', '.closeTab', function () {
        var tabContentId = $(this).parent().attr("href");
        $(this).parent().parent().remove(); //remove li of tab
        $('#pageTabs a:last').tab('show'); // Select first tab
        $(tabContentId).remove(); //remove respective tab content
        tabsHTML(newTabCount);
    });
    $('body').on('keyup', '#filter_menu', function () {
        log($(this).val());
    });

    window.cascade_check = function () {
        var false_complate = 0;
        $(".ccselect[is-complate='false']").each(function () {
            false_complate++;
        });
        setTimeout(function () {
            if (false_complate == 0) {
                return true;
            } else {
                return false;
            }
        }, 200);
    }

    window.add3Dots = function (string, limit) {
        var _htmlobj = $("i", "<div>" + string + "</div>").prop('outerHTML');
        string = $("<div>" + string + "</div>").text();
        var dots = "...";
        if (string.length > limit) {
            string = string.substring(0, limit) + dots;
        }
        if (typeof _htmlobj !== 'undefined') {
            return _htmlobj + string;
        } else {
            return string;
        }
    }

    window.nl2br = function (str, is_xhtml) {
        var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
        return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
    }
    window.tabsContentMinHeightResize = function () {
        //all resize
        /*
         $(".page-tab-pane").css("min-height", function(){
         return $(window).height()-85;
         });
         */
    }
    window.craeteNewTabAndLoadUrl = function (id, type, url, loadDivSelector) {
        var iframe_height;

        $(loadDivSelector).html(loading_text);
        if (typeof type !== 'undefined') {
            if (type == 'ajax') {
                $(loadDivSelector).load(url, function (response, status, xhr) {
                    if (status == "error") {
                        var msg = "Sorry but there was an error getting details ! ";
                        $(loadDivSelector).html(msg + xhr.status + " " + xhr.statusText);
                        bootbox.alert("Sorry but there was an error getting details !");
                    }
                });
            } else if (type == 'iframe') {
                iframe_height = $(window).height() - 88 + 'px';
                $(loadDivSelector).html('<iframe src="' + url + '" id="iframe-page-content-' + id + '" height="100%" width="100%" frameborder="0" scrolling="yes" style="height:' + iframe_height + '"></iframe>');
                $('#iframe-page-content-' + id).load(function () {
                    var _this = this;
                    setTimeout(function () {
                        if ($(window).height() - 90 < _this.contentWindow.document.body.offsetHeight)
                            _this.style.height = _this.contentWindow.document.body.offsetHeight + 'px';
                        else
                            _this.style.height = $(window).height() - 90 + 'px';

                        tabsHTML(newTabCount);
                    }, 1100);
                });
            }
        }
    }

    window.tabStripAppend = function (_text, _url) {
        if ($('#pageTabs').length > 0) {
            var tabId = "pageTabs" + newTabCount; //this is id on tab content div where the
            newTabCount = newTabCount + 1; //increment compose count
            _text = add3Dots(_text, 30);
            $('#pageTabs').append('<li><a href="#' + tabId + '"><button class="close closeTab" type="button" >×</button> ' + _text + '</a></li>');
            $('#pageTabsContent').append('<div class="tab-pane page-tab-pane" id="' + tabId + '"></div>');

            craeteNewTabAndLoadUrl(tabId, "iframe", _url, "#" + tabId);

            //tabsContentMinHeightResize();

            //$(this).tab('show');
            $('#pageTabs a[href="#' + tabId + '"]').tab('show');
            return false;

        } else {
            window.location = _url;
        }
    }

    window.getElement = function (selector) {
        var tabContentId = $currentTab.attr("href");
        return $("" + tabContentId).find("" + selector);
    }
    window.removeCurrentTab = function () {
        var tabContentId = $currentTab.attr("href");
        $currentTab.parent().remove(); //remove li of tab
        $('#pageTabs a:last').tab('show'); // Select first tab
        $(tabContentId).remove(); //remove respective tab content
    }

    window.getUrl = function (id) {
        if (typeof id != "undefined") {
            var geturl_this = $("#" + id);
            if (geturl_this.attr('get-url') != '') {
                geturl_this.html(loading_text);
                $.get(geturl_this.attr('get-url'), function (data) {
                    geturl_this.html(data);
                });
            }
        } else {
            $("[get-url]").each(function () {
                var geturl_this = $(this);
                if (geturl_this.attr('get-url') != '') {
                    geturl_this.html(loading_text);
                    $.get(geturl_this.attr('get-url'), function (data) {
                        geturl_this.html(data);
                    });
                }
            });
        }
    }

    window.iframeUrl = function () {
        var iframeurl_this;
        $("[iframe-url]").each(function () {
            iframeurl_this = $(this);
            setTimeout(function () {
                iframeurl_this.height($(window).height() - 200);
            }, 1000);
            iframeurl_this.html('<iframe class="i-frame" id="" onloadurl="" onLoad="onloadurl($(this),this.contentWindow.location);" width="100%" height="100%" scrolling="yes" frameborder="0" src="' + iframeurl_this.attr('iframe-url') + '"></iframe>');
        });
    }

    window.gridIframeUrl = function (create_url) {
        var iframeurl_this;
        $("[grid-iframe-url]").each(function () {
            iframeurl_this = $(this);
            if ($('iframe', this).length == 0 || $('iframe', this).attr("onloadurl") != create_url && create_url.indexOf('change_url') === -1) {
                setTimeout(function () {
                    iframeurl_this.height($(window).height() - 200);
                }, 500);
                iframeurl_this.html('<iframe class="i-frame" id="" onloadurl="" onLoad="onloadurl($(this),this.contentWindow.location);" width="100%" height="100%" scrolling="yes" frameborder="0" src="' + iframeurl_this.attr('grid-iframe-url') + '"></iframe>');
            }
        });
    }

    setTimeout(function () {
        getUrl();
        iframeUrl();
    }, 500);

    window.onloadurl = function (_this, url) {
        _this.attr("onloadurl", url.href);
    }

    $('body').on('click', '[new-tab]', function () {
        if ($(this).attr("tab-title") != "" && $(this).attr("new-tab") != "") {
            parent.tabStripAppend($(this).attr("tab-title"), $(this).attr("new-tab"));
        } else {
            Notify("Choose Record", 'top-right', '3000', 'info', 'fa-bolt', true);
        }
    });

    $('body').on('click', '[load-url]', function () {
        var url_arr = $(this).attr('load-url').split("|");

        if ($('#' + url_arr[1]).length) {

            $('#' + url_arr[1]).html(loading_text);
            $.get(url_arr[0], function (data) {
                $('#' + url_arr[1]).html(data);
            });

        } else {
            var load_target = $(this).attr('target');
            if (typeof load_target !== typeof undefined && load_target !== false) {
                $.get($(this).attr('load-url'), function (data) {
                    $('#' + load_target).html(data);
                });
            }
        }
    });

    $('body').on('click', '[location-url]', function () {
        window.location.href = $(this).attr('location-url');
    });

    $('body').on('click', '[post-url]', function (e) {
        e.preventDefault();

        var _this = $(this);
        var url_arr = _this.attr('post-url').split("|");

        var action = ((typeof url_arr[0] != 'undefined') ? url_arr[0] : null);
        var data = ((typeof url_arr[1] != 'undefined' && url_arr[1] != "") ? url_arr[1] : null);
        var func = ((typeof url_arr[2] != 'undefined' && url_arr[2] != "") ? url_arr[2] : null);
        var confirm = ((typeof url_arr[3] != 'undefined' && url_arr[3] != "") ? url_arr[3] : null);

        if (_this.attr('post-premethod') && _this.attr('post-premethod') != "") {
            var fn = window[_this.attr('post-premethod')];
            if (typeof fn === 'function') {
                var premethod_return = fn(_this, data);
                if (premethod_return != true) {
                    Notify(' PremethodReturn !== true', 'top-right', '5000', 'danger', 'fa-bolt', true);
                    return false;
                }
            } else {
                bootbox.alert(_this.attr('post-premethod') + ": Fonksiyon bulunamadÄ±!");
                return false;
            }
        }

        setTimeout(function () {
            if (confirm != null) {
                bootbox.confirm(confirm, function (result) {
                    if (result == true) {
                        postUrl(action, data, func, _this);
                    }
                });
            } else {
                postUrl(action, data, func, _this);
            }
        }, 100);

    });

    window.cascadeCheck = function () {
        if (!$('.preload-card').length) {
            $("body").append('<div class="preload-card"><div><div><h1>' + "Data is loading" + '</h1><span class="throbber">Loadingâ€¦</span><h6>' + "Double click to close" + '</h6></div></div></div>');
        }

        var false_complate = 0;
        $(".ccselect[is-complate='false']").each(function () {
            false_complate++;
        });
        setTimeout(function () {
            if (false_complate == 0) {
                $(".preload-card").remove();
                clearInterval(refreshIntervalId);
            }
        }, 200);
    }

    $('body').on('dblclick', '.preload-card', function (e) {
        $(".preload-card").remove();
        clearInterval(refreshIntervalId);
    });


    $(document.body).on('hide.bs.modal', function () {
        $('body').css('padding-right', '0');
    });
    $(document.body).on('hidden.bs.modal', function () {
        $('body').css('padding-right', '0');
    });

    window.closeGridModal = function (id) {
        $('#' + id).modal('hide');
    }

    window.checkSelectOptions = function (options, key) {
        return options.hasOwnProperty(key);
    };

    window.toCode = function (text) {
        var trMap = {
            'Ã§Ã‡': 'C',
            'ÄŸÄ': 'G',
            'ÅŸÅ': 'S',
            'Ã¼Ãœ': 'U',
            'Ä±Ä°': 'I',
            'Ã¶Ã–': 'O'
        };
        for (var key in trMap) {
            text = text.replace(new RegExp('[' + key + ']', 'g'), trMap[key]);
        }
        return text.replace(/[^-A-Z0-9\s]+/ig, '') // remove non-alphanumeric chars
            .replace(/\s/gi, "-") // convert spaces to dashes
            .replace(/[-]+/gi, "-") // trim repeated dashes
            .toUpperCase();
    };
});


//Checks Not to Do rtl-support for Arabic and Persian Demo Pages

var rtlchanger = document.getElementById('rtl-changer');

if (location.pathname != "/index-rtl-fa.html" && location.pathname != "index-rtl-ar.html") {
    if (readCookie("rtl-support")) {
        switchClasses("pull-right", "pull-left");
        switchClasses("databox-right", "databox-left");
        switchClasses("item-right", "item-left");
        $('.navbar-brand small img').attr('src', 'assets/img/logo-rtl.png');
        if (rtlchanger != null)
            document.getElementById('rtl-changer').checked = true;
    } else {
        if (rtlchanger != null)
            rtlchanger.checked = false;
    }

    if (rtlchanger != null) {
        rtlchanger.onchange = function () {
            if (this.checked) {
                createCookie("rtl-support", "true", 10);
            } else {
                eraseCookie("rtl-support");
            }
            setTimeout(function () {
                window.location.reload();
            }, 600);

        };
    }
}

/*Loading*/
$(window)
    .load(function () {
        setTimeout(function () {
            $('.loading-container')
                .addClass('loading-inactive');
        }, 1000);
    });


/*Account Area --> Setting Button*/
$('#btn-setting')
    .on('click', function (e) {
        $('.navbar-account')
            .toggleClass('setting-open');
    });

/*Toggle FullScreen*/
$('#fullscreen-toggler')
    .on('click', function (e) {
        var element = document.documentElement;
        if (!$('body')
            .hasClass("full-screen")) {

            $('body')
                .addClass("full-screen");
            $('#fullscreen-toggler')
                .addClass("active");
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }

        } else {

            $('body')
                .removeClass("full-screen");
            $('#fullscreen-toggler')
                .removeClass("active");

            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }

        }
    });

/*Handles Popovers*/
var popovers = $('[data-toggle=popover]');
$.each(popovers, function () {
    $(this)
        .popover({
            html: true,
            template: '<div class="popover ' + $(this)
                    .data("class") +
                '"><div class="arrow"></div><h3 class="popover-title ' +
                $(this)
                    .data("titleclass") + '">Popover right</h3><div class="popover-content"></div></div>'
        });
});

var hoverpopovers = $('[data-toggle=popover-hover]');
$.each(hoverpopovers, function () {
    $(this)
        .popover({
            html: true,
            template: '<div class="popover ' + $(this)
                    .data("class") +
                '"><div class="arrow"></div><h3 class="popover-title ' +
                $(this)
                    .data("titleclass") + '">Popover right</h3><div class="popover-content"></div></div>',
            trigger: "hover"
        });
});


/*Handles ToolTips*/
$("[data-toggle=tooltip]")
    .tooltip({
        html: true
    });

InitiateSideMenu();
InitiateSettings();
InitiateWidgets();

function InitiateSideMenu() {

    //Sidebar Toggler
    $(".sidebar-toggler").on('click', function () {
        $("#sidebar").toggleClass("hide");
        $(".sidebar-toggler").toggleClass("active");
        return false;
    });
    //End Sidebar Toggler

    //Sidebar Collapse
    var b = $("#sidebar").hasClass("menu-compact");
    $("#sidebar-collapse").on('click', function () {
        if (!$('#sidebar').is(':visible'))
            $("#sidebar").toggleClass("hide");
        $("#sidebar").toggleClass("menu-compact");
        $(".sidebar-collapse").toggleClass("active");
        b = $("#sidebar").hasClass("menu-compact");

        if ($(".sidebar-menu").closest("div").hasClass("slimScrollDiv")) {
            $(".sidebar-menu").slimScroll({
                destroy: true
            });
            $(".sidebar-menu").attr('style', '');
        }
        if (b) {
            $(".open > .submenu")
                .removeClass("open");
        } else {
            if ($('.page-sidebar').hasClass('sidebar-fixed')) {
                var position = (readCookie("rtl-support") || location.pathname == "/index-rtl-fa.html" || location.pathname == "index-rtl-ar.html") ? 'right' : 'left';
                $('.sidebar-menu').slimscroll({
                    height: 'auto',
                    position: position,
                    size: '3px',
                    color: themeprimary
                });
            }
        }
        //Slim Scroll Handle


    });
    //End Sidebar Collapse


    //Sidebar Menu Handle
    $(".sidebar-menu").on('click', function (e) {
        var menuLink = $(e.target).closest("a");
        if (!menuLink || menuLink.length == 0)
            return;
        if (!menuLink.hasClass("menu-dropdown")) {
            if (b && menuLink.get(0).parentNode.parentNode == this) {
                var menuText = menuLink.find(".menu-text").get(0);
                if (e.target != menuText && !$.contains(menuText, e.target)) {
                    return false;
                }
            }
            return;
        }
        var submenu = menuLink.next().get(0);
        if (!$(submenu).is(":visible")) {
            var c = $(submenu.parentNode).closest("ul");
            if (b && c.hasClass("sidebar-menu"))
                return;
            c.find("> .open > .submenu")
                .each(function () {
                    if (this != submenu && !$(this.parentNode).hasClass("active"))
                        $(this).slideUp(200).parent().removeClass("open");
                });
        }
        if (b && $(submenu.parentNode.parentNode).hasClass("sidebar-menu"))
            return false;
        $(submenu).slideToggle(200).parent().toggleClass("open");
        return false;
    });
    //End Sidebar Menu Handle
}

function InitiateWidgets() {
    $('.widget-buttons *[data-toggle="maximize"]').on("click", function (event) {
        event.preventDefault();
        var widget = $(this).parents(".widget").eq(0);
        var button = $(this).find("i").eq(0);
        var compress = "fa-compress";
        var expand = "fa-expand";
        if (widget.hasClass("maximized")) {
            if (button) {
                button.addClass(expand).removeClass(compress);
            }
            widget.removeClass("maximized");
            widget.find(".widget-body").css("height", "auto");
        } else {
            if (button) {
                button.addClass(compress).removeClass(expand);
            }
            widget.addClass("maximized");
            maximize(widget);
        }
    });

    $('.widget-buttons *[data-toggle="collapse"]').on("click", function (event) {
        event.preventDefault();
        var widget = $(this).parents(".widget").eq(0);
        var body = widget.find(".widget-body");
        var button = $(this).find("i");
        var down = "fa-plus";
        var up = "fa-minus";
        var slidedowninterval = 300;
        var slideupinterval = 200;
        if (widget.hasClass("collapsed")) {
            if (button) {
                button.addClass(up).removeClass(down);
            }
            widget.removeClass("collapsed");
            body.slideUp(0, function () {
                body.slideDown(slidedowninterval);
            });
        } else {
            if (button) {
                button.addClass(down)
                    .removeClass(up);
            }
            body.slideUp(slideupinterval, function () {
                widget.addClass("collapsed");
            });
        }
    });

    $('.widget-buttons *[data-toggle="dispose"]').on("click", function (event) {
        event.preventDefault();
        var toolbarLink = $(this);
        var widget = toolbarLink.parents(".widget").eq(0);
        var disposeinterval = 300;
        widget.hide(disposeinterval, function () {
            widget.remove();
        });
    });
}

// Fullscreen Widget
function maximize(widgetbox) {
    if (widgetbox) {
        var windowHeight = $(window).height();
        var headerHeight = widgetbox.find(".widget-header").height();
        widgetbox.find(".widget-body").height(windowHeight - headerHeight);
    }
}

/* Scroll To */
function scrollTo(el, offeset) {
    var pos = (el && el.size() > 0) ? el.offset().top : 0;
    jQuery('html,body').animate({
        scrollTop: pos + (offeset ? offeset : 0)
    }, 'slow');
}

/*Show Notification*/
function Notify(message, position, timeout, theme, icon, closable) {
    toastr.options.positionClass = 'toast-' + position;
    toastr.options.extendedTimeOut = 0; //1000;
    toastr.options.timeOut = timeout;
    toastr.options.closeButton = closable;
    toastr.options.iconClass = icon + ' toast-' + theme;
    toastr['custom'](message);
}

/*#region handle Settings*/
function InitiateSettings() {
    if (readCookie("navbar-fixed-top") != null) {
        if (readCookie("navbar-fixed-top") == "true") {
            $('#checkbox_fixednavbar').prop('checked', true);
            $('.navbar').addClass('navbar-fixed-top');
        }
    }

    if (readCookie("sidebar-fixed") != null) {
        if (readCookie("sidebar-fixed") == "true") {
            $('#checkbox_fixedsidebar').prop('checked', true);
            $('.page-sidebar').addClass('sidebar-fixed');

            //Slim Scrolling for Sidebar Menu in fix state
            if (!$(".page-sidebar").hasClass("menu-compact")) {
                var position = (readCookie("rtl-support") || location.pathname == "/index-rtl-fa.html" || location.pathname == "index-rtl-ar.html") ? 'right' : 'left';
                $('.sidebar-menu').slimscroll({
                    height: 'auto',
                    position: position,
                    size: '3px',
                    color: themeprimary
                });
            }
        }

    }
    if (readCookie("breadcrumbs-fixed") != null) {
        if (readCookie("breadcrumbs-fixed") == "true") {
            $('#checkbox_fixedbreadcrumbs').prop('checked', true);
            $('.page-breadcrumbs').addClass('breadcrumbs-fixed');
        }
    }
    if (readCookie("page-header-fixed") != null) {
        if (readCookie("page-header-fixed") == "true") {
            $('#checkbox_fixedheader').prop('checked', true);
            $('.page-header').addClass('page-header-fixed');
        }
    }


    $('#checkbox_fixednavbar')
        .change(function () {
            $('.navbar')
                .toggleClass('navbar-fixed-top');

            if (($('#checkbox_fixedsidebar')
                .is(":checked"))) {
                $('#checkbox_fixedsidebar')
                    .prop('checked', false);
                $('.page-sidebar')
                    .toggleClass('sidebar-fixed');
            }

            if (($('#checkbox_fixedbreadcrumbs')
                .is(":checked")) && !($(this)
                .is(":checked"))) {
                $('#checkbox_fixedbreadcrumbs')
                    .prop('checked', false);
                $('.page-breadcrumbs')
                    .toggleClass('breadcrumbs-fixed');
            }

            if (($('#checkbox_fixedheader')
                .is(":checked")) && !($(this)
                .is(":checked"))) {
                $('#checkbox_fixedheader')
                    .prop('checked', false);
                $('.page-header')
                    .toggleClass('page-header-fixed');
            }
            setCookiesForFixedSettings();
        });

    $('#checkbox_fixedsidebar')
        .change(function () {

            $('.page-sidebar')
                .toggleClass('sidebar-fixed');

            if (!($('#checkbox_fixednavbar')
                .is(":checked"))) {
                $('#checkbox_fixednavbar')
                    .prop('checked', true);
                $('.navbar')
                    .toggleClass('navbar-fixed-top');
            }
            if (($('#checkbox_fixedbreadcrumbs')
                .is(":checked")) && !($(this)
                .is(":checked"))) {
                $('#checkbox_fixedbreadcrumbs')
                    .prop('checked', false);
                $('.page-breadcrumbs')
                    .toggleClass('breadcrumbs-fixed');
            }

            if (($('#checkbox_fixedheader')
                .is(":checked")) && !($(this)
                .is(":checked"))) {
                $('#checkbox_fixedheader')
                    .prop('checked', false);
                $('.page-header')
                    .toggleClass('page-header-fixed');
            }
            setCookiesForFixedSettings();

        });
    $('#checkbox_fixedbreadcrumbs')
        .change(function () {

            $('.page-breadcrumbs')
                .toggleClass('breadcrumbs-fixed');


            if (!($('#checkbox_fixedsidebar')
                .is(":checked"))) {
                $('#checkbox_fixedsidebar')
                    .prop('checked', true);
                $('.page-sidebar')
                    .toggleClass('sidebar-fixed');
            }
            if (!($('#checkbox_fixednavbar')
                .is(":checked"))) {
                $('#checkbox_fixednavbar')
                    .prop('checked', true);
                $('.navbar')
                    .toggleClass('navbar-fixed-top');
            }
            if (($('#checkbox_fixedheader')
                .is(":checked")) && !($(this)
                .is(":checked"))) {
                $('#checkbox_fixedheader')
                    .prop('checked', false);
                $('.page-header')
                    .toggleClass('page-header-fixed');
            }
            setCookiesForFixedSettings();

        });

    $('#checkbox_fixedheader')
        .change(function () {

            $('.page-header')
                .toggleClass('page-header-fixed');


            if (!($('#checkbox_fixedbreadcrumbs')
                .is(":checked"))) {
                $('#checkbox_fixedbreadcrumbs')
                    .prop('checked', true);
                $('.page-breadcrumbs')
                    .toggleClass('breadcrumbs-fixed');
            }

            if (!($('#checkbox_fixedsidebar')
                .is(":checked"))) {
                $('#checkbox_fixedsidebar')
                    .prop('checked', true);
                $('.page-sidebar')
                    .toggleClass('sidebar-fixed');
            }
            if (!($('#checkbox_fixednavbar')
                .is(":checked"))) {
                $('#checkbox_fixednavbar')
                    .prop('checked', true);
                $('.navbar')
                    .toggleClass('navbar-fixed-top');
            }

            setCookiesForFixedSettings();
        });
}

function setCookiesForFixedSettings() {
    createCookie("navbar-fixed-top", $('#checkbox_fixednavbar').is(':checked'), 100);
    createCookie("sidebar-fixed", $('#checkbox_fixedsidebar').is(':checked'), 100);
    createCookie("breadcrumbs-fixed", $('#checkbox_fixedbreadcrumbs').is(':checked'), 100);
    createCookie("page-header-fixed", $('#checkbox_fixedheader').is(':checked'), 100);

    var position = (readCookie("rtl-support") || location.pathname == "/index-rtl-fa.html" || location.pathname == "index-rtl-ar.html") ? 'right' : 'left';
    if ($('#checkbox_fixedsidebar').is(':checked')) {
        if (!$('.page-sidebar').hasClass('menu-compact')) {
            //Slim Scrolling for Sidebar Menu in fix state
            $('.sidebar-menu').slimscroll({
                position: position,
                size: '3px',
                color: themeprimary,
                height: 'auto',
            });
        }
    } else {
        if ($(".sidebar-menu").closest("div").hasClass("slimScrollDiv")) {
            $(".sidebar-menu").slimScroll({
                destroy: true
            });
            $(".sidebar-menu").attr('style', '');
        }
    }
}

/*#endregion handle Settings*/

//Chat
$("#chat-link").click(function () {
    $('.page-chatbar').toggleClass('open');
    $("#chat-link").toggleClass('open');
});
$('.page-chatbar .chatbar-contacts .contact').on('click', function (e) {
    $('.page-chatbar .chatbar-contacts').hide();
    $('.page-chatbar .chatbar-messages').show();
});

$('.page-chatbar .chatbar-messages .back').on('click', function (e) {
    $('.page-chatbar .chatbar-contacts').show();
    $('.page-chatbar .chatbar-messages').hide();
});
var position = (readCookie("rtl-support") || location.pathname == "/index-rtl-fa.html" || location.pathname == "index-rtl-ar.html") ? 'right' : 'left';
$('.chatbar-messages .messages-list').slimscroll({
    position: position,
    size: '4px',
    color: themeprimary,
    height: $(window).height() - 250,
});
$('.chatbar-contacts .contacts-list').slimscroll({
    position: position,
    size: '4px',
    color: themeprimary,
    height: $(window).height() - 86,
});
//End Chat

/*#region Get Colors*/

//Get colors from a string base on theme colors
function getcolor(colorString) {
    switch (colorString) {
        case ("themeprimary"):
            return themeprimary;
        case ("themesecondary"):
            return themesecondary;
        case ("themethirdcolor"):
            return themethirdcolor;
        case ("themefourthcolor"):
            return themefourthcolor;
        case ("themefifthcolor"):
            return themefifthcolor;
        default:
            return colorString;
    }
}

/*#endregion Get Colors*/


//Switch Classes Function
function switchClasses(firstClass, secondClass) {

    var firstclasses = document.getElementsByClassName(firstClass);

    for (i = firstclasses.length - 1; i >= 0; i--) {
        if (!hasClass(firstclasses[i], 'dropdown-menu')) {
            addClass(firstclasses[i], firstClass + '-temp');
            removeClass(firstclasses[i], firstClass);
        }
    }

    var secondclasses = document.getElementsByClassName(secondClass);

    for (i = secondclasses.length - 1; i >= 0; i--) {
        if (!hasClass(secondclasses[i], 'dropdown-menu')) {
            addClass(secondclasses[i], firstClass);
            removeClass(secondclasses[i], secondClass);
        }
    }

    tempClasses = document.getElementsByClassName(firstClass + '-temp');

    for (i = tempClasses.length - 1; i >= 0; i--) {
        if (!hasClass(tempClasses[i], 'dropdown-menu')) {
            addClass(tempClasses[i], secondClass);
            removeClass(tempClasses[i], firstClass + '-temp');
        }
    }
}


//Add Classes Function
function addClass(elem, cls) {
    var oldCls = elem.className;
    if (oldCls) {
        oldCls += " ";
    }
    elem.className = oldCls + cls;
}

//Remove Classes Function
function removeClass(elem, cls) {
    var str = " " + elem.className + " ";
    elem.className = str.replace(" " + cls, "").replace(/^\s+/g, "").replace(/\s+$/g, "");
}

//Has Classes Function
function hasClass(elem, cls) {
    var str = " " + elem.className + " ";
    var testCls = " " + cls + " ";
    return (str.indexOf(testCls) != -1);
}