const axios = require('axios')
const serviceTools = require('../../services/utils/ServiceTools')

const GetWalletInfo = async (wallet) => {
    if (!wallet) {
        return serviceTools.makeResponse(false, 'Missing parameters to getWalletInfo', {})
    }

    const http = axios.create({ baseURL: "https://api.starton.io/v2", headers: {"x-api-key": 'BCyavFNFISpxz6F2QYvFFkjOHAsg2w0X',},})

    let scRes = await http.post('/smart-contract/binance-testnet/0xf292c0b21F4a583fAD962EDeF15DBE76F3606c1A/read',
    {
        "functionName": 'balanceOf',
        "params": [wallet],
    })

    let bnbRes = await http.get(`/wallet/${wallet}/binance-testnet/balance`)
    if (!bnbRes) {
        return serviceTools.makeResponse(false, 'Error getting bnb balance', {})
    }

    let lrn = parseFloat(scRes.data.response.raw / (10**18)).toFixed(3)
    let bnb = parseFloat(bnbRes.data.balance.raw / (10**18)).toFixed(3)
    let data = {bnb: bnb.toString(), lrn: lrn.toString()}
    if (!data) {
        return serviceTools.makeResponse(false, 'Error getting wallet info', {})
    }
    return serviceTools.makeResponse(true, '', data)
}

module.exports = {
    GetWalletInfo
}