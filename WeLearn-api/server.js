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

// app.post("/finish_formation", async (req, res) => {

//     formation_id = req.body.formation_id
//     buyer_wallet = req.body.buyer_wallet

//     let response = await knex('formation').select('price', 'ntt_contract', 'wallet_creator').where('id', formation_id).first().catch(err => {
//         res.send(err)
//         return
//     });
//     if (!response) {
//         res.send("No formation found with this id.")
//         return;
//     }
//     let metadataCid = "QmSYv1FJLzL6utFTMCVUvz95ycCuGdQBYFJyHhbLbaGhV8"
//     let receiverAddress = buyer_wallet;
//     const SMART_CONTRACT_NETWORK = "binance-testnet";
//     const SMART_CONTRACT_ADDRESS = response.ntt_contract;
//     const WALLET_IMPORTED_ON_STARTON = "0x22D901E22203673903263E363062e6759E0632C8";

//     const nft = await starton.post(`/smart-contract/${SMART_CONTRACT_NETWORK}/${SMART_CONTRACT_ADDRESS}/call`, {
//         functionName: "safeMint",
//         signerWallet: WALLET_IMPORTED_ON_STARTON,
//         speed: "low",
//         params: [receiverAddress, metadataCid],
//     }).catch(err => {
//         console.log(err)
//         res.send(err)
//         return
//     });
//     res.send("Formation bought !")
// });

app.post("/secret", async (req, res) => {
    
    destination_wallet = req.body.destination_wallet
    lrn_amount = req.body.lrn_amount

    if (!destination_wallet) {
        res.send("Missing parameters")
        return;
    }
    const http = axios.create({ baseURL: "https://api.starton.io/v2", headers: {"x-api-key": 'BCyavFNFISpxz6F2QYvFFkjOHAsg2w0X',},})
    await http.post('/smart-contract/binance-testnet/0xf292c0b21F4a583fAD962EDeF15DBE76F3606c1A/call', {
        "functionName": 'transfer',
        "signerWallet": '0x22D901E22203673903263E363062e6759E0632C8',
        "speed": "low",
        "params": [
            destination_wallet,
            lrn_amount + "000000000000000000"
        ],
    }).catch((err) => { console.log(err) });
    res.send("Founds sent !")
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
