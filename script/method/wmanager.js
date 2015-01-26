/**
 * Created by Don on 1/25/2015.
 */
var wm = {
    _window_: {
        gui: require('nw.gui'),
        thisWindow: this.gui.Window.get()
    },

    parentWindow: null,

    open: function (location, option) {
        var newWindow, newWindowObject;
        newWindow = wm._window_.gui.Window.open(location, option);

        newWindow.on('loaded', function () {
            newWindow.window.wm.parentWindow = wm._window_.thisWindow.window;
            newWindowObject = newWindow.window;
        });

        return newWindowObject;
    },

    cp: function (func) {
        func(wm.parentWindow);
    }
}