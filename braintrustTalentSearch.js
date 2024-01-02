// Function to check the Braintrust platform for a specific profile ID and open the page.

if (document.readyState === 'complete') {
    if (window.location.href.indexOf("people") != -1) {
        var currentUrl=window.location.href
    if(currentUrl.indexOf('#candidate_details')==-1){
        var detailsUrl = currentUrl+"#candidate_details"
        window.location = detailsUrl
    }
    let stateCheck = setInterval(() => {
        if (document.readyState === 'complete') {
        clearInterval(stateCheck);
        setTimeout(() => getProfileLink(), 1000);
        }
    }, 100);
    //Opens the profile link from the Greenhouse Page
    function getProfileLink(){
        var addDetailsBox = document.getElementsByClassName('content-box content-box-alt')[1]
        var piiBlurBox = addDetailsBox.getElementsByClassName('content pii-blur')
        var controlRows = piiBlurBox[0].getElementsByClassName('control-row')
        var controlRowsLength=controlRows.length
    
        var profileLink
        for(i=0;i<controlRowsLength;i++){
            var rowText = controlRows[i].getElementsByTagName('label')[0].innerText
            if(rowText.indexOf('Braintrust Profile')!=-1){
                profileLink=controlRows[i].getElementsByClassName('collapsed-field-text')[0].innerText
                if(profileLink.indexOf('--')!=-1){
                    alert('We dont have a Braintrust Profile')
                }else{
                    let stateCheck = setInterval(() => {
                        if (document.readyState === 'complete') {
                        clearInterval(stateCheck);
                        window.open(profileLink, '_blank').focus();
                        }
                    }, 100);
                }
                break;
            }
        }
    }
}else{
    alert('Please navigate to a Greenhouse candidate page!')
}
  }