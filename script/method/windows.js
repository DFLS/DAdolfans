/* 
 * DAdolfans  By Losses Don
 * You can use the code under CC BY-SA 3.0. * 
 */

var windows = {
    //这个方法我已经不想再去动它了，警告，不要动这个方法，太特么恶心了
    saveCheck: function(actionContinue) {
        if (documentChanged) {
            dialog.display("Save the document?", false, "ync", function(dialogReturn) {
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
    refreshTitle: function() {
        console.log(filePath);
        if (documentIsFile)
            var windowTitle = regex.FileURl(filePath);
        else
            var windowTitle = "Untitled";

        if (documentChanged)
            windowTitle = "<b>" + windowTitle + "</b>";

        $("#my_adolfans").html(windowTitle);
    },
    settingWindow: {}
};

