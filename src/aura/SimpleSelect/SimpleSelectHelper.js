({
    init: function(component, event) {
      this.setSelected(component);
    },

    setSelected: function(component) {

      var value = component.get("v.value");
      var values = component.get("v.options");

      window.setTimeout(
        $A.getCallback(function() {

          if (!component.isValid()){
            return;
          }
          var selectL = component.find('select-element');
          var select = selectL.getElement();

          if (!value || !select || select.options.length == 0) {
            return;
          }

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