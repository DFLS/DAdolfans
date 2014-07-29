/* 
 * DAdolfans  By Losses Don
 * You can use the code under CC BY-SA 3.0. * 
 */

//文件调用类库，豆娘是人类的真理！
var Adolfans = {
    //文件打开方法
    openFile: function(file) {
        if (file !== "") {
            fs.readFile(file, 'utf8', function(err, data) {
                if (err) {
                    console.error(err);
                    return;
                }
                var content = data;
                $('#main_area').html(content);
            });
        }
    },
    //文件保存方法
    saveFile: function(file, callback) {
        callback = callback || function() {
        };
        var data = $('#main_area').html();
        var writeOption = {
            encoding: 'utf8'
        };

        //var fsBuffer=new Buffer (data, encoding='utf8');
        fs.writeFileSync(file, '\ufeff' + data, writeOption);
        
        callback();
    }
};
