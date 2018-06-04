let $ = require('jquery');
let sheets = require('js/sheets');
let utils = require('js/utils');
let ui = require('js/ui');
let config = require('js/config');

let init = {

    loginModal(appData, cardData) {
        // Process Login button
        $('#button-login').click(function(e){
            e.preventDefault();
            let login = $('#whitespacer-login').val();
            login = login.toLowerCase();
            let password = $('#whitespacer-password').val();
            let credential = appData.credentials[login];
            if ( credential && credential.password.toLowerCase() == password.toLowerCase()){
                $('.password-warning').hide();
                $(this).addClass('is-loading');
                init.dataSheet(credential, appData.googleSheetApiKey, appData, cardData);
            } else {
                $('.password-warning').fadeTo(0, 0.0, function() {
                    $(this).fadeTo(500, 1.0);
                });
            }
        })
    },

    masterSheet(sheetUrl, appData, cardData){
        // load master sheet
        $.ajax({
            url: sheetUrl,
            dataType:"jsonp",
            success: function(results){
                appData.credentials = sheets.parseMaster(results);
                ui.hideLoader();
                $('#preload').hide();

                //TESTING MODE SWITCH
                if(config.isTesting) { //bypass login screen for testing
                  console.log('NB! we are in testing mode!');
                  console.log(appData.credentials);
                  init.dataSheet(config.testCredentials, appData.googleSheetApiKey, appData, cardData);
                }

            },
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            }
        });
    },

    dataSheet(credential, apiKey, appData, cardData){
        if(!credential) {
          utils.displayError('Sorry, something is wrong with this data set.');
        }
        let sheetId = utils.sheetIdFromLink(credential.spreadsheet_link);
        if(!sheetId) {
          utils.displayError('Sorry, something is wrong with this data set.');
        }

        let sheetUrl = 'https://sheets.googleapis.com/v4/spreadsheets/' + sheetId + '/values/Sheet1?key=' + apiKey;
        $.ajax({
            url: sheetUrl,
            dataType:"jsonp",
            success:function(results) {
                ui.hideLogin();
                cardData = sheets.processResults(results, cardData)
                //console.log(results);
                //console.log(cardData);

                // After we have the data, setup the main views of the app
                init.cards(appData, cardData);
                init.categoryModal(appData, cardData);
                init.navbar(cardData);
                init.carousel();
            },
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            }
        });
    },

    infoModal(){
        // link navbar info icon
        $('.icon-info').click(function(){
            ui.showInfo();
        });

        $('#info .modal-close').click(ui.hideInfo);
        $('#info .modal-background').click(ui.hideInfo);
    },

    // Setup cards
    cards(appData, cardData){
        let titles = utils.getRandomTitles(5, cardData);
        // grab 5 categories and create card
        for(let i=0;i<5;i++){
            let title = titles[i];
            let $card = utils.generateCard(appData, cardData, title, i);
            $('#content').append($card);
        }
    },

    navbar(cardData){
        $('.trigger-randomize').click(function(){
            utils.randomizeTitles(cardData);
        });
    },

    carousel(){
        // init carousel
        $('.main-carousel').flickity({
            // options
            cellAlign: 'center',
            contain: true,
            dragThreshold: 10,
            pageDots: false
        });
    },

    categoryModal(appData, cardData){
        let $target = $('#title-overlay .options-container');

        for(let i = 0; i < cardData.titles.length; i++){
            let title = cardData.titles[i];
            let $title = $('<div class="selection-box"><h2 class="title-selector">' + title + '</h2></div>');

            $title.click(function(){
                let $oldCard = $('.ws-card[data-card-id="' + appData.selectedCard + '"]');
                let $newCard = utils.generateCard(appData, cardData, $(this).find('.title-selector').html(), appData.selectedCard);
                $oldCard.find('.main-carousel').flickity('destroy');
                $oldCard.replaceWith($newCard);
                $newCard.find('.main-carousel').flickity({
                    // options
                    cellAlign: 'center',
                    contain: true,
                    dragThreshold: 10,
                    pageDots: false
                });
                ui.hideModal();
                $newCard.fadeTo(0, 0.0, function() {
                    $(this).fadeTo(500, 1.0);
                });
            });

            $target.append($title);
        }

        $('#title-overlay .close-icon').click(function(){
            ui.hideModal();
        })
        ui.hideModal();

    }

}

module.exports = init
