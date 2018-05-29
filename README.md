# WhiteSpacer

## Workflow
This app uses the Webpack 4 build tool.

### Installation
`npm install --save-dev`

### Development
Run a development server with live reload
`npm run dev`

### Build
Creates index.html and javascript in root directory
`npm run build`

## Deployment
Push to master to deploy (gh-pages)

## Data sheets
System requires a Google Sheets API key - hardcoded in /src/js/index.js

**All sheets must be public viewable** - set by clicking share and 'anyone with the link can view' - old style publishing is not required.

#### Master Sheet
There is one hardcoded sheet that contains the username, passwords, and workshop sheet id:
https://docs.google.com/spreadsheets/d/1YAvN5y4QU9q37-z2KpI88lOFTKwLQd8aACNCnPW7JOs/edit#gid=0

This is currently editable by G.S. If changed, /src/js/index.js file will need to be updated with the new sheet id.

#### Data Sheet Sample
https://docs.google.com/spreadsheets/d/1hTI-U494zBBubcBcSCw66cnHz81p0zz__DfQ0oOsaDk/edit#gid=0

* Minimum of 5 columns
* First row contains titles

Other than the above, there are no other restrictions. Add multiple columns and title will be dynamically read.
