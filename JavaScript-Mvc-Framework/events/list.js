; $.app = $.app || {};
; $.app.events = $.app.events || {};
/**
 * Use "data-event-binding" attribute with js controller to execute specific events or write using csv or use * for finding all events if exist.
 */
; $.app.events.list = {
    click: function ($controller) {
        var name = "click",
            attr = "data-" + name,
            $page = $controller.$pageElement,
            $elements = $page.find("[" + attr + "]");
        if ($elements.length > 0) {
            $elements.click(function (e) {
                var $this = $(this),
                    name = $this.attr(attr),
                    executingEvent = $controller.bindEvents[name];
                if ($.executeFunctionWithArguments(executingEvent, [e, $this, name]) === false) {
                    console.log($controller);
                    throw new Error("Controller doesn't have [" + name + "()] method in the bindEvents. Please add that.");
                }
            });
        }
    }
}