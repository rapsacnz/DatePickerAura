public without sharing class TestDatepicker {
	
  @AuraEnabled
  public static Opportunity getOpportunity(){
    Opportunity[] opps = [SELECT Id, Name, CloseDate FROM Opportunity];
    return opps[0];
  }
}
