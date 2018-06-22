({
    clearValue: function (component) {
        component.set("v.value", "");
    },

    doInit: function (component, event, helper) {
        helper.init(component);
    },

    handleDateChange: function (component, event, helper) {
        helper.doUpdate(component, event);
    },

    handleFocus : function (component,event, helper){
        var onFocusEvent = component.getEvent("onFocus");
        onFocusEvent.fire();
    }

})