const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 8080;
const axios = require('axios').default;

require('dotenv').config()

const knex = require('knex')({
    client: 'mysql',
    connection: {
        host     : process.env.host,
        user     : process.env.db_user,
        password : process.env.db_password,
        database : process.env.db_name
    }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/create-formation", async (req, res) => {
    wallet = req.body.wallet
    formation_name = req.body.formation_name
    price = req.body.price
    content = req.body.content
    question1 = req.body.question1
    question2 = req.body.question2
    answer1 = req.body.answer1
    answer2 = req.body.answer2

    if (!formation_name || !wallet || !content || !question1 || !question2 || !answer1 || !answer2) {
        res.send("Missing parameters")
        return
    }

    const http = axios.create({ baseURL: "https://api.starton.io/v2", headers: {"x-api-key": 'BCyavFNFISpxz6F2QYvFFkjOHAsg2w0X',},})

    let keyScRes = await http.post('/smart-contract/from-template', {
        network: "binance-testnet",
        signerWallet: "0x22D901E22203673903263E363062e6759E0632C8",
        templateId: "sct_d4c1d5f2ed6f44d185bfb60eee2dbcaf",
        name: formation_name + " - Key",
        description: "Nft mintor for " + formation_name,
        params: [
            "Test",
            "ipfs://ipfs/",
            "QmYLR4ATgcf7wyNsqKty5yoWXQKXNXL1oqfEvSemYAcAb2",
            "0x22D901E22203673903263E363062e6759E0632C8"
        ],
        speed: "fast"
    }).catch(err => {
        console.log(err)
    });

    let certifScRes = await http.post('/smart-contract/from-template', {
        network: "binance-testnet",
        signerWallet: "0x22D901E22203673903263E363062e6759E0632C8",
        templateId: "sct_d4c1d5f2ed6f44d185bfb60eee2dbcaf",
        name: formation_name + " - Certificate",
        description: "Nft certificate for " + formation_name,
        params: [
            "Test",
            "ipfs://ipfs/",
            "QmYLR4ATgcf7wyNsqKty5yoWXQKXNXL1oqfEvSemYAcAb2",
            "0x22D901E22203673903263E363062e6759E0632C8"
        ],
        speed: "fast"
    }).catch(err => {
        console.log(err)
    });

    nft_contract = keyScRes.data.smartContract.address
    ntt_contract = certifScRes.data.smartContract.address

    knex('formation').insert({
        name: formation_name,
        wallet_creator: wallet,
        nft_contract: nft_contract,
        ntt_contract: ntt_contract,
        price: price,
        question1: question1,
        question2: question2,
        answer1: answer1,
        answer2: answer2,
        content: content
    }).then(() => {
        res.send("Formation created")
    }).catch((err) => {
        res.send(err)
    });

});

app.get('/wallet_info', async (req, res) => {
    wallet = req.query.wallet
    if (!wallet) {
        res.send("Missing parameters")
        return
    }
    const http = axios.create({ baseURL: "https://api.starton.io/v2", headers: {"x-api-key": 'BCyavFNFISpxz6F2QYvFFkjOHAsg2w0X',},})
    let scRes = await http.post('/smart-contract/binance-testnet/0xb622d957Feb979b1E70D5e797C3A0eeE13BD5202/read',
    {
        "functionName": 'balanceOf',
        "params": [wallet],
    })
    let bnbRes = await http.get(`/wallet/${wallet}/binance-testnet/balance`)
    lrn = parseFloat(scRes.data.response.raw / (10**18)).toFixed(3)
    bnb = parseFloat(bnbRes.data.balance.raw / (10**18)).toFixed(3)
    res.send({bnb: bnb.toString(), lrn: lrn.toString()})
});

app.post("/submit_quizz", async (req, res) => {
    formation_id = req.body.formation_id
    buyer_wallet = req.body.buyer_wallet

    res.send("quizz submitted")
});

app.post("/get_formation", async (req, res) => {
    formation_id = req.body.formation_id
    wallet = req.body.wallet

    data = {
        buyed: false,
        formation_name: "name",
        price: 0,
        content: "content",
        question1: "question1",
        question2: "question2",
        answer1: "answer1",
        answer2: "answer2"
    }
    res.send(data)
});

app.post("/buy_formation", async (req, res) => {
    formation_id = req.body.formation_id
    buyer_wallet = req.body.buyer_wallet
    creator_wallet = req.body.creator_wallet

    wallet_info = axios.get(`wallet_info?wallet=${buyer_wallet}`)

    // check funds of buyer

    let response = knex('formation').select('price', 'nft_contract', 'wallet_creator').where('id', formation_id)

    console.log("price: ", response.data.price)
    console.log("nft addr: ", response.data.nft_contract)
    console.log("wallet creator: ", response.data.wallet_creator)

    console.log(wallet_info)
    // async function mintNft(receiverAddress, metadataCid) {
    //     const nft = await starton.post(`/smart-contract/binance-testnet/${nft_contract}/call`,
    // {
    //     functionName: "mint",
    //     signerWallet: wallet,
    //     speed: "low",
    //     params: [
    //         buyer_wallet,
    //         formation_id,
    //         metadataCid,

    //     ],
    // });
    //     return nft.data;
    // }

    res.send("Formation bought !")
});

app.post("/secret", async (req, res) => {
    
    wallet = "0xb622d957Feb979b1E70D5e797C3A0eeE13BD5202"
    destination_wallet = req.body.destination_wallet
    lrn_amount = req.body.lrn_amount

    if (!destination_wallet) {
        res.send("Missing parameters")
        return;
    }
    const http = axios.create({ baseURL: "https://api.starton.io/v2", headers: {"x-api-key": 'BCyavFNFISpxz6F2QYvFFkjOHAsg2w0X',},})
    await http.post('/smart-contract/binance-testnet/0xb622d957Feb979b1E70D5e797C3A0eeE13BD5202/call', {
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

app.get('/formations', async (req, res) => {
    knex('formation').select('*').then(function(datas){
        res.send(datas)
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
