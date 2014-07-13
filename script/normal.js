/* 
 * DAdolfans  By Losses Don
 * You can use the code under CC BY-SA 3.0. * 
 */

//开始调用node.js库
fs = require('fs');

$(document).ready(function() {
    //快捷键绑定
    $(document).bind('keydown', 'ctrl+o', function() {
        Adolfans.openFile();
        console.log("File Opened;");
        return false;
        event.preventDefault();
    });

    $(document).bind('keydown', 'ctrl+a', function() {
        Adolfans.openFile();
        console.log("File Opened;");
        return false;
    });

    $(document).bind('keydown', 'Ctrl+s', function(evt) {
        evt.preventDefault();
        Adolfans.saveFile();
        console.log("File Saved;");
        return false;
    });

    $("#main_area").bind('keypress', function() {

    })

    //编辑器初始化
    editor = $("#main_area")[0].contentWindow.document;
    editor.designMode = "on";
    editor.contentEditable = true;

    editor = document.getElementById('main_area');
    body = editor.contentWindow.document.body;

    //编辑器样式初始化，待重写
    body.style.fontSize = 15;
    body.style.lineHeight = 2;
    body.style.fontFamily = "Microsoft Yahei";

    console.log("初始化完毕;");

})
