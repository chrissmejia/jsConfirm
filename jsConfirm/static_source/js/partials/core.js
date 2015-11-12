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
var jsConfirm = {
    name : 'jsConfirm',
    version : '0.0.1',
};

jsConfirm.init = function (className, callback) {
    "use strict";

    document.body.onclick = function(e) {
        e =e || window.event;
        var target = e.target || e.srcElement;

        // Hear only for a elements
        if (target.nodeName !== 'A') {
            return;
        }
        
        // Hear only for the set it className
        var re = new RegExp("(?:^| )" + className + "(?:$| )", 'g');
        if (!target.className.match(re)) {
            return;
        }

        callback(target);
        jsConfirm._show();
    };
};

jsConfirm._removeClass = function (d, className) {
    "use strict";

    className = " " + className; //must keep a space before class name
    d.className = d.className.replace(className,""); // first remove the class name if that already exists
};

jsConfirm._addClass = function (d, className) {
    "use strict";
    
    jsConfirm._removeClass(d, className); // first remove the class name if that already exists
    d.className = d.className + " " + className; // adding new class name
};

jsConfirm._vCenter = function (d) {
    var windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0); // Window inner height
    var dHeight = parseInt(window.getComputedStyle(d).height, 10);
    d.style.top = ((windowHeight - dHeight) / 2) + "px"; // Place at vcenter
};

jsConfirm._show = function () {
    "use strict";

    var background = document.getElementById("jsConfirmBackground"); // DOM object
    jsConfirm._addClass(background, "show");

    var modalWindow = document.getElementById("jsConfirm"); // DOM object
    jsConfirm._vCenter(modalWindow);
};

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
