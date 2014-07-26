/* 
 * DAdolfans  By Losses Don
 * You can use the code under CC BY-SA 3.0. * 
 */

////////////////////////////////////////////////////////////////////////////////
//窗体类事件
////////////////////////////////////////////////////////////////////////////////    

//监视窗口关闭行为
win.on('close', function() {
    if (documentChanged) {
        dialog.display("You have changed the document,save it before exit?", false, "ync", function(dialogReturn) {
            if (typeof (dialogReturn) === "boolean") {
                if (dialogReturn) {
                    if (documentIsFile)
                        Adolfans.saveFile($("#open_dialog").val());
                    else
                        $("#save_dialog").click();
                }
                this.close(true);
            }
        });
    } else {
        this.close(true);
    }
});

$(document).ready(function() {
    ////////////////////////////////////////////////////////////////////////////////
    //文件操作类事件
    ////////////////////////////////////////////////////////////////////////////////

    //打开快捷键
    $(document).bind('keydown', 'ctrl+o', function(evt) {
        if (documentChanged) {
            dialog.display("Save the document?", false, "ync", function(dialogReturn) {
                console.log(dialogReturn);
                if (typeof (dialogReturn) === "boolean") {
                    if (dialogReturn) {
                        if (documentIsFile)
                            Adolfans.saveFile($("#open_dialog").val());
                        else
                            $("#save_dialog").click();
                    }
                    $("#open_dialog").click();
                }

            });
        } else {
            $("#open_dialog").click();
        }
        evt.preventDefault();
        return false;
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
        console.log(dataCleaned);
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
    $("#follow,#heading_list").mouseover(function() {
        $("#heading_list").css("height", "230px");
        $("#heading_list li").css("height", "30px");
    });
    $("#follow,#heading_list").mouseout(function() {
        $("#heading_list").css("height", "0");
        $("#heading_list li").css("height", "0");
    });

    //绑定一般格式功能
    var functionAction = ["bold", "italic", "cut", "copy", "paste"];
    for (x in functionAction) {
        var actionName = functionAction[x];
        var actionElement = "#" + actionName;
        $(actionElement).click(function() {
            document.execCommand(actionName, true, null);
        });
    }

    //绑定标题格式功能
    for (var i = 0; i < 6; i++) {
        var actionElement = "#h" + i;
        var actionTag = "<h" + i + ">";
        $(actionElement).click(function() {
            document.execCommand('formatBlock', true, actionTag);
        });
    }
});