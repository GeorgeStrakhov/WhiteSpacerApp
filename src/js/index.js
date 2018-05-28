/**
 * Application entry point
 */
// import 'bulma/css/bulma.css'
// import 'bulma/bulma.sass';
import 'styles/index.scss';
import 'flickity/css/flickity.css';
import 'styles/flickity.scss';
import 'styles/login.scss';


let $ = require('jquery');
let jQueryBridget = require('jquery-bridget');
let Flickity = require('flickity');

let sheets = require('js/sheets');
let utils = require('js/utils');
let ui = require('js/ui');

// make Flickity a jQuery plugin
Flickity.setJQuery( $ );
jQueryBridget( 'flickity', Flickity, $ );

// App setup
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
    googleSheetId: '1YAvN5y4QU9q37-z2KpI88lOFTKwLQd8aACNCnPW7JOs',
    googleSheetApiKey: 'AIzaSyAygoc3sxpd7gAEndLz3l4WEpg1SOFgAyw',
    credentials: {},
    selectedCard: null
}

$( document ).ready(function() {
    console.log('ready');

    ui.showLoader();
    ui.showLogin();

    // Process Login button
    $('#button-login').click(function(e){
        e.preventDefault();
        let username = $('#whitespacer-username').val();
        let password = $('#whitespacer-password').val();
        let credential = appData.credentials[username];
        if ( credential && credential.password == password){
            $('.password-warning').hide();
            $(this).addClass('is-loading');
            loadDataSheet(credential.sheet_id, appData.googleSheetApiKey, cardData);
        } else {
            $('.password-warning').fadeTo(0, 0.0, function() {
                $(this).fadeTo(500, 1.0);
            });
        }
    })

    // Load google spreadsheet data

    let sheetUrl = 'https://sheets.googleapis.com/v4/spreadsheets/' + appData.googleSheetId + '/values/Sheet1?key=' + appData.googleSheetApiKey;

    // load master sheet
    $.ajax({
        url: sheetUrl,
        dataType:"jsonp",
        success: function(results){
            appData.credentials = sheets.parseMaster(results);
            console.log(results);
            console.log(appData.credentials);
            ui.hideLoader();

            // disable login for testing
            // loadDataSheet(appData.credentials.norway.sheet_id, appData.googleSheetApiKey, cardData)
        },
        error: function(xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);
        }
    })

    function loadDataSheet(sheetId, apiKey, cardData){
        let sheetUrl = 'https://sheets.googleapis.com/v4/spreadsheets/' + sheetId + '/values/Sheet1?key=' + apiKey;
        $.ajax({
            url: sheetUrl,
            dataType:"jsonp",
            success:function(results) {
                ui.hideLogin();
                console.log(results);
                cardData = sheets.processResults(results, cardData)
                console.log(cardData);
                initCards(cardData);
                initModal(cardData);
                initNavbar(cardData);
                initCarousel();
            },
            error: function(xhr, status, error) {
                var err = eval("(" + xhr.responseText + ")");
                alert(err.Message);
            }
        });
    }


    // Setup cards
    function initCards(cardData){
        let titles = utils.getRandomTitles(5, cardData);
        // grab 5 categories and create card
        for(let i=0;i<5;i++){
            let title = titles[i];
            let $card = generateCard(title, i);
            $('#content').append($card);
        }
    }

    function initNavbar(cardData){
        $('.trigger-randomize').click(function(){
            utils.randomizeTitles(cardData);
        });
    }

    function initCarousel(){
        // init carousel
        $('.main-carousel').flickity({
            // options
            cellAlign: 'center',
            contain: true,
            dragThreshold: 10,
            pageDots: false
        });
    }

    function initModal(cardData){
        let $target = $('#title-overlay .options-container');

        for(let title of cardData.titles){
            let $title = $('<div class="selection-box"><h2 class="title-selector">' + title + '</h2></div>');
            // let $title = $('<h2 class="title-selector">' + title + '</h2>');


            $title.click(function(){
                let $oldCard = $('.card[data-card-id="' + appData.selectedCard + '"]');
                let $newCard = generateCard($(this).find('.title-selector').html(), appData.selectedCard);
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

    function generateCard(title, cardId){
        let colIndex = cardData.titles.indexOf(title);
        let [bgColor, fgColor] = cardData.colors[colIndex];
        let $card = $('<div class="card"></div>');
        $card.css('background-color', bgColor);
        $card.css('color', fgColor);
        $card.attr('data-card-id', cardId);
        $card.attr('data-col-index', colIndex);

        let $title = $('<h1 class="card-title">' + title + '</h1>');
        $card.append($title);

        let $container = $('<div class="main-carousel"></div>');
        for (title of cardData.items[colIndex]){
            let $slide = $('<div class="carousel-cell"></div>');
            let $item = $('<h2>' + title + '</h2>');
            utils.textResize($item);
            $slide.append($item);
            $container.append($slide);
        }
        $card.append($container);


        $title.click(function(){
            appData.selectedCard = $(this).parent('.card').data('card-id');
            ui.showModal();
        });

        // each card must have all titles loaded as carousel


        return $card;
    }

});
