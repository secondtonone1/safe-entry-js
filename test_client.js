var http=require('http');


//这是需要提交的数据
var post_data = {
    "subType": "uinfin",
    "actionType": "checkin",
    "sub": "S9960846C",
    "venueId": "STG-180000001W-83338-SEQRSELFTESTSINGLE-SE",
    "mobileno": "92376345"
};
 
var content=JSON.stringify(post_data);
  
var options = {
 
  host: '127.0.0.1',
 
  port: 9876,
 
  path: '/post/safedata',
 
  method: 'POST',
 
  headers:{
 
  'Content-Type':'application/json',
 
  'Content-Length':content.length
 
  }
 
};
 
console.log("post options:\n",options);
 
console.log("content:",content);
 
console.log("\n");
 
 
 
var req = http.request(options, function(res) {
 
  console.log("statusCode: ", res.statusCode);
 
  console.log("headers: ", res.headers);
 
  var _data='';
 
  res.on('data', function(chunk){
 
     _data += chunk;
 
  });
 
  res.on('end', function(){
 
     console.log("\n--->>\nresult:",_data)

     let postBody= JSON.parse(_data.toString())
     console.log("\n--->>\n postBody:",   postBody)
    
   });
 
});
 
 
req.write(content);
 
req.end();