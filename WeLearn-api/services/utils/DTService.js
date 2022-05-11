const makeFormationDTI = (name, wallet, nft_contract, ntt_contract, price, question1, question2, answer1, answer2, content) => {
    return {
        name: name,
        wallet_creator: wallet,
        nft_contract: nft_contract,
        ntt_contract: ntt_contract,
        price: price,
        question1: question1,
        question2: question2,
        answer1: answer1,
        answer2: answer2,
        content: content
    }
}

module.exports = {
    makeFormationDTI
}