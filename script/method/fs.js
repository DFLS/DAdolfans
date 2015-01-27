/* 
 * DAdolfans  By Losses Don
 * You can use the code under CC BY-SA 3.0. * 
 */

//文件调用类库，豆娘是人类的真理！
var Adolfans = {
//文件打开方法
    openFile: function (file) {
        if (file !== "") {
            fs.readFile(file, 'utf8', function (err, data) {
                if (err) {
                    console.error(err);
                    return;
                }
                var content = data;
                $('#main_area').html(content);

                filePath = $("#open_dialog").val();
                documentIsFile = true;
                documentChanged = false;
                firstDocumentChange = true;
                Adolfans.refreshObserver();
                windows.refreshCount();
                windows.refreshTitle();
            });
        }
    },
    //文件保存方法
    saveFile: function (file, callback) {

        callback = callback || function () {
        };
        var data = $('#main_area').html();
        var writeOption = {
            encoding: 'utf8'
        };
        //var fsBuffer=new Buffer (data, encoding='utf8');
        var that = this;
        var error = false;
        try {
            //fs.writeFileSync(file, '\ufeff' + data, writeOption);    //谨以此行代码纪念那年把我折磨的痛不欲生的bug
            fs.writeFileSync(file, data, writeOption);
        } catch (err) {
            dialog.display("An error happened when saving the document:" + err + ", If you are not sure the meaning, please contact the developer.", false, "ync", function () {
            });
            that.error = true;
        }

        documentIsFile = true;
        documentChanged = false;
        documentSavedAction = true;
        firstDocumentChange = true;
        Adolfans.refreshObserver();
        windows.refreshTitle();

        if (!error)
            callback();
    },
    //刷新监控器方法
    refreshObserver: function () {
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
    readSettingFile: function () {
        var SettingFileLocation = Adolfans.settingFilePath + Adolfans.settingFile;
        if (fs.existsSync(SettingFileLocation)) {
            Adolfans.settingOptions = JSON.parse(fs.readFileSync(SettingFileLocation).toString());
        } else {
            Adolfans.writeSettingFile();
        }
    },
    writeSettingFile: function (options) {
        options = typeof (options) == 'undefined' ? Adolfans.defaultSettingOptions : options;
        Adolfans.settingOptions = JSON.parse(JSON.stringify(options));

        var SettingFileLocation = Adolfans.settingFilePath + Adolfans.settingFile;
        var settingJSONString = JSON.stringify(options);

        if (!fs.existsSync(Adolfans.settingFilePath))
            fs.mkdirSync(Adolfans.settingFilePath);
        fs.writeFileSync(SettingFileLocation, settingJSONString);
    },
    applySettingFile: function () {
        Adolfans.readSettingFile();

        //自动保存设置部分
        var _CACHE_;
        _CACHE_ = {intervalEvent: null, intervalStatus: true};
        if (Adolfans.settingOptions.autosave) {
            _CACHE_.intervalEvent = setInterval(function () {
                if (documentIsFile)
                    Adolfans.saveFile(filePath);
            }, Adolfans.settingOptions.autosaveTime * 1000);
            _CACHE_.intervalStatus = true;
        } else {
            if (_CACHE_.intervalEvent) {
                document.clearInterval(_CACHE_.intervalEvent);
                _CACHE_.intervalStatus = false;
            }
        }
    }
};
