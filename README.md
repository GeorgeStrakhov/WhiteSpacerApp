# WhiteSpacer

## Workflow
This app uses the Webpack 4 build tool.

### Installation
`npm install --save-dev`

### Development
Run a development server with live reload
`npm run dev`
Open browser at http://localhost:8080

### Build
Creates index.html and javascript in root directory
`npm run build`

## Deployment
Push to master to deploy

## Data sheets
System requires a Google Sheets API key - hardcoded in /src/js/index.js

**All sheets must be public viewable** - set by clicking share and 'anyone with the link can view' - old style publishing is not required.

#### Master Sheet
There is one hardcoded sheet that contains the username, passwords, and workshop sheet id:
https://docs.google.com/spreadsheets/d/1mul_4AtldUV6AzDLfQGwvT7mCbeeABwciqCAxKBwwOk/edit?usp=sharing
To change the master sheet - edit /src/js/config.js

New data sets can be added by filling in this form:
https://docs.google.com/forms/d/e/1FAIpQLSfTj9yQQz9iJmwLbp8dcNc9X_9heZ7Yhg_jUqSAQPfAA8uHfQ/viewform

#### Data Sheet Sample
https://docs.google.com/spreadsheets/d/1hTI-U494zBBubcBcSCw66cnHz81p0zz__DfQ0oOsaDk/edit#gid=0

* Minimum of 5 columns
* First row contains titles

Other than the above, there are no other restrictions. Titles will be read dynamically from the sheet.
