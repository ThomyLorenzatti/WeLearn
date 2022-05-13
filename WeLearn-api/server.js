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

https.createServer({
  key: privateKey,
  cert: certificate,
  ca: certificateAuthority,
  ciphers: [
      "ECDHE-RSA-AES128-SHA256",
      "DHE-RSA-AES128-SHA256",
      "AES128-GCM-SHA256",
      "RC4",
      "HIGH",
      "!MD5",
      "!aNULL"].join(':'),
  },
app);

// https
//   .createServer(app, credentials)
//   .listen(4000, ()=>{
//     console.log('server is runing at port 4000')
// });
