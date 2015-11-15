//------------------------------------------------------------------------------------------
// The app
//------------------------------------------------------------------------------------------
var jsConfirmDemo = {};

jsConfirmDemo.confirmCallback = function(data) {
    "use strict";

    console.log(data);
};

jsConfirmDemo.confirmCallbackTwo = function() {
    "use strict";

    console.log("like");
};

//------------------------------------------------------------------------------------------
// Init jsConfirm
//------------------------------------------------------------------------------------------

jsConfirm.init('delete', {
    callback: jsConfirmDemo.confirmCallback,
    url: appConfig.url,
    title: "Delete Image",
    text: "Are you sure you want to delete {/name/}?",
    cancelText: "Cancel",
    proceedText: "Delete file",
    data: ["name", "id"],
    extra: {
        csrfmiddlewaretoken: appConfig.csrfmiddlewaretoken
    }
});

jsConfirm.init('like', {
    callback: jsConfirmDemo.confirmCallbackTwo,
    title: "Like Image",
    text: "Are you sure you want to save {/name/}?",
    cancelText: "Cancel",
    proceedText: "Save file",
    data: ["name", "id"]
});

//------------------------------------------------------------------------------------------
// hCentering content for huge screens
//------------------------------------------------------------------------------------------

// Wait an event to finish - performance
jsConfirmDemo._delay = (function() {
    var timer = 0;
    return function(callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

jsConfirmDemo._resize = function() {
    jsConfirmDemo._delay(function() {
        jsConfirmDemo._resized();
    }, 100);
};

// Fired when the user actually end the resize process for performance
jsConfirmDemo._resized = function() {
    "use strict";
    
    var content = document.getElementsByClassName("content");
    content = content[0];

    if (content) {
        var contentHeight = parseInt(window.getComputedStyle(content).height, 10); // content height
    
        var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0); // Window inner height
        
        var margin = (height - contentHeight) / 2; // Calculating extra margin

        var footer = document.getElementsByTagName("footer");
        footer = footer[0];
        if (margin > 0) { // Need to be centered
            content.setAttribute("style", "margin: " + margin + "px 0");
            footer.setAttribute("style", "position: fixed; bottom:0");
        } else {
            content.setAttribute("style", "margin: 0");            
            footer.setAttribute("style", "position: relative;");
        }

    }
};

window.addEventListener("resize", jsConfirmDemo._resized, false);
jsConfirmDemo._resize();