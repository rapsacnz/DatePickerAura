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

    //addition caspar 2016-12-14
    component.set("v.date", currentDate.getDate());
    if ( !$A.util.isEmpty(datestr)){
      $A.util.removeClass(component.find('clear-button'), 'slds-hide');
    }
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

  handleManualInput: function(component, event, helper) {
    helper.handleManualInput(component,event);
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
    //show the clear button
    if ( !$A.util.isEmpty(component.get("v.value"))){
      $A.util.removeClass(component.find('clear-button'), 'slds-hide');
    }
  },

  
  handleClearDate: function(component, event, helper) {
    
    helper.clearDate(component);
    $A.util.addClass(component.find('clear-button'), 'slds-hide');
    //event.stopPropagation();
    event.preventDefault();
    return false;
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
