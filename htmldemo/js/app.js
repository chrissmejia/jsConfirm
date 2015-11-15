//------------------------------------------------------------------------------------------
// The app
//------------------------------------------------------------------------------------------
var jsConfirmDemo = {};

jsConfirmDemo.confirmCallback = function(data) {
    "use strict";

    console.log("File deleted");
};

//------------------------------------------------------------------------------------------
// Init jsConfirm
//------------------------------------------------------------------------------------------

jsConfirm.init('delete', {
    callback: jsConfirmDemo.confirmCallback,
    text: "Are you sure you want to delete {/name/}?",
    data: ["name"]
});