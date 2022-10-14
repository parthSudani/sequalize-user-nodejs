var { query } = require('../query')

/**
 * USER RESPONSE FUNCTION
 * @param {Object} data 
 * @param {String} token 
 * @returns Object
 */
async function usersObjectRes(data, token) {
    var encryptFunc = await query.encryptData(data.id)

    userData = {
        token: token,
        firstName: data.firstName,
        lastName: data.lastName,
        id: encryptFunc,
        username: data.username,
        email: data.email,
        phone: data.phone,
        countryCode: data.countryCode,
        dateOfBirth: data.dateOfBirth,
        address: data.address,
        loginType: parseInt(data.loginType),
        latitude: data.latitude,
        longitude: data.longitude,
        isNotification: data.isNotification,
        isBlock: data.isBlock,
        googleId: data.googleId,
        facebookId: data.facebookId,
        appleId: data.appleId,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
    }
    if (data.profile != "") {
        userData.profile = process.env.IMAGE_PATH_USER + data.profile
    } else {
        userData.profile = data.profile
    }
    return (userData)
}


module.exports = { usersObjectRes }