////////////////////////////////////////////////////////////////////////////////////////////
// The MIT License (MIT)                                                                  //
//                                                                                        //
// Copyright (C) 2015  Christopher Mejía Montoya - me@chrissmejia.com - chrissmejia.com   //
//                                                                                        //
// Permission is hereby granted, free of charge, to any person obtaining a copy           //
// of this software and associated documentation files (the "Software"), to deal          //
// in the Software without restriction, including without limitation the rights           //
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell              //
// copies of the Software, and to permit persons to whom the Software is                  //
// furnished to do so, subject to the following conditions:                               //
//                                                                                        //
// The above copyright notice and this permission notice shall be included in all         //
// copies or substantial portions of the Software.                                        //
//                                                                                        //
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR             //
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,               //
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE            //
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER                 //
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,          //
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE          //
// SOFTWARE.                                                                              //
////////////////////////////////////////////////////////////////////////////////////////////

//------------------------------------------------------------------------------------------
// Main Object, everything it's contained here
//------------------------------------------------------------------------------------------
var jsConfirm = {
    name : 'jsConfirm',
    version : '0.0.1',
    settings: {},
};


//------------------------------------------------------------------------------------------
// Setup the window
//------------------------------------------------------------------------------------------
jsConfirm.init = function (className, settings) {
    "use strict";

    // Moving to start position only the first time
    if (!Object.keys(jsConfirm.settings).length) {
        var modalWindow = document.getElementById("jsConfirm"); // DOM object
        jsConfirm._startPosition(modalWindow);
    }

    // Checking if it's already initialized
    if (className in jsConfirm.settings) {
        console.error(className + " is already initialized");
        return;
    }

    // Checking if a callback it's provided
    if (typeof settings.callback !== "function") {
        console.error("Callback it's not provided for " + className);
        return;
    }
    
    // Initializing element
    // Storing settings
    jsConfirm.settings[className] = settings;
    
    // Events
    document.body.onclick = function(e) {
        e =e || window.event;
        var target = e.target || e.srcElement;

        // Listen to close modal
        if (jsConfirm._hasClass(target, "jsConfirmClose")) {
            jsConfirm._hide();
            return;
        }
        
        // Listen only a elements
        if (target.nodeName !== 'A') {
            return;
        }
        
        // Listen only for any of the set it classNames
        for (var modal in jsConfirm.settings) {
            if (jsConfirm._hasClass(target, modal)) {
                jsConfirm.settings[modal].callback(target);
                jsConfirm._show(target, modal);
            }
        }


    };
};

//------------------------------------------------------------------------------------------
// Remove a class from an object using the id
//------------------------------------------------------------------------------------------
jsConfirm._removeClass = function (d, className) {
    "use strict";

    className = " " + className; //must keep a space before class name
    d.className = d.className.replace(className,""); // first remove the class name if that already exists
};

//------------------------------------------------------------------------------------------
// Add a class from an object using the id
//------------------------------------------------------------------------------------------
jsConfirm._addClass = function (d, className) {
    "use strict";
    
    jsConfirm._removeClass(d, className); // first remove the class name if that already exists
    d.className = d.className + " " + className; // adding new class name
};

//------------------------------------------------------------------------------------------
// Check if an element has a class
//------------------------------------------------------------------------------------------
jsConfirm._hasClass = function (d, className) {
    "use strict";
    
    var re = new RegExp("(?:^| )" + className + "(?:$| )", 'g');
    if (d.className.match(re)) {
        return true;
    }
    return false;
};

//------------------------------------------------------------------------------------------
// Get child element from parent by class name
//------------------------------------------------------------------------------------------
jsConfirm._getChildByClass = function (d, className) {
    "use strict";

    var childNodes = d.getElementsByClassName(className);

    if (!childNodes.length) {
        console.error("The element don't exists, are you sure you copy the base HTML?");        
    }

    return childNodes[0];
};

//------------------------------------------------------------------------------------------
// Get child element from parent by more than one class name
//------------------------------------------------------------------------------------------
jsConfirm._getChildByClasses = function (d, classNames) {
    "use strict";

    var classArray = classNames.split(" ");
    var classArrayLength = classArray.length; // Performance

    // Search in order
    for (var i = 0; i < classArrayLength; i++) {
        d = jsConfirm._getChildByClass(d, classArray[i]);
    }

    return d;
};

//------------------------------------------------------------------------------------------
// Get the window width
//------------------------------------------------------------------------------------------
jsConfirm._windowWidth = function () {
    "use strict";

    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0); // Window inner width
};

//------------------------------------------------------------------------------------------
// Get the window height
//------------------------------------------------------------------------------------------
jsConfirm._windowHeight = function () {
    "use strict";

    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0); // Window inner height
};

