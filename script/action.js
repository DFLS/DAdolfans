/* 
 * DAdolfans  By Losses Don
 * You can use the code under CC BY-SA 3.0. * 
 */

////////////////////////////////////////////////////////////////////////////////
//窗体类事件
////////////////////////////////////////////////////////////////////////////////   

//打开开发人员窗口
$(document).bind('keydown', 'f12', function(evt) {
    win.showDevTools();
});

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
    //呼出菜单
    $("header").on('click', function() {
        var win = gui.Window.open('about.html', {
            position: 'center',
            "toolbar": false,
            "frame": false,
            width: 337,
            height: 452
        });
    });

    //全屏事件

    $("#full_screen").on('click', function() {
        if (win.isFullscreen) {
            clearTimeout(fullScreenTimeoutEvent);
            win.leaveFullscreen();
            $("header").removeClass("fulled");
            $(this).removeClass("fulled");
            $("header,#title_drag_area").removeClass("fulled");
            $("#title_drag_area").off();
        } else {
            win.enterFullscreen();
            $("header,#title_drag_area").addClass("fulled");
            $(this).addClass("fulled");
            $("#title_drag_area").on({
                "mouseover": function() {
                    clearTimeout(fullScreenTimeoutEvent);
                    $("header").removeClass("fulled");
                },
                "mouseleave": function() {
                    fullScreenTimeoutEvent = setTimeout(function() {
                        $("header").addClass("fulled");
                    }, 1000);
                }
            });
        }
    });

    //窗口关闭按钮
    $("#close").on('click', function() {
        win.close();
    });

    //绑定滑入热区事件
    $("#navigator_hotarea").on("mouseover", function() {
        if (($("#main_area")[0].scrollHeight - $(document).height()) !== 0) {
            var mainAreaScrollPositionPercent = $("#main_area").scrollTop() / ($("#main_area")[0].scrollHeight - $(document).height());
            var arrorPosition = (($("#navigator_hotarea").height() - 50) * mainAreaScrollPositionPercent) + 50;
            $("#navigator_arror").css({"top": arrorPosition + "px", "opacity": "1", "right": "5px"});
        }
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
            filePath = null;
            documentIsFile = false;
            documentChanged = false;
            firstDocumentChange = true;
            Adolfans.refreshObserver();
            windows.refreshTitle();
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
        filePath = $("#open_dialog").val();
        documentIsFile = true;
        documentChanged = false;
        firstDocumentChange = true;
        Adolfans.refreshObserver();
        windows.refreshTitle();
    });

    //保存快捷键
    $(document).bind('keydown', 'Ctrl+s', function(evt) {
        if (documentIsFile)
            Adolfans.saveFile($("#open_dialog").val());
        else {
            $("#save_dialog").click();
            filePath = $("#save_dialog").val();
        }

        documentIsFile = true;
        documentChanged = false;
        documentSavedAction = true;
        firstDocumentChange = true;
        Adolfans.refreshObserver();
        windows.refreshTitle();
        evt.preventDefault();
        return false;
    });

    //保存事件监听
    $("#save_dialog").bind('change', function() {
        Adolfans.saveFile($("#save_dialog").val());
    });


    mainArea = document.querySelector("#main_area");

    //文档状态监听,顺便更新字数统计，再顺便更新下标题栏

    MutationObserver = window.MutationObserver;
    DocumentObserver = new MutationObserver(function(e) {
        documentChanged = true;
        var count = $("#main_area").text().length;
        $("#counter_words").html(count);
        //更新标题栏
        if (firstDocumentChange)
            windows.refreshTitle();
        firstDocumentChange = false;
    });

    DocumentObserverConfig = {attributes: true, childList: true, characterData: true, subtree: true};

    DocumentObserver.observe(mainArea, DocumentObserverConfig);

    ////////////////////////////////////////////////////////////////////////////////
    //格式操作类事件
    ////////////////////////////////////////////////////////////////////////////////

    //监视粘贴行为并对将要粘贴的内容进行格式化
    mainArea.addEventListener("paste", function(e) {
        //开始数据处理
        var clipboard = e.clipboardData;
        var data = clipboard.getData('text/html');
        var dataCleaned;
        //判断输入内容是否为纯文本
        if (data == "")
            dataCleaned = regex.formatClipboard();
        else
            dataCleaned = regex.tagsReg(data);
        document.execCommand('inserthtml', false, dataCleaned);
        e.preventDefault();
        return false;
    });

    //纯文本粘贴
    $(document).bind('keydown', 'Ctrl+Shift+V', function() {
        var insertData = regex.formatClipboard();
        document.execCommand('inserthtml', false, insertData);
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
    $("#list_heading").on({
        "mouseenter": function() {
            timeoutEvent = setTimeout(function() {
                $("#list_style_heading").addClass("selected");
            }, 500);
        },
        "mouseleave":function(){
            clearTimeout(timeoutEvent);
            $("#list_style_heading").removeClass("selected");
        }
    });

//-------------------------------------------------------------------------//
//右键菜单内选项
//-------------------------------------------------------------------------//   
    $("#cut").click(function() {
        document.execCommand('cut', true, null);
    });

    $("#copy").click(function() {
        document.execCommand('copy', true, null);
    });

    $("#paste").click(function() {
        document.execCommand('paste', true, null);
    });

    $("#clearFormat").click(function() {
        document.execCommand('RemoveFormat', false, null);
    });

    //绑定一般格式功能
    $("#bold").click(function() {
        document.execCommand('bold', true, null);
    });

    $("#italic").click(function() {
        document.execCommand('italic', true, null);
    });

    $("#link").click(function() {
        mouse.getSelection();
        dialog.display("Inupt the URL of the link you want to insert.", true, "cc", function(linkURl) {
            if (linkURl !== false) {
                mouse.replaceSelection();
                document.execCommand('CreateLink', false, linkURl);
            }
        });
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
    
    //绑定列表功能
    
    $("#unordered_list").click(function() {
        document.execCommand('InsertUnorderedList', true, "<h6>");
    });
    
    $("#ordered_list").click(function() {
        document.execCommand('InsertOrderedList', true, "<h6>");
    });
});