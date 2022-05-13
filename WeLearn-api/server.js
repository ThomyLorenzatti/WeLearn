const https = require("https");
const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes.js");
const app = express();
var fs = require('fs');
var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.crt', 'utf8');


var credentials = {key: privateKey, cert: certificate};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

https
  .createServer(app, credentials)
  .listen(4000, ()=>{
    console.log('server is runing at port 4000')
});
