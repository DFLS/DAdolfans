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
        var that = this;
        var error = false;
        try {
            fs.writeFileSync(file, '\ufeff' + data, writeOption);
        } catch (err) {
            dialog.display("An error happened when saving the document:" + err + ", If you are not sure the meaning, please contact the developer.", false, "ync", function() {
            });
            that.error = true;
        }
        if (!error)
            callback();
    },
    //刷新监控器方法
    refreshObserver: function() {
        DocumentObserver.disconnect();
        DocumentObserver.observe(mainArea, DocumentObserverConfig);
    },
    //设置选项读取与释放方法
    settingFilePath: '../usr/',
    settingFile: 'dadolfans.json',
    settingOptions: {},
    defaultSettingOptions: {
        autosave: false,
        autosaveTime: 30
    },
    readSettingFile: function() {
        var SettingFileLocation = this.settingFilePath + this.settingFile;
        if (fs.existsSync(SettingFileLocation)) {
            this.settingOptions = JSON.parse(fs.readFileSync(SettingFileLocation).toString());
        } else {
            this.settingOptions = this.defaultSettingOptions;
            this.writeSettingFile();
        }
    },
    writeSettingFile: function(isDefault) {
        var optObject;
        isDefault = typeof (isDefault) == 'undefined' ? true : isDefault;
        if (isDefault) {
            optObject = this.defaultSettingOptions;
        } else {
            optObject = Adolfans.settingOptions;
        }
        var SettingFileLocation = this.settingFilePath + this.settingFile;
        var settingJSONString = JSON.stringify(optObject);
        fs.writeFileSync(SettingFileLocation, settingJSONString);
    }
};
