({
	getRandomOpp: function(component) {
    
    var action = component.get("c.getOpportunity");

    action.setCallback(this, function(response) {
      var state = response.getState();
      if (component.isValid() && state === "SUCCESS") {
        component.set("v.opportunity", response.getReturnValue());
      }
    });
    $A.enqueueAction(action);
  },

  handleDateChange: function(component, event, helper) {
    var opp = component.get("v.opportunity");
    opp.CloseDate = event.getParam("value");
    console.log('close date: ' + opp.CloseDate);
    var callback = component.get("v.callback");
    if (callback){
      callback(opp.CloseDate);
    }
  },

  handleSubmit: function (component, event, helper){
    event.preventDefault();
    return false;
  }
})
