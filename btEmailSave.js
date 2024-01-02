//Function to copy candidates email from the Braintrust profile page.

if (document.readyState === 'complete') {
    var candidateEmail
    var nodeRootBox = document.getElementsByClassName('MuiBox-root css-h8m1q6')
    var emailBox = nodeRootBox[0].getElementsByClassName('MuiTypography-root typography--medium typography-variant--paragraph MuiTypography-body1 css-z72y1j')
    candidateEmail=emailBox[1].innerText
    
    chrome.storage.local.set({
     candidateEmail
    }, function() {}); 

     chrome.runtime.sendMessage({directive: "braintrustProfile"}, function(response) {});
  }