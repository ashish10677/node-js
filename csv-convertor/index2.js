const fs = require('fs');
const readline = require('readline');

const convertor = async (csvFilePath) => {
    const fileStream = fs.createReadStream(csvFilePath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });
    let jsonArray = [];
    for await (const line of rl) {
        let values = line.split(',');
        let jsonObject = {
            "id": values[0],
            "first_name": values[1],
            "last_name": values[2],
            "email": values[3],
            "gender": values[4],
            "ip_address": values[5],
            "ssn": values[6],
            "credit_card": values[7],
            "bitcoin": values[8],
            "street_address": values[9]
        }
        jsonArray.push(jsonObject);
    }
    jsonArray.shift();
    console.log(jsonArray);
}

convertor(process.argv[2]);