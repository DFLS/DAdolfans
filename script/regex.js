/* 
 * DAdolfans  By Losses Don
 * You can use the code under CC BY-SA 3.0. * 
 */

var regex = {
    tagsReg: function() {
        //清理标签属性正则
        tagsCleanExpression = new RegExp("<(span|p|div|h[1-6]|b|i|s|ul|li|td|tr)[\\s\\S]*?>", "gm");
        //M$ Office 你创造了狠多奇怪的标签你造么
        tagsRemoveExpression = new RegExp("<!.*?>|<o:.*?>|</o.*?>","g");
        //获取文档内容
        var dataOri = $('#main_area').contents().find('body').html();
        //进行正则替换
        var dataReg = dataOri.replace(tagsCleanExpression, "<$1>");
        var dataReg = dataReg.replace(tagsRemoveExpression, "");
        //将文档内容回填至编辑框
        $('#main_area').contents().find('body').html(dataReg);
    }
}
