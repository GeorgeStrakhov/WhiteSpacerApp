let $ = require('jquery');
let utils = {

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

    isImageUrl(urlString){
        let regex1 = RegExp(/(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i);
        return regex1.test(urlString);
    },

    randomItem($parent, cardData){
        let colIndex = $parent.data('col-index');
        let blackList = [];
        $parent.find('h2').each( function(){
            blackList.push($(this).html());
        });
        return this.randomElement(cardData.items[colIndex], blackList);
    },

    alreadyExists($card, item, cardData){
        let itemArray = [];
        $card.find('h2').each( function(){
            itemArray.push($(this).html());
        });
        if (itemArray.indexOf(item) != -1) {
            return true;
        }
        return false;
    },

    itemClickBehaviour($item, cardData){
        let $parent = $item.parent('.ws-card');
        let newItem = utils.randomItem($parent, cardData);

        // reuturn if no item can be added (no unused items)
        if (!newItem){
            console.log('no additional options available');
            return;
        } else {
            $item.html(newItem);
            this.textResize($item);
        }
    },

    // return an array of x titles
    getRandomTitles(num, cardData){
        let results = [];
        for (let i = 0; i < num; i++){
            results.push(this.randomElement(cardData.titles, results));
        }
        return results;
    },

    addTitleOptions($parent, cardData){

    },

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

    randomizeTitles(cardData){
        $('.ws-card').each(function(){
            $carousel = $(this).find('.main-carousel');
            let $title = $(this).find('h2');
            let colIndex = $(this).data('col-index');
            let newTitle = utils.randomElement(cardData.items[colIndex]);
            if (newTitle) {
                let titleIndex = cardData.items[colIndex].indexOf(newTitle);
                $carousel.flickity('select', titleIndex);
            }
        })

    }
}

module.exports = utils
