<aura:application >

  <ltng:require styles="{!join(',', 
    $Resource.SLDS105 + '/assets/styles/salesforce-lightning-design-system-ltng.css', 
    $Resource.SLDS202 + '/assets/styles/salesforce-lightning-design-system.css'
    )}" />

  <div class="slds">
    <div class="slds-form">

      <c:SPEAR_DatePicker label="Test Date" placeholder="Enter a Date" formatSpecifier="MM/dd/yyyy" />

    </div>
  </div>

</aura:application>