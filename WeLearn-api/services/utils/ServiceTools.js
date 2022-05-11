const makeResponse = async (success, info, data) => {
    return {
        success: success,
        info: info,
        data: data
    }
}

module.exports = {
    makeResponse
}