({

    getDisplayValue: function(component, event, helper) {

      var params = event.getParam('arguments');
      if (params) {
        var value = params.value;
        var config = params.config;
        var callback = params.callback;
        helper.getDisplayValue(value, config, callback);
      }

    },

    getISOValue: function(component, event, helper) {

      var params = event.getParam('arguments');
      if (params) {
        var date = params.date;
        var config = params.config;
        var callback = params.callback;
        helper.getISOValue(date, config, callback);
      }

    }
  })