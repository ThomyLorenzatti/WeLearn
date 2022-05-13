const https = require("https");
const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes.js");
const app = express();
var fs = require('fs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);



https
  .createServer({
  key: fs.readFileSync('./sslcert/server.key'),
  cert: fs.readFileSync('./sslcert/server.cert')
  }, app)
  .listen(4000, ()=>{
    console.log('server is runing at port 4000')
});
