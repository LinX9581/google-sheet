const {google} = require('googleapis');
const keys = require('./keys.json');

const client = new google.auth.JWT(
    keys.client_email,null,keys.private_key,['https://www.googleapis.com/auth/spreadsheets']
)

client.authorize(function(err,tokens){
    if(err){
        console.log(err);
        return;
    }else{
        console.log('connected!')
        gsrun(client);
    }
})

async function gsrun(cl){
    const gsapi = google.sheets({version:'v4',auth:cl});

    // show data
    const opt = {
        spreadsheetId:'19hlpxzeS-DkS1XHMe7c7Jnv6H8tMkJZkoJWLApBioS4',
        range:'A1:B5'
    }
    let data = await gsapi.spreadsheets.values.get(opt);
    let dataArray = data.data.values
    console.log(dataArray)

    //update data
    let a = [['pv','1231231']]
    const updateOptions = {
        spreadsheetId:'19hlpxzeS-DkS1XHMe7c7Jnv6H8tMkJZkoJWLApBioS4',
        range:'E5',
        valueInputOption:'USER_ENTERED',
        resource:{values:a}
    }
    let res = await gsapi.spreadsheets.values.update(updateOptions)

    // console.log(res)
}


//https://www.youtube.com/watch?v=MiPpQzW_ya0