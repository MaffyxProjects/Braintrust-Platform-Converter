//Collects the Braintrust Job ID from Greenhouse and opens the coressponding Braintrust job page. 

if (document.readyState === 'complete') {
      if (window.location.href.indexOf("greenhouse") != -1) {
            var jobTitleWrapper = document.getElementsByClassName('job-title-wrap')
            var jobName = jobTitleWrapper[0].getElementsByClassName('job-name')
            var jobDetails = jobName[0].getElementsByClassName('job-details')
            var jobID = parseInt(jobDetails[0].innerText.match(/[0-9]+/g))
            window.open(`https://app.usebraintrust.com/jobs/${jobID}`, '_blank').focus();    
      }
  }