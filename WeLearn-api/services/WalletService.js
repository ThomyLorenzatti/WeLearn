

export default class WalletService {

    async getWalletInfo() {
        wallet = req.query.wallet
        if (!wallet) {
            res.send("Missing parameters")
            return
        }

        const http = axios.create({ baseURL: "https://api.starton.io/v2", headers: {"x-api-key": 'BCyavFNFISpxz6F2QYvFFkjOHAsg2w0X',},})
        let scRes = await http.post('/smart-contract/binance-testnet/0xf292c0b21F4a583fAD962EDeF15DBE76F3606c1A/read',
        {
            "functionName": 'balanceOf',
            "params": [wallet],
        })
        let bnbRes = await http.get(`/wallet/${wallet}/binance-testnet/balance`)

        if (!bnbRes) {
            res.status(400).send("Wallet does not exists")
        }

        lrn = parseFloat(scRes.data.response.raw / (10**18)).toFixed(3)
        bnb = parseFloat(bnbRes.data.balance.raw / (10**18)).toFixed(3)
        let data = {bnb: bnb.toString(), lrn: lrn.toString()}
        return res.status(200).json(data)
    }

}