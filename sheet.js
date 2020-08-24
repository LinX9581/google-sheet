const { google } = require('googleapis');
const keys = require('./keys.json');

const client = new google.auth.JWT(
    keys.client_email, null, keys.private_key, ['https://www.googleapis.com/auth/spreadsheets']
)

client.authorize(function(err, tokens) {
    if (err) {
        console.log(err);
        return;
    } else {
        console.log('connected!')
            // gsrun(client);
    }
})

async function gsrun(cl) {
    const gsapi = google.sheets({ version: 'v4', auth: cl });

    // show data
    const opt = {
        spreadsheetId: '19hlpxzeS-DkS1XHMe7c7Jnv6H8tMkJZkoJWLApBioS4',
        range: 'A1:B5'
    }
    let data = await gsapi.spreadsheets.values.get(opt);
    let dataArray = data.data.values
    console.log(dataArray)

    //update data
    let a = [
        ['pv', '1231231']
    ]
    const updateOptions = {
        spreadsheetId: '19hlpxzeS-DkS1XHMe7c7Jnv6H8tMkJZkoJWLApBioS4',
        range: "'工作表3'!E5",
        valueInputOption: 'USER_ENTERED',
        resource: { values: a }
    }
    let res = await gsapi.spreadsheets.values.update(updateOptions)


    const request = {
        // The ID of the spreadsheet
        "spreadsheetId": '19hlpxzeS-DkS1XHMe7c7Jnv6H8tMkJZkoJWLApBioS4',
        "resource": {
            "requests": [{
                "addSheet": {
                    // Add properties for the new sheet
                    "properties": {
                        "sheetId": '0725',
                        "title": '123123',
                        // "index": number,
                        // "sheetType": enum(SheetType),
                        // "gridProperties": {
                        //     object(GridProperties)
                        // },
                        // "hidden": boolean,
                        // "tabColor": {
                        //     object(Color)
                        // },
                        // "rightToLeft": boolean
                    }
                }
            }]
        }
    };

    gsapi.spreadsheets.batchUpdate(request, (err, response) => {
        if (err) {
            // TODO: Handle error
        } else {
            // TODO: Handle success
        }
    });
    // console.log(res)
}


async function createGsSheet(gsClient, date) {
    const gsapi = google.sheets({ version: 'v4', auth: gsClient });
    const createOpt = {
        "spreadsheetId": '19hlpxzeS-DkS1XHMe7c7Jnv6H8tMkJZkoJWLApBioS4',
        "resource": {
            "requests": [{
                "addSheet": {
                    "properties": {
                        "sheetId": date,
                        "title": date,
                    }
                }
            }]
        }
    };
    gsapi.spreadsheets.batchUpdate(createOpt, (err, response) => {
        if (err) {
            console.log(err)
        } else {}
    });
}

createGsSheet(client, "yesterday")

//https://www.youtube.com/watch?v=MiPpQzW_ya0