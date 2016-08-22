({
    afterRender: function() {
        return this.superAfterRender();
    },

    rerender: function(component, helper) {
        helper.renderGrid(component);
        this.superRerender();
    }
})// eslint-disable-line semi