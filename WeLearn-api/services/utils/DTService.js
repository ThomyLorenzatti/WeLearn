const makeFormationDTI = (obj) => {
    return {
        name: obj.formation_name ? obj.formation_name : '',
        wallet_creator: obj.wallet ? obj.wallet : null,
        nft_contract: obj.nft_contract ? obj.nft_contract : null,
        ntt_contract: obj.ntt_contract ? obj.ntt_contract : null,
        price: obj.price ? obj.price : 0,
        question1: obj.question1 ? obj.question1 : '',
        question2: obj.question2 ? obj.question2 : '',
        answer1: obj.answer1 ? obj.answer1 : '',
        answer2: obj.answer2 ? obj.answer2 : '',
        cid_nft: obj.cid_nft ? obj.cid_nft : null,
        cid_ntt: obj.cid_ntt ? obj.cid_ntt : null
    }
}

module.exports = {
    makeFormationDTI
}