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
    cache: {}, // Don't hit the DOM at least that is strictly necessary
    settings: {},
    window: '', // Current window type, don't ask the DOM
    resized: false//, // Avoid recalcule until is strictly necessary
//    resolution: {}
};


//------------------------------------------------------------------------------------------
// Setup the window
//------------------------------------------------------------------------------------------
jsConfirm.init = function (className, settings) {
    "use strict";

    // Run only the first time
    if (!Object.keys(jsConfirm.settings).length) {
        
        // Moving to start position
        var modalWindow = document.getElementById("jsConfirm"); // DOM object
        jsConfirm._startPosition(modalWindow, false);

        window.onresize = function() {
            jsConfirm._resize();
        };
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
        
        // Show window for any of the set it classNames
        for (var modal in jsConfirm.settings) {
            if (jsConfirm._hasClass(target, modal)) {
                jsConfirm._show(target, modal);
            }
        }

        if (target.getAttribute('id') === "jsConfirmProceed") {
            jsConfirm.settings[jsConfirm.window].callback(target);
            jsConfirm._hide();
        }
    };
};


//------------------------------------------------------------------------------------------
// Don't hit the DOM at least that is strictly necessary
// Check if the value it's already calculated
//------------------------------------------------------------------------------------------
jsConfirm._get = function(name, getFn, force) {
    "use strict";

    if (jsConfirm.cache[name] && !force) {
        return jsConfirm.cache[name];
    }
    jsConfirm.cache[name] = getFn;
    return jsConfirm.cache[name];
};

//------------------------------------------------------------------------------------------
// Check if the modal window it's visible without hit the DOM
//------------------------------------------------------------------------------------------
jsConfirm._visible = function() {
    "use strict";

    if (jsConfirm.window) {
        return true;
    }
    return false;
};

//------------------------------------------------------------------------------------------
// Cache neet to be refreshed when the windows it's resized
//------------------------------------------------------------------------------------------
jsConfirm._resize = function() {
    "use strict";

    if (jsConfirm._visible()) {
        var modalWindow = document.getElementById("jsConfirm");
    
        jsConfirm._recalculate(modalWindow);
        jsConfirm._vCenter(modalWindow);
        jsConfirm._hCenter(modalWindow);
    } else {
        jsConfirm.resized = true; // Avoid recalcule until is strictly necessary
    }
};

//------------------------------------------------------------------------------------------
// Refresh cache size calculations
//------------------------------------------------------------------------------------------
jsConfirm._recalculate = function(d) {
    "use strict";

    jsConfirm._get("_windowHeight", jsConfirm._windowHeight(), true);
    jsConfirm._get("_windowWidth", jsConfirm._windowWidth(), true);
    jsConfirm._get("_modalWidth", jsConfirm._modalWidth(d), true);
};

//------------------------------------------------------------------------------------------
// x-browser prevent default action and cancel bubbling
//------------------------------------------------------------------------------------------
jsConfirm._preventDefault = function (e) {
    "use strict";

    if (typeof e.preventDefault === 'function') {
        e.preventDefault();
        e.stopPropagation();
    } else {
        e.returnValue = false;
        e.cancelBubble = true;
    }
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
jsConfirm._hCenter = function (d) {
    "use strict";
    
    var windowWidth = jsConfirm._get("_windowWidth", jsConfirm._windowWidth());
    var dWidth = jsConfirm._get("_modalWidth", jsConfirm._modalWidth(d));

    d.style.left = ((windowWidth - dWidth) / 2) + "px"; // Place at center
};

//------------------------------------------------------------------------------------------
// Center the modal in y axys
//------------------------------------------------------------------------------------------
jsConfirm._vCenter = function (d) {
    "use strict";
    
    var windowHeight = jsConfirm._get("_windowHeight", jsConfirm._windowHeight());
    var dHeight = jsConfirm._modalHeight(d); // Not cached because change every launch depending of the description

    d.style.top = ((windowHeight - dHeight) / 2) + "px"; // Place at vcenter
};

//------------------------------------------------------------------------------------------
// Move the modal window to his start position
//------------------------------------------------------------------------------------------
jsConfirm._startPosition = function (d, animate) {
    "use strict";
    
    var modalHeight = jsConfirm._modalHeight(d); // Not cached because change every launch depending of the description

    if (!animate) {
        jsConfirm._addClass(d, "notransition");        
    }

    jsConfirm._hCenter(d);
    d.style.top = "-" + modalHeight + "px";

    if (!animate) {
        var forceReflow = d.offsetLeft + d.offsetTop; // Hack to fire DOM changes
        jsConfirm._removeClass(d, "notransition");
    }
};

//------------------------------------------------------------------------------------------
// Show the modal
//------------------------------------------------------------------------------------------
jsConfirm._show = function (d, className) {
    "use strict";

    var background = document.getElementById("jsConfirmBackground"); // DOM object
    jsConfirm._addClass(background, "show");

    var modalWindow = document.getElementById("jsConfirm"); // DOM object

    if (jsConfirm.resized) { // Window size change
        jsConfirm._recalculate(modalWindow);
        jsConfirm._startPosition(modalWindow, false);
        jsConfirm.resized = false;
    }

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
        var dataArrayLength = dataArray.length - 1; // Performance
        for (var i = dataArrayLength; i >= 0; i--) {
            customHTML = customHTML.replace("{#" + dataArray[i] + "#}", "<span>" + d.getAttribute("data-" + dataArray[i]) + "</span>");
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

    jsConfirm.window = className;

    jsConfirm._vCenter(modalWindow);
};

//------------------------------------------------------------------------------------------
// Hide the modal
//------------------------------------------------------------------------------------------
jsConfirm._hide = function () {
    "use strict";

    var modalWindow = document.getElementById("jsConfirm"); // DOM object
    jsConfirm._startPosition(modalWindow, true);

    var background = document.getElementById("jsConfirmBackground"); // DOM object
    jsConfirm._removeClass(background, "show");

    jsConfirm.window = "";
};