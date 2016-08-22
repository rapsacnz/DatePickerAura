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

Here's what it looks like: 
http://g.recordit.co/ZF2s3VDhGP.gif
