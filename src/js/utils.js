let $ = require('jquery');
let ui = require('js/ui');
let config = require('js/config');
let utils = {

    //display an error
    displayError(message, shouldReload = true) {
      if(config.isTesting) {
        console.log('error occured!');
        console.log(message);
        return;
      }

      alert(message);
      if(shouldReload) {
        window.location.reload();
      }
    },

    //extracts sheet id from the full spreadsheets link
    sheetIdFromLink(url) {
      let sheetId = '0';
      try {
        sheetId = new RegExp("/spreadsheets/d/([a-zA-Z0-9-_]+)").exec(url)[1];
      } catch (err) {
        utils.displayError('Sorry, something wrong with the data sheet URL');
      }
      return sheetId;
    },

    // returns a random element given array. if second paramater is passed, will filter
    randomElement(options, blackList=[]){
        let result = options[Math.floor(Math.random() * options.length)];
        let exists = false;

        if (blackList.indexOf(result) != -1) {
            exists = true;
        }

        if (blackList.length >= options.length){
            result = null;
        } else if (exists) {
            return this.randomElement(options, blackList);
        }
        return result;
    },

    // return an array of x titles
    getRandomTitles(num, cardData){
        let results = [];
        for (let i = 0; i < num; i++){
            results.push(this.randomElement(cardData.titles, results));
        }
        return results;
    },

    // Resize text based on number of characters. Needs to be complemented with media queries
    textResize($target){
        let content = $target.html();
        $target.removeClass('small-title');
        $target.removeClass('large-title');

        if (content.length < 16){
            $target.addClass('large-title');
        }
        if (content.length > 40){
            $target.addClass('small-title');
        }
    },

    // Randomizes all currently display bands
    randomizeTitles(cardData){
        $('.ws-card').each(function(){
            let $carousel = $(this).find('.main-carousel');
            let $title = $(this).find('h2');
            let colIndex = $(this).data('col-index');
            let newTitle = utils.randomElement(cardData.items[colIndex]);
            if (newTitle) {
                let titleIndex = cardData.items[colIndex].indexOf(newTitle);
                $carousel.flickity('select', titleIndex);
            }
        })

    },

    generateCard(appData, cardData, title, cardId){
        let colIndex = cardData.titles.indexOf(title);
        let [bgColor, fgColor] = cardData.colors[colIndex];
        let $card = $('<div class="ws-card"></div>');
        $card.css('background-color', bgColor);
        $card.css('color', fgColor);
        $card.attr('data-card-id', cardId);
        $card.attr('data-col-index', colIndex);

        let $title = $('<h1 class="card-title">' + title + '</h1>');
        $card.append($title);

        let $container = $('<div class="main-carousel"></div>');
        for (let i=0; i < cardData.items[colIndex].length; i++){
            let title = cardData.items[colIndex][i];
            let $slide = $('<div class="carousel-cell"></div>');
            let $item = $('<h2>' + title + '</h2>');
            utils.textResize($item);
            $slide.append($item);
            $container.append($slide);
        }
        $card.append($container);


        $title.click(function(){
            appData.selectedCard = $(this).parent('.ws-card').data('card-id');
            ui.showModal();
        });

        // each card must have all titles loaded as carousel
        return $card;
    }
}

module.exports = utils
