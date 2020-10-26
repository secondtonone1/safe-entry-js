var api = require('./lib/api.js');
var config = require('./config.js');

var exec = require("child_process").exec;

var querystring = require("querystring");
const { result } = require('lodash');

function start(response, postData){
  console.log("Request handler 'start' was called.");
  var data = {
    "subType": "uinfin",
    "actionType": "checkin",
    "sub": "S9960846C",
    "venueId": "STG-180000001W-83338-SEQRSELFTESTSINGLE-SE",
    "mobileno": "92376345"
  };

  api.callEntry(data, config)
  .then(result => {
      console.log("Success! \nBody:");
  })
  .catch(error => {
      console.log("Error! \nBody:",error);
  });

  console.log("Request handler 'Start' was called.");
  response.writeHead(200,{"Content-Type":"text/plain"});
  response.write("Hello Start");
  response.end();
}

function upload(response, postData){
  console.log("Request handler 'upload' was called.");
  response.writeHead(200,{"Content-Type":"text/plain"});
  response.write("Hello Upload");
  response.end();
}

function safeData(response, postData){
  
  console.log("\n--->>\n postData:",  postData)
  let postBody= JSON.parse(postData.toString())
  console.log("\n--->>\n postBody:",   postBody)
  var data = {
    "subType": postBody.subType,
    "actionType": postBody.actionType,
    "sub": postBody.sub,
    "venueId": postBody.venueId,
    "mobileno": postBody.mobileno
  };
  

  let resCode = 0
  let resBody = {}
  api.callEntry(data, config)
  .then(result => {
      console.log("Success! \nBody:", result);
      resBody = result

      console.log("Request handler 'safeData' was called.");
      response.writeHead(200,{'Content-Type':'application/json'});
      var post_data = {
          "resCode":resCode,
          "resBody":resBody
        }
      var contentJson=JSON.stringify(post_data);
      response.write(contentJson) 
      response.end();
  })
  .catch(error => {
      console.log("Error! \nBody:",error);
      resCode = 1
      resBody = error

      console.log("Request handler 'safeData' was called.");
      response.writeHead(200,{'Content-Type':'application/json'});
      var post_data = {
        "resCode":resCode,
        "resBody":resBody
      }
      var contentJson=JSON.stringify(post_data, 2);
      response.write(contentJson) 
      response.end();
  });

}


exports.start = start;
exports.upload = upload;
exports.safeData = safeData;







