const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8080;
const routes = require("./routes/routes.js");
const axios = require('axios').default;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

// app.post("/submit_quizz", async (req, res) => {
//     formation_id = req.body.formation_id
//     buyer_wallet = req.body.buyer_wallet

//     res.send("quizz submitted")
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
