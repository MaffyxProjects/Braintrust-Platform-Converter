//Calls a script to collect the Braintrust Job ID from Greenhouse and opens the coressponding Braintrust job page. 
function greenhouseJob() {
  async function injectScript() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['braintrustJobSearch.js']
    });
}
  injectScript()  
}

//Calls a script to search the Braintrust platform from a Greenhouse ATS Profile.
function greenhouseTalent() {
  async function injectScript() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['braintrustTalentSearch.js']
    });
}
  injectScript()
}

//Calls a script to save the email address from the Braintrust profile page.
function btEmailSave() {
  async function injectScript() {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['btEmailSave.js']
    });
}
  injectScript()
}

//Calls a script that will search Greenhouse for the job listed on the Braintrust platform and open it if it exists.
function braintrustJobtoGH(){
  var reqNumber=[]
  chrome.storage.local.get({
    reqNumber : []
    }, function(reqNumber) {
      reqNumber = reqNumber.reqNumber;
      if (reqNumber != undefined) {
        getURL(reqNumber)
      }
    });

  function getURL(incomingNumber){
    var incomingNumber
    const url = 'https://boards-api.greenhouse.io/v1/boards/braintrust/jobs';
    fetch(url, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => listJobs(data))
      .catch(error => console.error('Error:', error));
        function listJobs(jobs){
          var jobsListLength = jobs.meta.total
          for(i=0;i<jobsListLength;i++){
            var reqID = jobs.jobs[i].requisition_id
            var jobLink = 'https://app4.greenhouse.io/sdash/'+jobs.jobs[i].internal_job_id
            if(reqID==incomingNumber){
              chrome.tabs.create({'url': jobLink}, function(tab) {});
              break;
            }
          }
        }
  }
}

//Searches Greenhouse for the email address that was listed on Braintrust.
function braintrustProfiletoGH(){
   chrome.storage.local.get({
    candidateEmail : []
     }, function(candidateEmail) {
      candidateEmail = candidateEmail.candidateEmail;
       if (candidateEmail != undefined) {
         callGreenhouse(candidateEmail)
       }
     });
  
  function callGreenhouse(candidateEmail){
    var candidateEmail
    const baseURL = 'https://harvest.greenhouse.io/v1/candidates/';
    //This function requires a Greenhouse Harvest API Token.
    const apiToken = 'Insert Greenhouse Harvest API Token Here';
    let email = candidateEmail
    const queryParams = new URLSearchParams({
      email: email
    });
    const apiURL = baseURL + '?' + queryParams.toString()
    fetch(apiURL, {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + btoa(apiToken + ':')
      }
    })
      .then(response => response.json())
      .then(data => parseCandidate(data))
      .catch(error => console.error('Error:', error));
  }
  function parseCandidate(candidate){
    var candidate
    var candidateLink = 'https://app4.greenhouse.io/people/'+candidate[0].id
      if(candidateLink!=undefined){
        chrome.tabs.create({'url': candidateLink}, function(tab) {});
      }
  }
}

//Listener for chrome messages from the other scripts to run functions.
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {

    switch (request.directive) {
      case "greenhouseJob":
        greenhouseJob()
        sendResponse({});//Sends an empty response to prevent an error message
        break;  
        
        case "greenhouseTalent":
        greenhouseTalent()
        sendResponse({});//Sends an empty response to prevent an error message
        break;
        
        case "braintrustJob":
          braintrustJobtoGH() 
          sendResponse({});//Sends an empty response to prevent an error message
        break;
        
        case "braintrustProfile":
          braintrustProfiletoGH() 
          sendResponse({});//Sends an empty response to prevent an error message
        break; 
        
        case "btEmailSave":
          btEmailSave()
          sendResponse({});//Sends an empty response to prevent an error message
        break;

      default:
    }
  }
);