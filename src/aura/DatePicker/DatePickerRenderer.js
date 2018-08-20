({
  afterRender: function(component, helper) {

    

    return this.superAfterRender();

  },

  rerender: function(component, helper) {

    //this is to determine the date input's relative location - we need to set the picker to the same location
    var formElement = component.find("dateInputFormElement").getElement();
    var input = component.find("dateInputControl").getElement();
    var grid = component.find("grid").getElement();
    var formElementOffset = formElement.getBoundingClientRect();
    var inputOffset = input.getBoundingClientRect();

    var left = inputOffset.left - formElementOffset.left;
    grid.setAttribute("style", "left:" + left + "px;");


    helper.renderGrid(component);
    this.superRerender();
  },


}) // eslint-disable-line semi