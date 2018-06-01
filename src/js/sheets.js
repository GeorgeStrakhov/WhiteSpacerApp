let sheets = {

    // Extract titles row (first) and data rows (subsequent)
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

    // Extract login, password, and spreadsheet key from master sheet
    parseMaster(results, appData) {
        let output = {};
        let keys = results.values[0];
        let loginIndex = keys.indexOf('login');

        // for each row except first
        for (let y = 1; y < results.values.length; y++) {
            let item = results.values[y];
            let login = item[loginIndex].toLowerCase();
            let result = {};
            if (login){
                for( i = 0; i < results.values[0].length; i++ ){
                    var key = results.values[0][i]
                    result[key] = item[keys.indexOf(key)];
                }
                output[login] = result;
            }
        }
        return output;
    }
}

module.exports = sheets
