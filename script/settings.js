var panel = {
    collectSettings: function () {
        wm.cp(function (p) {
            var options = {
                autosave: $("#autosave").is(":checked"),
                autosaveTime: $("#autosavetime").val()
            }

            p.Adolfans.writeSettingFile(options);

            p.Adolfans.applySettingFile(true);
        });
    },
    readSettings: function () {
        $("#autosavetime").val(Adolfans.settingOptions.autosavetime);
        if (Adolfans.settingOptions.autosave)
            $("#autosave").attr("checked", "checked");
    }
};

$(document).ready(function () {
    panel.readSettings();

    $("input[type='text']").on("blur", function () {
        panel.collectSettings();
    });

    $("input[type='radio'],input[type='checkbox']").on("change", function () {
        panel.collectSettings();
    });

    $("#close_icon").on("click", function () {
        win.close(true);
    });
});