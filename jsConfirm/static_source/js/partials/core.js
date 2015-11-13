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
};


//------------------------------------------------------------------------------------------
// Setup the window
//------------------------------------------------------------------------------------------
jsConfirm.init = function (className, callback) {
    "use strict";

    // Moving to start position
    var modalWindow = document.getElementById("jsConfirm"); // DOM object
    jsConfirm._startPosition(modalWindow);

    // Events
    document.body.onclick = function(e) {
        e =e || window.event;
        var target = e.target || e.srcElement;

        // Listen to close modal
        if (jsConfirm._hasClass(target, "jsConfirmClose")) {
            jsConfirm._hide();
        }
        
        // Listen only a elements
        if (target.nodeName !== 'A') {
            return;
        }
        
        // Listen only for the set it className
        if (jsConfirm._hasClass(target, className)) {
            callback(target);
            jsConfirm._show();
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
jsConfirm._show = function () {
    "use strict";

    var background = document.getElementById("jsConfirmBackground"); // DOM object
    jsConfirm._addClass(background, "show");

    var modalWindow = document.getElementById("jsConfirm"); // DOM object
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

    console.log('loaded');
    jsConfirm.init('delete', jsConfirmDemo.confirmCallback);
});

var jsConfirmDemo = {};

jsConfirmDemo.confirmCallback = function(target) {
    "use strict";

    console.log(target);    
};
