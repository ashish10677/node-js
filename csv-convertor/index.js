const csvToJson = require('csvtojson');
const fs = require('fs');
const path = require('path');

const convertor = (csvFilePath) => {
    if(!csvFilePath) {
        throw new Error("Please provide proper csv!");
    }
    csvToJson().fromFile(csvFilePath).then((jsonObject) => {
        fs.writeFileSync(path.join(__dirname, 'customer-data.json'), JSON.stringify(jsonObject));
    }).catch(err => {
        console.error("Error in converting file!", err);
    })
}

convertor(process.argv[2]);