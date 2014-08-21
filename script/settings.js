var panel = {
    collectSettings: function() {
        Adolfans.settingOptions.autosave = $("#autosave").is(":checked");
        Adolfans.settingOptions.shortcut = $("#shortcut").val();
        Adolfans.writeSettingFile(false);
    },
    readSettings: function() {
        $("#shortcut").val(Adolfans.settingOptions.shortcut);
        if (Adolfans.settingOptions.autosave)
            $("#anti_emoji").attr("checked", "checked");
    }
};

$(document).ready(function() {
    panel.readSettings();
    $("input[type='text']").on("blur", function() {
        panel.collectSettings();
    });

    $("input[type='radio'],input[type='checkbox']").on("change", function() {
        panel.collectSettings();
    });

    $("#close_icon").on("click", function() {
        win.close(true);
    });
});