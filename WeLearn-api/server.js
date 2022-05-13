const https = require("https");
const express = require("express");
const cors = require("cors");
const routes = require("./routes/routes.js");
const app = express();
var fs = require('fs');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', routes);  

app.listen(4000, () => {
  console.log(`Example app listening on port`)
})
  