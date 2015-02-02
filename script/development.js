/**
 * Created by Don on 1/25/2015.
 */
//打开开发人员窗口
$(document).bind('keydown', 'f12', function (evt) {
    win.showDevTools();
});

$(document).bind('keydown', 'f5', function (evt) {
    history.go(0);
});

$(document).bind('keydown', 'f6', function (evt) {
    Adolfans.openFile("../transformtest");
});

$(document).bind('keydown', 'f7', function (evt) {
    try{regex.HTMLToMarkdown(document.querySelector("#main_area"));}
    catch(e){console.log(e)};
});