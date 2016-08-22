({
	handleClick : function(component, event, helper) {
		var click = component.getEvent("dateCellClick");
    console.log('Datecell controller click' + click);
    click.fire();
	}
})