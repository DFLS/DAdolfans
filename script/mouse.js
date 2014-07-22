/* 
 * DAdolfans  By Losses Don
 * You can use the code under CC BY-SA 3.0. * 
 */

mouse = {
    getSelection: function() {
        var selection = getSelection();
        collapsed = selection.isCollapsed;
        anchorNode = selection.anchorNode;
        anchorOffset = selection.anchorOffset;
        ranges = [];
        for (var i = 0; i < selection.rangeCount; i++)
            ranges.push(selection.getRangeAt(i));
    },
    replaceSelection: function() {
        if (collapsed)
            getSelection().collapse(anchorNode, anchorOffset);
        else {
            var selection = getSelection();
            ranges.forEach(function(e) {
                selection.addRange(e);
            });
        }
    }
};