$.app.initializeMethods = {
    /**
     * runs all the methods after initialize method.
     */
    initialize: function () {
        var self = $.app.initializeMethods;

        var keys = Object.keys(self);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (key !== "initialize") {
                // execute all other than "initialize" method
                var functionsOrMethods = self[key];
                $.executeFunction(functionsOrMethods);
            }
        }
    }
}