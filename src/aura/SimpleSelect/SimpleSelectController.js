({
    init : function(component, event, helper) {
      helper.init(component, event);
    },
    handleSelectChange: function(component, event, helper) {
      var target = event.currentTarget;
      var compEvent = component.getEvent("selectChange");
      compEvent.setParams({ "data": target.value });
      compEvent.fire();
      console.log("select changed: " + target.value)
    }
  })