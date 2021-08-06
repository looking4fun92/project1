const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  //const query = req.body.cityName
  const firstName = req.body.fName;
  const lasttName = req.body.lName;
  const email = req.body.email;

  const data = {
    members:[
      {
        email_address: email,
        status: "subscribed",
        merge_fields:
        {
          FNAME: firstName,
          LNAME: lasttName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us5.api.mailchimp.com/3.0/lists/3880610b5a"

  const options = {
    method: "POST",
    auth: "aaron1:5ebade97d8ef3c57a45e5fae7e11bf90-us5"
  }

  const request = https.request(url, options, function(response){
    
    if(response.statusCode === 200)
    {
      res.sendFile(__dirname + "/success.html");
    }
    else
    {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data){
      //console.log(JSON.parse(data));
      console.log("Yes")
    })
  })

  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.listen(process.env.PORT || 3000, function()
{
  console.log("Server is running on port 3000.");
})

// 5ebade97d8ef3c57a45e5fae7e11bf90-us5

// 3880610b5a