var request = require("request");
require("request").debug=true;
//import request from "request"
const clientID = '42b68874b979453fbb8f9190b07c8646'
const clientSecret = '7c1a7953cd3a44cd981aaa31e9ba8827'
let access_token

var options = {
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

request(options, function (error, response, body) {
   if (error) throw new Error(error);
   access_token = body.access_token
   //console.log(access_token);
   var apiOptions = {
      method: 'POST',
      //url:'https://localhost:8000',
      url: 'https://platform.fatsecret.com/rest/server.api',
      headers: {
         'Content-Type': 'application/json',
      },
      'auth': {
         'bearer': `${access_token}`
      },
      form: {
         method:"food.get.v2",
         food_id:"33691",
         format:"json"
      },
      json: true 
   }
   
   request(apiOptions, function (error, res, body) {
      if (error) throw new Error(error);
      console.log(body)
   })
}); 

