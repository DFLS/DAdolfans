/* 
 * DAdolfans  By Losses Don
 * You can use the code under CC BY-SA 3.0. * 
 */

//文件调用类库，豆娘是人类的真理！
var Adolfans = {
    //文件打开方法
    openFile: function(file) {
        fs.readFile(file, 'utf-8', function(err, data) {
            if (err) {
                console.error(err);
                return;
            }
            var content = data;
            $('#main_area').html(content);
        })
    },
    //文件保存方法
    saveFile: function(file) {
        var data = $('#main_area').html();
        fs.writeFile(file, data, 'utf-8', function(err) {
            if (err) {
                console.error(err);
                return;
            }
        });
    }
};
