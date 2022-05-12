const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8080;
const axios = require('axios').default;
const FormData = require("form-data");
const { response } = require("express");
const routes = require("./routes/routes.js");

const starton = axios.create({
    baseURL: "https://api.starton.io/v2",
    headers: {
        "x-api-key": "BCyavFNFISpxz6F2QYvFFkjOHAsg2w0X",
    },
});

require('dotenv').config()

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host     : process.env.db_host,
        user     : process.env.db_user,
        password : process.env.db_password,
        database : process.env.db_name
    }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', routes);

async function hasNFTFormation(wallet, contract_formation) {
    const nft = await starton.post(`/smart-contract/binance-testnet/${contract_formation}/read`, {
        functionName: "balanceOf",
        params: [wallet]
    }).catch(err => {
    });

    try {
        if (nft.data.response.raw != 0)
            return true;
    } catch {
        return false;
    }
    return false;

};

// app.post("/create-formation", async (req, res) => {
//     wallet = req.body.wallet
//     formation_name = req.body.formation_name
//     price = req.body.price
//     content = req.body.content
//     question1 = req.body.question1
//     question2 = req.body.question2
//     answer1 = req.body.answer1
//     answer2 = req.body.answer2

//     if (!formation_name || !wallet || !content || !question1 || !question2 || !answer1 || !answer2) {
//         res.send("Missing parameters")
//         return
//     }

//     const http = axios.create({ baseURL: "https://api.starton.io/v2", headers: {"x-api-key": 'BCyavFNFISpxz6F2QYvFFkjOHAsg2w0X',},})

//     let keyScRes = await http.post('/smart-contract/from-template', {
//         "network": 'binance-testnet',
//         "name": formation_name + " - key",
//         "templateId": 'sct_e851adefe4494fc991207b2c37ed8a83',
//         "signerWallet": "0x22D901E22203673903263E363062e6759E0632C8",
//         "params": [
//             formation_name + " - key",
//             'LRNNFT',
//             'ipfs://ipfs/',
//             'QmXV8vyGmrQGMxZvMeafr28We8JT2gGTiatHKiMVd8uTT8',
//             '0x22D901E22203673903263E363062e6759E0632C8'
//         ],
//         "speed": "low",
//     }).catch(err => {
//         console.log(err)
//     });

//     let certifScRes = await http.post('/smart-contract/from-template', {
//         "network": 'binance-testnet',
//         "name": formation_name + " - certificate",
//         "templateId": 'sct_e851adefe4494fc991207b2c37ed8a83',
//         "signerWallet": "0x22D901E22203673903263E363062e6759E0632C8",
//         "params": [
//             formation_name + " - certificate",
//             'LRNNFT',
//             'ipfs://ipfs/',
//             'QmXV8vyGmrQGMxZvMeafr28We8JT2gGTiatHKiMVd8uTT8',
//             '0x22D901E22203673903263E363062e6759E0632C8'
//         ],
//         "speed": "low",
//     }).catch(err => {
//         console.log(err)
//     });

//     nft_contract = keyScRes.data.smartContract.address
//     ntt_contract = certifScRes.data.smartContract.address

//     knex('formation').insert({
//         name: formation_name,
//         wallet_creator: wallet,
//         nft_contract: nft_contract,
//         ntt_contract: ntt_contract,
//         price: price,
//         question1: question1,
//         question2: question2,
//         answer1: answer1,
//         answer2: answer2,
//         content: content
//     }).then(() => {
//         res.send("Formation created")
//     }).catch((err) => {
//         res.send(err)
//     });
// });

// app.get('/wallet_info', async (req, res) => {
//     wallet = req.query.wallet
//     if (!wallet) {
//         res.send("Missing parameters")
//         return
//     }

