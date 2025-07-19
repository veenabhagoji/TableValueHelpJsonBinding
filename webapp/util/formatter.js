sap.ui.define([], function() {
    "use strict";

    return {

        formatStatusState: function(status) {
            if (status === "Active") {
                return "Success";   // Green
            } else if (status === "Inactive") {
                return "Error";     // Red
            } else {
                return "None";      // Default (Grey/Black)
            }
        }
        

    }
});
