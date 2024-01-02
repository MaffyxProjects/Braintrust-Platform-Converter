# Braintrust-Platform-Converter
Allows Quick Converting between Greenhouse and the Braintrust Platform for Talent and Jobs.

Chrome Extension for Braintrust-Greenhouse Integration
This Chrome extension facilitates the integration between the Braintrust platform and the Greenhouse ATS (Applicant Tracking System). It provides functionalities to streamline the process of accessing relevant information on both platforms. The extension includes scripts to perform specific actions, such as searching for Braintrust jobs on Greenhouse, saving email addresses from Braintrust profiles, and more.

Features
1. Greenhouse Job Search
  * Calls a script to collect the Braintrust Job ID from Greenhouse and opens the corresponding Braintrust job page.
2. Greenhouse Talent Search
  * Calls a script to search the Braintrust platform from a Greenhouse ATS Profile.
3. Save Braintrust Email
  * Calls a script to save the email address from the Braintrust profile page.
4. Search Greenhouse for Braintrust Job
  * Calls a script that will search Greenhouse for the job listed on the Braintrust platform and open it if it exists.
5. Search Greenhouse for Braintrust Email
  * Searches Greenhouse for the email address that was listed on Braintrust.

**Usage**
Click on the brain button to alternate between either the Braintrust Job or Profile, and the corresponding Greenhouse page.

**Important Note**
To use the braintrustProfiletoGH() function, make sure to insert your **Greenhouse Harvest API Token** in the designated placeholder.
