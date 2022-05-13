const https = require("https");
const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes.js");
const app = express();
var fs = require('fs');
var privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
var certificate = fs.readFileSync('sslcert/server.cert', 'utf8');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);



https
  .createServer({
  key: fs.readFileSync('./ssl/server.key'),
  cert: fs.readFileSync('./ssl/server.cert')
  }, app)
  .listen(4000, ()=>{
    console.log('server is runing at port 4000')
});
