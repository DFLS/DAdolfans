/* 
 * DAdolfans  By Losses Don
 * You can use the code under CC BY-SA 3.0. * 
 */

var regex = {
    tagsReg: function(data) {
        //清理标签属性正则
        var tagsCleanExpression = new RegExp("<(span|p|div|h[1-6]|b|i|s|ul|li|td|tr)[\\s\\S]*?>", "gm");
        //M$ Office 你创造了狠多奇怪的标签你造么
        var tagsRemoveExpression = new RegExp("<!.*?>|<o:.*?>|</o.*?>|<body>|<html>|</body>|</html>", "g");
        //获取文档内容
        var dataOri = data;
        //进行正则替换
        var dataReg = dataOri.replace(tagsCleanExpression, "<$1>");
        console.log(dataReg);
        var dataReg = dataReg.replace(tagsRemoveExpression, "");
        console.log(dataReg);
        //将文档内容回填至编辑框
        return dataReg;
    },
    format: function(action) {
        document.execCommand(action, false, null);
    }
}
