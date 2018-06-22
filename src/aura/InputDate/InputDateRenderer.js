({
  afterRender: function(component, helper) {
    helper.displayValue(component);
    return this.superAfterRender();
  },

  rerender: function(component, helper) {
    helper.displayValue(component);
    return this.superRerender();
  }
})