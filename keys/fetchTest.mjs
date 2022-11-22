import request from "request"
import fetch from "node-fetch"
import { XMLParser } from "fast-xml-parser"
const clientID = '42b68874b979453fbb8f9190b07c8646'
const clientSecret = '7c1a7953cd3a44cd981aaa31e9ba8827'
let access_token

/* var options = {
   method: 'POST',
   url: 'https://oauth.fatsecret.com/connect/token',
   auth : {
      user : clientID,
      password : clientSecret
   },
   headers: { 'content-type': 'application/x-www-form-urlencoded'},
   form: {
      'grant_type': 'client_credentials',
      'scope' : 'basic'
   },
   json: true
};

request(options, async function (error, response, body) {
   if (error) throw new Error(error);
   access_token = body.access_token */
   //console.log(access_token);

/*    const params = new URLSearchParams();
   params.append('method', "food.get.v2")
   params.append('food_id', "33691")
   params.append('format', "json")

   const data = {
        method:"food.get.v2",
        food_id:"33691",
        format:"json"
   }
   var apiOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        },
        body: JSON.stringify(data)
    }
    try {
        const results = await fetch('https://platform.fatsecret.com/rest/server.api', apiOptions)
        //const results = await fetch('https:localhost:8000', apiOptions)
        console.log(results.json())
    } catch(e) {
        console.log(e)
    }
 



});  */


const formData = new URLSearchParams();
formData.append('grant_type', 'client_credentials');
formData.append('scope', 'basic');
const opt = {
    method: 'POST',
    headers: { 
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(clientID + ":" + clientSecret).toString('base64')
    },
    body:formData
}

const res = await fetch('https://oauth.fatsecret.com/connect/token', opt);
const resJSON = await res.json();
console.log(resJSON.access_token);
access_token=resJSON.access_token;

const params = new URLSearchParams();
params.append('method', "food.get.v2")
params.append('food_id', "33691")
params.append('format', "json")


const option = {
    method: 'POST',
    headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${access_token}`
    },
    body: "method=food.get.v2&food_id=33691&format=json"
    //body: params
}



const res2 = await fetch('https://platform.fatsecret.com/rest/server.api', option);
const res2JSON = await res2.json();

console.log(res2JSON);