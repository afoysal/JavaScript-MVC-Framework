/// <reference path="../jQueryExtend.js" />
/// <reference path="controllers.js" />
//; $.app.controllers = $.app.controllers || {};
$.app.controllers.initialize = function (controllerName) {
    /// <summary>
    /// Run all modules inside controllers.
    /// </summary>
    var app = $.app,
        controllersList = app.controllers,
        runAll = true,
        keys = [], 
        key,
        pageId,
        i,
        controllers = app.controllers,
        currentController,
        bindingEventsNames,
        binding = app.events.binding;
    if ($.isEmpty(controllerName)) {
        keys = Object.keys(controllersList);
    } else {
        keys = controllerName.split(",");
    }

    for (i = 0; i < keys.length; i++) {
        key = keys[i];
        currentController = controllersList[key];
        pageId = currentController["pageId"];
        if (!$.isEmpty(pageId)) {
            if (controllers.isCurrentPage(currentController)) {
                if (controllers.execute(currentController, runAll)) {
                    bindingEventsNames = controllers.getPageBindings(currentController);
                    if (bindingEventsNames === "*") {
                        // binds all bindings
                        binding.executeAll(currentController);
                    } else if (bindingEventsNames !== "") {
                        // binds specific events using csv
                        binding.execute(currentController, bindingEventsNames);
                    }
                    $.executeFunction(currentController["initialize"]);
                }
            }
        }
    }
}