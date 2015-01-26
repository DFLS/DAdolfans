/* 
 * DAdolfans  By Losses Don
 * You can use the code under CC BY-SA 3.0. * 
 */

var windows = {
    _CACHE_: {},
    //这个方法我已经不想再去动它了，警告，不要动这个方法，太特么恶心了
    saveCheck: function (actionContinue) {
        if (documentChanged) {
            dialog.display("Save the document?", false, "ync", function (dialogReturn) {
                if (typeof (dialogReturn) === "boolean") {
                    if (dialogReturn) {
                        if (documentIsFile)
                            Adolfans.saveFile($("#save_dialog").val());
                        else
                            $("#open_dialog").click();
                    } else {
                        actionContinue();
                    }
                }
            });
        } else {
            actionContinue();
        }
        return false;
    },

    showPosition: function () {
        if (($("#main_area")[0].scrollHeight - $(document).height()) !== 0) {
            var mainAreaScrollPositionPercent = $("#main_area").scrollTop() / ($("#main_area")[0].scrollHeight - $(document).height());
            var arrorPosition = (($("#navigator_hotarea").height() - 50) * mainAreaScrollPositionPercent) + 50;
            $("#navigator_arror").css({"top": arrorPosition + "px", "opacity": "1", "right": "5px"});
        }
    },
    hidePosition: function () {
        if (!arrorDraging)
            $("#navigator_arror").css({"opacity": "0", "right": "0px"});
    },

    refreshTitle: function () {
        if (documentIsFile)
            var windowTitle = regex.FileURl(filePath);
        else
            var windowTitle = "Untitled";

        if (documentChanged)
            windowTitle = "<b>" + windowTitle + "</b>";

        $("#my_adolfans").html(windowTitle);
    },
    refreshCount: function () {
        var count = $("#main_area").text().length;
        $("#counter_words").html(count);
    },
    settingWindow: {}
};

