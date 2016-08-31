# DatePicker
Salesforce Lightning is fast becoming a great tool for building Modular, extensible and modern UIs on the Salesforce platform.
There are a lot of pre-built UI controls that you can use to create an interface, but there are a couple of vital missing pieces.
The first of these is the Lookup component.
The second is a good, Lightning styled Datepicker component. There is an existing component, but it it not lightning styled and it does not work very well.

# Sources
To build this component, I used several sources - however, as the result is kind of a mashup, I haven't included an licence information, as the code is all mixed up together. 
I used some of the structure of the existing Aura lightning component <a href="https://github.com/forcedotcom/aura/tree/master/aura-components/src/main/components/ui/datePicker" target="_blank">here</a>.
I also used some data structures and ideas from <a href="https://github.com/joshsalverda/datepickr" target="_blank">here</a>.
Finally I was forced to use moment.js despite trying not to have any external dependencies, but due to a bug in the Lightning framework - (the $A.localizationService.parseDateTime() method seems to be blocked by the Locker Service), I was forced to use it for string to date conversions. 
Get moment <a href="http://momentjs.com/downloads/moment.js" target="_blank">here</a>.

**Here's how to implement it:**

Assuming you are using an Opportunity (obviously any object with a date would work), define the Opportunity as an attribute on your component:


    <aura:attribute name="opportunity" type="Opportunity" 
                    default="{ 'sobjectType': 'Opportunity',
                               'Name': 'New Opportunity',
                               'StageName': 'Some Stage' />

In your component, you need to handle the `dateChangeEvent` from the component:
   
    <aura:handler name="dateChangeEvent" event="c:DateChange" action="{!c.handleDateChange}" />


In your form, put the below(once you have created it) as a top level member of the form:

    <div class="slds-form-element slds-m-top--medium">
      <c:DatePicker aura:id="closeDate" label="Close Date" placeholder="Enter a Date" value="{!v.opportunity.CloseDate}" formatSpecifier="MM/dd/yyyy" />
    </div>

Finally, in your controller or helper update your date:

    handleDateChange: function(cmp, event, helper) {
      var dateSelector = event.getSource().getLocalId();
      if (dateSelector == 'closeDate'){
        var opp = cmp.get("v.opportunity");
        opp.CloseDate = event.getParam("value");
      }
    }
    
**How to use in a VF page - (once the component is built):**

You will want a structure like this:

    VF Page (instantiate and add callback)
           DatepickerWrapper (handle date change events, call callback)
                             Datepicker (perform date display and selection)



In your `DatepickerWrapper` component, handle the `dateChangeEvent` from the `Datepicker` and add a callback attribute (for lightning out):
   
    <aura:handler name="dateChangeEvent" event="c:DateChange" action="{!c.handleDateChange}" />
    <aura:attribute name="callback" type="String" description="Call this to communicate results to visualforce page" access="global"/>


Place the `Datepicker` in the `DatepickerWrapper` component like this (assuming you are using slds) (you may want to do all form element stuff in the parent vf page - up to you):

    <div class="slds-form-element slds-m-top--medium">
      <c:DatePicker aura:id="closeDate" label="Close Date" placeholder="Enter a Date" value="{!v.opportunity.CloseDate}" formatSpecifier="MM/dd/yyyy" />
    </div>

Finally, in your `DatepickerWrapper` controller or helper update your date by calling the callback on the vf page:

    handleDateChange: function(cmp, event, helper) {
        var func = cmp.get('v.callback');
        if (func){
          func({fieldName:"CloseDate",value:event.getParam("value")});
        }
    }



This is what it looks like:

[![Datepicker gif][3]][3]

Let me know if you find any bugs.


  [1]: http://www.soliantconsulting.com/blog/2016/08/build-lightning-date-picker
  [2]: https://github.com/rapsacnz/DatePicker
  [3]: http://i.stack.imgur.com/7roHD.gif

