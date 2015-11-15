//------------------------------------------------------------------------------------------
// The app
//------------------------------------------------------------------------------------------
var jsConfirmDemo = {};

jsConfirmDemo.confirmCallback = function(data) {
    "use strict";

    console.log(data);
};

jsConfirmDemo.confirmCallbackTwo = function(target) {
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
