/* 
 * DAdolfans  By Losses Don
 * You can use the code under CC BY-SA 3.0. * 
 */

var dialog = {
    display: function(title, ifTextarea, buttonMode, callback) {
        //将dialog对象定义为that
        var that = this;
        //设置dialog标题
        $("#dialog_title").text(title);
        //判断dialog是否需要文本输入框
        if (ifTextarea){
            $("#dialog").attr("class","with_input");
            $("#dialog_input").show();
        }else{
            $("#dialog").attr("class","without_input");
        }
        //判断需要的按钮组
        if (buttonMode === "yn")
            $("#yes,#no").show();
        else if (buttonMode === "ync")
            $("#yes,#no,#cancel").show();
        else if (buttonMode === "cc")
            $("#confirm,#cancel").show();
        $("#dialog").show();
        //当单击不同的按钮时返回不同的操作类型
        $('#yes,#confirm').click(function() {
            this.returnValue = true;
            callback(this.returnValue);
            that.away();
        });
        $('#no').click(function() {
            this.returnValue = false;
            callback(this.returnValue);
            that.away();
        });
        $('#cancel').click(function() {
            this.returnValue = null;
            callback(this.returnValue);
            that.away();
        });
    },
    
    away: function() {
        var dialogElements = ["#yes", "#no", "#cancel", "#confirm", "#dialog_input"];
        for (x in dialogElements) {
            dialogElement = dialogElements[x];
            //if ($(dialogElement).data("events") && $(dialogElement).data("events")["click"])
            $(dialogElement).unbind();
            $(dialogElement).hide();
        }
        $('#dialog').hide();
    }
};