//------------------------------------------------------------------------------------------
// Get the modal width
//------------------------------------------------------------------------------------------
jsConfirm._modalWidth = function (d) {
    "use strict";

    return parseInt(window.getComputedStyle(d).width, 10); // modal width
};

//------------------------------------------------------------------------------------------
// Get the modal height
//------------------------------------------------------------------------------------------
jsConfirm._modalHeight = function (d) {
    "use strict";

    return parseInt(window.getComputedStyle(d).height, 10); // modal width
};

//------------------------------------------------------------------------------------------
// Center the modal in x axys
//------------------------------------------------------------------------------------------
jsConfirm._center = function (d) {
    "use strict";
    
    var windowWidth = jsConfirm._windowWidth();
    var dWidth = jsConfirm._modalWidth(d);
    d.style.left = ((windowWidth - dWidth) / 2) + "px"; // Place at center
};

//------------------------------------------------------------------------------------------
// Center the modal in y axys
//------------------------------------------------------------------------------------------
jsConfirm._vCenter = function (d) {
    "use strict";
    
    var windowHeight = jsConfirm._windowHeight(); // Window inner height
    var dHeight = parseInt(window.getComputedStyle(d).height, 10);
    d.style.top = ((windowHeight - dHeight) / 2) + "px"; // Place at vcenter
};

//------------------------------------------------------------------------------------------
// Move the modal window to his start position
//------------------------------------------------------------------------------------------
jsConfirm._startPosition = function (d) {
    "use strict";
    
    jsConfirm._center(d);

    d.style.top = "-" + jsConfirm._modalHeight(d) + "px";

};

//------------------------------------------------------------------------------------------
// Show the modal
//------------------------------------------------------------------------------------------
jsConfirm._show = function (d, className) {
    "use strict";

    var background = document.getElementById("jsConfirmBackground"); // DOM object
    jsConfirm._addClass(background, "show");

    var modalWindow = document.getElementById("jsConfirm"); // DOM object

    // Setting title (Optional)
    if (jsConfirm.settings[className].title){
        var title = jsConfirm._getChildByClasses(modalWindow, "title text");
        title.innerText = jsConfirm.settings[className].title;
    }
    // Setting text (Optional)
    if (jsConfirm.settings[className].text){
        var text = jsConfirm._getChildByClass(modalWindow, "description");
        var customHTML = "<h1>" + jsConfirm.settings[className].text + "</h1>";

        var dataArray = jsConfirm.settings[className].data;
        console.log(dataArray);
        var dataArrayLength = dataArray.length - 1; // Performance
        for (var i = dataArrayLength; i >= 0; i--) {
            customHTML = customHTML.replace("{#" + dataArray[i] + "#}", "<span>" + d.getAttribute("data-" + dataArray[i]) + "</span>");
            console.log("{#" + dataArray[i] + "#}");
        }
        text.innerHTML = customHTML;
    }

    // Setting cancelText (Optional)
    if (jsConfirm.settings[className].cancelText){
        var cancelText = jsConfirm._getChildByClass(modalWindow, "cancel");
        cancelText.innerText = jsConfirm.settings[className].cancelText;
    }

    // Setting proceedText (Optional)
    if (jsConfirm.settings[className].proceedText){
        var proceedText = jsConfirm._getChildByClass(modalWindow, "proceed");
        proceedText.innerText = jsConfirm.settings[className].proceedText;
    }

    jsConfirm._vCenter(modalWindow);
};

//------------------------------------------------------------------------------------------
// Hide the modal
//------------------------------------------------------------------------------------------
jsConfirm._hide = function () {
    "use strict";

    var modalWindow = document.getElementById("jsConfirm"); // DOM object
    jsConfirm._startPosition(modalWindow);

    var background = document.getElementById("jsConfirmBackground"); // DOM object
    jsConfirm._removeClass(background, "show");
};



// Move to other file
//------------------------------------------------------------------------------------------
// The app
//------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function() {
    "use strict";

    jsConfirm.init('delete', {
        callback: jsConfirmDemo.confirmCallback,
        title: "Delete Image",
        text: "Are you sure you want to delete {#name#}?",
        cancelText: "Cancel",
        proceedText: "Delete file",
        data: ["name", "id"]
    });

    jsConfirm.init('like', {
        callback: jsConfirmDemo.confirmCallbackTwo,
        title: "Like Image",
        text: "Are you sure you want to save {#name#}?",
        cancelText: "Cancel",
        proceedText: "Save file",
        data: ["name", "id"]
    });
});

var jsConfirmDemo = {};

jsConfirmDemo.confirmCallback = function(target) {
    "use strict";

    console.log("delete");
};

jsConfirmDemo.confirmCallbackTwo = function(target) {
    "use strict";

    console.log("like");
};
