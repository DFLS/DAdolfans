/* 
 * DAdolfans  By Losses Don
 * You can use the code under CC BY-SA 3.0. * 
 */

////////////////////////////////////////////////////////////////////////////////
//窗体类事件
////////////////////////////////////////////////////////////////////////////////   

//监视窗口关闭行为
win.on('close', function() {
    var that = this;
    if (documentChanged) {
        dialog.display("You have changed the document,save it before exit?", false, "ync", function(dialogReturn) {
            if (typeof (dialogReturn) === "boolean") {
                if (dialogReturn) {
                    if (documentIsFile) {
                        Adolfans.saveFile($("#open_dialog").val(), function() {
                            that.close(true);
                        });
                    } else {
                        $("#save_dialog").click();
                    }
                } else {
                    that.close(true);
                }
            }
        });
    } else {
        this.close(true);
    }
});

$(document).ready(function() {

    //窗口关闭按钮
    $("#close").on('click', function() {
        win.close();
    });

    //绑定滑入热区事件
    $("#navigator_hotarea").on("mouseover", function() {
        var mainAreaScrollPositionPercent = $("#main_area").scrollTop() / ($("#main_area")[0].scrollHeight - $(document).height());
        var arrorPosition = (($("#navigator_hotarea").height() - 50) * mainAreaScrollPositionPercent) + 50;
        $("#navigator_arror").css({"top": arrorPosition + "px", "opacity": "1", "right": "5px"});
    });

    $("#navigator_hotarea").on("mouseleave", function() {
        if (!arrorDraging)
            $("#navigator_arror").css({"opacity": "0", "right": "0px"});
    });

    //这俩是滚针事件
    $("#navigator_arror").on("mousedown", function() {
        arrorDraging = true;
        $(document).on("mousemove", function(evt) {
            screenPosition.y = evt.pageY;
            if (screenPosition.y < 50)
                arrowY = 50;
            else if (screenPosition.y > $("#navigator_hotarea").height())
                arrorY = $("#navigator_hotarea").height();
            else
                arrowY = screenPosition.y;
            var arrorPositionPercent = ($("#navigator_arror").position().top - 50) / ($("#navigator_hotarea").height() - 50);
            var arrorScrollPosition = ($("#main_area")[0].scrollHeight - $(document).height()) * arrorPositionPercent;
            $("#navigator_arror").css("top", arrowY + "px");
            $("#main_area").scrollTop(arrorScrollPosition);
        });
    });

    $(document).on("mouseup", function() {
        arrorDraging = false;
        $(document).off("mousemove");
        $("#navigator_arror").css({"opacity": "0", "right": "0"});

    });
    ////////////////////////////////////////////////////////////////////////////////
    //文件操作类事件
    ////////////////////////////////////////////////////////////////////////////////

    //新建快捷键
    $(document).bind('keydown', 'ctrl+n', function(evt) {
        windows.saveCheck(function() {
            $("#main_area").html("");
            documentIsFile = false;
            documentChanged = false;
        });
    });

    //打开快捷键
    $(document).bind('keydown', 'ctrl+o', function(evt) {
        windows.saveCheck(function() {
            $("#open_dialog").click();
        });
    });

    //打开事件监听
    $("#open_dialog").bind('change', function() {
        Adolfans.openFile($("#open_dialog").val());
        documentIsFile = true;
        documentChanged = false;
    });

    //保存快捷键
    $(document).bind('keydown', 'Ctrl+s', function(evt) {
        if (documentIsFile)
            Adolfans.saveFile($("#open_dialog").val());
        else
            $("#save_dialog").click();
        evt.preventDefault();
        return false;
    });

    //保存事件监听
    $("#save_dialog").bind('change', function() {
        Adolfans.saveFile($("#save_dialog").val());
        documentIsFile = true;
        documentChanged = false;
    });

    mainArea = document.getElementById("main_area");
    //文档状态监听,顺便更新字数统计
    $("#main_area").bind('blur keyup paste input', function() {
        documentChanged = true;
        var text = $("#main_area").text();
        var count = text.length;
        $("#counter_words").html(count);
    });
    ////////////////////////////////////////////////////////////////////////////////
    //格式操作类事件
    ////////////////////////////////////////////////////////////////////////////////

    //监视粘贴行为并对将要粘贴的内容进行格式化
    mainArea.addEventListener("paste", function(e) {
        //开始数据处理
        var clipboard = e.clipboardData;
        var data = clipboard.getData('text/html');
        var dataCleaned = regex.tagsReg(data);
        document.execCommand('inserthtml', false, dataCleaned);
        e.preventDefault();
        return false;
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
        if (actionSwitch.functionMenu === 1) {
            $("#menu_content").hide();
            actionSwitch.functionMenu = 0;
        }
    });

    //呼出heading菜单
    $("#follow").mouseover(function() {
        $("#heading_list,#list_style").css("height", "230px");
        $("#heading_list li").css("height", "30px");
    });

    $("#list_style").mouseleave(function() {
        $("#list_style").css("height", "40px");
        $("#heading_list").css("height", "0");
        $("#heading_list li").css("height", "0");
    });

    //绑定一般格式功能
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

    //绑定标题格式功能
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