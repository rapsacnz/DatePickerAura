({
  doInit: function(component, event, helper) {


    for (var i = 0; i < 41; i++) {
      var cellCmp = component.find(i);
      if (cellCmp) {
        cellCmp.addHandler("dateCellClick", component, "c.handleClick");
      }
    }

    var format = component.get("v.formatSpecifier");
    var datestr = component.get("v.value");
    var langLocale = $A.get("$Locale.langLocale");
    var timezone = $A.get("$Locale.timezone");

    
    var currentDate = helper.parseInputDate(component,datestr);
    helper.setDateValues(component, currentDate, currentDate.getDate());

    // Set the first day of week
    helper.updateNameOfWeekDays(component);
    helper.generateYearOptions(component, currentDate);

    var setFocus = component.get("v.setFocus");
    if (!setFocus) {
      component.set("v._setFocus", false);
    }
    helper.renderGrid(component);
  },

  handleInputFocus: function(component, event) {
    var grid = component.find("grid");
    if (grid) {
      $A.util.removeClass(grid, 'slds-hide');
      $A.util.removeClass(grid, 'slds-transition-hide');
    }

  },

  handleManualDateChange: function(component, event, helper) {
    helper.handleManualDateChange(component);
  },

  handleYearChange: function(component, event, helper) {

    var newYear = event.getParam("data");
    var date = component.get("v.date");
    helper.changeYear(component, newYear, date);
  },

  handleClick: function(component, event, helper) {
    console.log('Date picker controller click' + event);
    helper.selectDate(component, event);

    var grid = component.find('grid');
    if (grid) {
      $A.util.addClass(grid, "slds-hide");
    }
  },

  goToToday: function(component, event, helper) {
    event.stopPropagation();
    helper.goToToday(component, event);
    return false;
  },

  goToPreviousMonth: function(component, event, helper) {
    event.stopPropagation();
    helper.changeMonth(component, -1);
    return false;
  },

  goToNextMonth: function(component, event, helper) {
    event.stopPropagation();
    helper.changeMonth(component, 1);
    return false;
  },

  onMouseLeaveInput: function(component, event, helper) {
    component.set("v._gridOver", false);
    window.setTimeout(
      $A.getCallback(function() {
        if (component.isValid()) {
          //if dropdown over, user has hovered over the dropdown, so don't close.
          if (component.get("v._gridOver")) {
            return;
          }
          var grid = component.find("grid");
          $A.util.addClass(grid, 'slds-hide');
        }
      }), 200
    );
  },
  onMouseLeaveGrid: function(component, event, helper) {
    component.set("v._gridOver", false);
    var grid = component.find("grid");
    $A.util.addClass(grid, 'slds-hide');

  },
  onMouseEnterGrid: function(component, event, helper) {
    component.set("v._gridOver", true);
  }

});
