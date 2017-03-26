({
  init: function(component, event) {
    this.setSelected(component);
  },

  setSelected: function(component) {

    var value = component.get("v.value");
    var values = component.get("v.options");
    var selectL = component.find('select-element');
    var select = selectL.getElement();

    if (!value || !select || select.options.length == 0) {
      return;
    }

    //need to wait for the select to finish rendering before setting selected.
    //putting this code in `afterRender` doesn't work as the rerender can't be 
    //triggered easily. This kind of sucks, I know.
    window.setTimeout(
      $A.getCallback(function() {
        for (var i = 0; i < select.options.length; i++) {
          if (select.options[i].value == value) {
            select.options[i].selected = true;
            return;
          }
        }
      }), 200
    );
  }
})
