const https = require("https");
const express = require("express");

const cors = require("cors");
const PORT = 8080;
const routes = require("./routes/routes.js");
const axios = require('axios').default;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

https
  .createServer(app)
  .listen(4000, ()=>{
    console.log('server is runing at port 4000')
});