//     const http = axios.create({ baseURL: "https://api.starton.io/v2", headers: {"x-api-key": 'BCyavFNFISpxz6F2QYvFFkjOHAsg2w0X',},})
//     let scRes = await http.post('/smart-contract/binance-testnet/0xf292c0b21F4a583fAD962EDeF15DBE76F3606c1A/read',
//     {
//         "functionName": 'balanceOf',
//         "params": [wallet],
//     })
//     let bnbRes = await http.get(`/wallet/${wallet}/binance-testnet/balance`)

//     if (!bnbRes) {
//         res.status(400).send("Wallet does not exists")
//     }

//     lrn = parseFloat(scRes.data.response.raw / (10**18)).toFixed(3)
//     bnb = parseFloat(bnbRes.data.balance.raw / (10**18)).toFixed(3)
//     res.send({bnb: bnb.toString(), lrn: lrn.toString()})
// });

// app.post("/submit_quizz", async (req, res) => {
//     formation_id = req.body.formation_id
//     buyer_wallet = req.body.buyer_wallet

//     res.send("quizz submitted")
// });

// app.post("/get_formation", async (req, res) => {
//     formation_id = req.body.formation_id
//     wallet = req.body.wallet
//     bought = false

//     let data = await knex('formation').select('id', 'wallet_creator', 'nft_contract', 'name', 'price', 'content', 'question1', 'question2', 'answer1', 'answer2').where('id', formation_id).first().catch(err => {
//         res.send(err)
//         return
//     });
//     if (await hasNFTFormation(wallet, data.nft_contract)) {
//         bought = true
//     }
    
//     data = {
//         id: data.id,
//         wallet_creator: data.wallet_creator,
//         bought: bought,
//         formation_name: data.name,
//         price: data.price,
//         content: data.content,
//         question1: data.question1,
//         question2: data.question2,
//         answer1: data.answer1,
//         answer2: data.answer2,
//         user: wallet
//     }
//     res.send(data)
// });

// app.post("/buy_formation", async (req, res) => {

//     formation_id = req.body.formation_id
//     buyer_wallet = req.body.buyer_wallet

//     let response = await knex('formation').select('price', 'nft_contract', 'wallet_creator').where('id', formation_id).first().catch(err => {
//         res.send(err)
//     });
//     if (!response) {
//         res.send("No formation found with this id.")
//         return
//     }
    
//     let metadataCid = "QmSYv1FJLzL6utFTMCVUvz95ycCuGdQBYFJyHhbLbaGhV8"
//     let receiverAddress = buyer_wallet;
//     const SMART_CONTRACT_NETWORK = "binance-testnet";
//     const SMART_CONTRACT_ADDRESS = response.nft_contract;
//     const WALLET_IMPORTED_ON_STARTON = "0x22D901E22203673903263E363062e6759E0632C8";

//     const nft = await starton.post(`/smart-contract/${SMART_CONTRACT_NETWORK}/${SMART_CONTRACT_ADDRESS}/call`, {
//         functionName: "safeMint",
//         signerWallet: WALLET_IMPORTED_ON_STARTON,
//         speed: "low",
//         params: [receiverAddress, metadataCid],
//     });
//     res.send("Formation bought !")
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

// app.post("/secret", async (req, res) => {
    
//     destination_wallet = req.body.destination_wallet
//     lrn_amount = req.body.lrn_amount

//     if (!destination_wallet) {
//         res.send("Missing parameters")
//         return;
//     }
//     const http = axios.create({ baseURL: "https://api.starton.io/v2", headers: {"x-api-key": 'BCyavFNFISpxz6F2QYvFFkjOHAsg2w0X',},})
//     await http.post('/smart-contract/binance-testnet/0xf292c0b21F4a583fAD962EDeF15DBE76F3606c1A/call', {
//         "functionName": 'transfer',
//         "signerWallet": '0x22D901E22203673903263E363062e6759E0632C8',
//         "speed": "low",
//         "params": [
//             destination_wallet,
//             lrn_amount + "000000000000000000"
//         ],
//     }).catch((err) => { console.log(err) });
//     res.send("Founds sent !")
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
