/**
 * Application entry point
 */
import 'flickity/css/flickity.css';
import 'styles/index.scss';
let config = require('./config');


let $ = require('jquery');
let jQueryBridget = require('jquery-bridget');
let Flickity = require('flickity');

// make Flickity a jQuery plugin
Flickity.setJQuery( $ );
jQueryBridget( 'flickity', Flickity, $ );

// pull in components
let sheets = require('js/sheets');
let utils = require('js/utils');
let ui = require('js/ui');
let init = require('js/init');

// App setup - state globals
let cardData = {
    titles: [],
    items: [],
    colors: [
        ["#D94FED", "#FFFFFF"],
        ['#4775FF', '#FFFFFF'],
        ['#54BAD8', '#FFFFFF'],
        ['#FF382B', '#FFFFFF'],
        ['#84B833', '#FFFFFF'],
        ['#F9A007', '#FFFFFF'],
        ['#A70BD9', '#FFFFFF'],
        ['#F37720', '#FFFFFF'],
        ['#188C4A', '#FFFFFF'],
        ['#550DD0', '#FFFFFF'],
        ['#FF08F6', '#FFFFFF'],
        ['#FFD600', '#FFFFFF']
    ]
};

let appData = {
    googleSheetId: config.googleSheetId,
    googleSheetApiKey: config.googleSheetApiKey,
    credentials: {},
    selectedCard: null
}

let masterSheetUrl = 'https://sheets.googleapis.com/v4/spreadsheets/' + appData.googleSheetId + '/values/Sheet1?key=' + appData.googleSheetApiKey;

// Main
$( document ).ready(function() {

    ui.showLoader();
    ui.showLogin();

    //modals
    init.loginModal(appData, cardData);
    init.infoModal();

    //load master sheet and remove loading icon from submit button when ready
    init.masterSheet(masterSheetUrl, appData, cardData);

});
