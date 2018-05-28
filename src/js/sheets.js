let sheets = {


    // The callback function the JSONP request will execute to load data from API
    processResults(results, cardData) {

        // extract titles from first row
        cardData.titles = results.values[0];

        // for each column
        for (let i = 0; i < cardData.titles.length; i++) {
          let items = [];
          // for each row except first
          for (let y = 1; y < results.values.length; y++) {
              let item = results.values[y][i];
              if (item){
                  items.push(item);
              }
          }
          //append items to Array
          cardData.items.push(items);
        }
        return cardData;
    },

    parseMaster(results, appData) {
        let output = {};
        let keys = results.values[0];
        let usernameIndex = keys.indexOf('username');

        // for each row except first
        for (let y = 1; y < results.values.length; y++) {
            let item = results.values[y];
            let username = item[usernameIndex];
            let result = {};
            if (username){
                for( key of results.values[0] ){
                    result[key] = item[keys.indexOf(key)];
                }
                output[username] = result;
            }
        }
        return output;
    }
}

module.exports = sheets
