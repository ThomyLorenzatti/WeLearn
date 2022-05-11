const makeFormationDTI = (obj) => {
    return {
        name: obj.name ? obj.name : '',
        wallet_creator: obj.wallet ? obj.wallet : null,
        nft_contract: obj.nft_contract ? obj.nft_contract : null,
        ntt_contract: obj.ntt_contract ? obj.ntt_contract : null,
        price: obj.price ? obj.price : 0,
        question1: obj.question1 ? obj.question1 : '',
        question2: obj.question2 ? obj.question2 : '',
        answer1: obj.answer1 ? obj.answer1 : '',
        answer2: obj.answer2 ? obj.answer2 : '',
    }
}

module.exports = {
    makeFormationDTI
}