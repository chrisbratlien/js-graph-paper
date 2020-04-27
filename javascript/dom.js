DOM = {};
DOM.element = function () {
    if (arguments.length == 0) { return "ERROR"; }

    var tag = arguments[0];
    var interface = jQuery('<' + tag + '></' + tag + '>');
    if (arguments.length == 1) {
        return interface;
    }

    var children = arguments[1];
    if (typeof children == "string" || typeof children == "number") {
        interface.html(children);
    }
    else if (typeof children == "object") { //probably another jquery object
        interface.append(children);
    }
    else {
        children.each(function (child) {
            interface.append(child);
        });
    }
    return interface;
};

DOM.li = function () {
    if (arguments.length == 0) { return DOM.element('li'); }
    return DOM.element('li', arguments[0]);
};
 'html,head,script,link,body,div,ul,ol,li,a,img,table,thead,tbody,tr,th,td,h1,h2,h3,h4,h5,h6,select,option,input,textarea,button,iframe,audio,object,video,canvas,'.split(/,/).each(function (tag) {
    DOM[tag] = function () {
        if (arguments.length == 0) { return DOM.element(tag); }
        return DOM.element(tag, arguments[0]);
    }
});