/* 
 * DAdolfans  By Losses Don
 * You can use the code under CC BY-SA 3.0. * 
 */


$(document).ready(function() {
//快捷键绑定

    //打开快捷键
    $(document).bind('keydown', 'ctrl+o', function(evt) {
        $("#open_dialog").click();
        evt.preventDefault();
        return false;
    });

    //保存快捷键
    $(document).bind('keydown', 'Ctrl+s', function(evt) {
        Adolfans.saveFile($("#open_dialog").val());
        evt.preventDefault();
        return false;
    });

    //粘贴事件
    mainArea = document.getElementById("main_area");
    //监视粘贴行为并对将要粘贴的内容进行格式化
    mainArea.addEventListener("paste", function(e) {
        //开始数据处理
        var clipboard = e.clipboardData;
        var data = clipboard.getData('text/html');
        var dataCleaned = regex.tagsReg(data);
        document.execCommand('inserthtml', false, dataCleaned);
        console.log(dataCleaned);
        e.preventDefault();
        return false;
    });

    //打开事件监听
    $("#open_dialog").bind('change', function() {
        Adolfans.openFile($("#open_dialog").val());
        console.log("File Opened;");
    });

    //呼出右键菜单
    $("#main_area").bind("contextmenu", function(evt) {
        $("#menu_content").css({
            "display": "block",
            "left": evt.pageX,
            "top": evt.pageY
        });
        actionSwitch.functionMenu = 1;
        evt.preventDefault();
        return false;
    });

    //菜单消失
    $(document).bind("click keydown", function() {
        setTimeout(function() {
            if (actionSwitch.functionMenu === 1) {
                $("#menu_content").hide();
                actionSwitch.functionMenu = 0;
            }
        }, 10);
    });

    //呼出heading菜单
    $("#follow,#heading_list").mouseover(function() {
        $("#heading_list").css("height", "230px");
        $("#heading_list li").css("height", "30px");
    });
    $("#follow,#heading_list").mouseout(function() {
        $("#heading_list").css("height", "0");
        $("#heading_list li").css("height", "0");
    });

    //绑定功能
    $("#bold").click(function() {
        document.execCommand('bold', true, null);
    });

    $("#italic").click(function() {
        document.execCommand('italic', true, null);
    });

    $("#cut").click(function() {
        document.execCommand('cut', true, null);
    });

    $("#copy").click(function() {
        document.execCommand('copy', true, null);
    });

    $("#paste").click(function() {
        document.execCommand('paste', true, null);
    });

    $("#h1").click(function() {
        document.execCommand('formatBlock', true, "<h1>");
    });

    $("#h2").click(function() {
        document.execCommand('formatBlock', true, "<h2>");
    });

    $("#h3").click(function() {
        document.execCommand('formatBlock', true, "<h3>");
    });

    $("#h4").click(function() {
        document.execCommand('formatBlock', true, "<h4>");
    });

    $("#h5").click(function() {
        document.execCommand('formatBlock', true, "<h5>");
    });

    $("#h6").click(function() {
        document.execCommand('formatBlock', true, "<h6>");
    });
});
