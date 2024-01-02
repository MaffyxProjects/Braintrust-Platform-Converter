
//Adds listeners to the popup buttons to run functions and send messages to the background
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('btnGo').addEventListener('click', behaviorSort );
  document.getElementById('btnJob').addEventListener('click', searchJob );
  document.getElementById('btnTalent').addEventListener('click', searchTalent );
})

//Determines which page the person is on either the Braintrust platform or Greenhouse, and opens the corresponding page on the opposite platform.
function behaviorSort(){
  async function getTab() {
    var getting = chrome.windows.getCurrent({
      populate: true
    });

    getting.then(logTabs);
    function logTabs(windowInfo) {
      var tabsCount = windowInfo.tabs.length

      for(i=0;i<tabsCount;i++){
        if(windowInfo.tabs[i].active==true){
         
         var currentURL = windowInfo.tabs[i].url
         if (currentURL.indexOf("https://app.usebraintrust.com/") != -1) {
          if(currentURL.indexOf("talent")!=-1){
            BTGHProfile()
          } 
          if(currentURL.indexOf("jobs")!=-1){
            BTGHJob()
          }
        }
        if (currentURL.indexOf("https://app4.greenhouse.io/") != -1) {
          if(currentURL.indexOf("people")!=-1){
            greenhouseTalent()
          } 
          if(currentURL.indexOf("sdash")!=-1){
            greenhouseJob()
          } 
          if(currentURL.indexOf("plans")!=-1){
            greenhouseJob()
          }
        }
        }
      }
    }
  }
  getTab()
}

//Opens a link with a given Braintrust Job ID, usually copied from Greenhouse.
function searchJob() {
  var jobId=document.getElementById('jobOrTalentID').value
  if (jobId!=''||undefined)
  {
    window.open(`https://app.usebraintrust.com/jobs/${jobId}`, '_blank').focus();
  }
  
}

//Opens a link with a given Braintrust Profile ID, usually copied from Greenhouse.
function searchTalent() {
  var talentId=document.getElementById('jobOrTalentID').value

  if (talentId!=''||undefined)
  {
    window.open(`https://app.usebraintrust.com/talent/${talentId}`, '_blank').focus();
  }
}

//Sends a message to the background to open the Braintrust profile from the Greenhouse page.
function greenhouseTalent() {
  chrome.runtime.sendMessage({directive: "greenhouseTalent"}, function(response) {});
}

//Sends a message to the background to run the Greenhouse Job to Braintrust platform conversion function.
function greenhouseJob() {
    chrome.runtime.sendMessage({directive: "greenhouseJob"}, function(response) {});
}

//Collects the current Braintrust Job ID and saves it to storage, then sends a message to the background to open the corresponding Greenhouse job page.
function BTGHJob() {
  async function getTab() {
    var getting = chrome.windows.getCurrent({
      populate: true
    });

    getting.then(logTabs);
    function logTabs(windowInfo) {
      var tabsCount = windowInfo.tabs.length

      for(i=0;i<tabsCount;i++){
        if(windowInfo.tabs[i].active==true){
         var currentURL = windowInfo.tabs[i].url
         var reqNumber
         var trimmedUrl=currentURL.replace('https://app.usebraintrust.com/jobs/','')
         if(trimmedUrl.indexOf('?')!=-1){
          var splitUrl=trimmedUrl.split('?')
          splitUrl.pop()
          reqNumber=splitUrl[0].replace('/','')
         }else{
          reqNumber = trimmedUrl.replace('/','')
         }
         chrome.storage.local.set({
          reqNumber
         }, function() {});
        }
      }
    }
  }
  getTab()
    chrome.runtime.sendMessage({directive: "braintrustJob"}, function(response) {});
}

//Sends a message to run the save the email address from the Braintrust profile to add to Greenhouse.
function BTGHProfile() {
    chrome.runtime.sendMessage({directive: "btEmailSave"}, function(response) {});
}