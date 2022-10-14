/**
 * DATABASE
 */
const db = require("../../schema/db");
const usersCollection = db.users;
const deviceCollection = db.device

/**
 * HELPERS
 */
const { query } = require('../../query')
const services = require('../../services/responseService')
const { responseModel } = require('../../models');
const responseObject = require('../../helpers/responseObject')

/**
 * NPM PACKAGE
 */
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * LOGIN USER FUNCTION
 * @param {Object} req 
 * @returns Object
 */
module.exports.login = async(req) => {
    try {

        var loginFlag = 0;
        var user = {}
            /**
             * REQUIRE FIELDS
             */
        if (typeof req.body.loginType == 'undefined' || req.body.deviceType == "" || typeof req.body.deviceType == 'undefined' || req.body.deviceToken == "" || typeof req.body.deviceToken == 'undefined' || req.body.deviceId == "" || typeof req.body.deviceId == 'undefined' || req.body.timeZone == "" || typeof req.body.timeZone == 'undefined') {
            /**
             * INVALID DETAILS (SOMETHING MISSING )
             */
            var successOrError = services.successOrErrors("err_27");
            var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.loginRequire, successOrError.location);
            return responseModel.failResponse(successOrError.fail_msg, [], resobj);
        } else {

            /**
             * NORMAL LOGIN (EMAIL , PASSWORD)
             * IF LOGIN TYPE 0 
             */
            if (req.body.loginType == 0) {

                /**
                 * LOGIN WITH EMAIL OR PASSWORD
                 */
                if (req.body.email != "" && typeof req.body.email != 'undefined' && req.body.password != "" && typeof req.body.password != 'undefined') {

                    var userListQuery = { email: req.body.email }
                    var usersDetails = await query.findOne(usersCollection, userListQuery);

                    if (usersDetails != null && usersDetails.length != 0) {

                        var resultComparePass = await bcrypt.compare(req.body.password, usersDetails.dataValues.password)

                        if (resultComparePass == true) {

                            loginFlag = 1
                            user.email = usersDetails.email

                        } else {

                            loginFlag = 0

                            /**
                             * OLD PASSWORD IS WRONG 
                             */
                            var successOrError = services.successOrErrors("err_49");
                            var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.password, successOrError.location);
                            return responseModel.failResponse(successOrError.fail_msg, [], resobj);

                        }

                    } else {

                        loginFlag = 0

                        /**
                         * EMAIL NOT FOUND
                         */
                        var successOrError = services.successOrErrors("err_20");
                        var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.email, successOrError.location);
                        return responseModel.failResponse(successOrError.fail_msg, [], resobj);

                    }

                }
                /**
                 * LOGIN WITH PHONE NUMBER AND PASSWORD
                 */
                else if (req.body.phone != "" && typeof req.body.phone != 'undefined' && req.body.countryCode != "" && typeof req.body.countryCode != 'undefined' && req.body.password != "" && typeof req.body.password != 'undefined') {

                    var userListQuery = { phone: parseInt(req.body.phone) }
                    var usersDetails = await query.findOne(usersCollection, userListQuery);
                    if (usersDetails != null && usersDetails.length != 0) {

                        var resultComparePass = await bcrypt.compare(req.body.password, usersDetails.dataValues.password)

                        if (resultComparePass == true) {

                            loginFlag = 1
                            user.phone = usersDetails.phone

                        } else {

                            loginFlag = 0

                            /**
                             * WRONG PASSWORD
                             */
                            var successOrError = services.successOrErrors("err_49");
                            var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.password, successOrError.location);
                            return responseModel.failResponse(successOrError.fail_msg, [], resobj);

                        }

                    } else {

                        loginFlag = 0

                        /**
                         * PHONE NOT FOUND
                         */
                        var successOrError = services.successOrErrors("err_26");
                        var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.phone, successOrError.location);
                        return responseModel.failResponse(successOrError.fail_msg, [], resobj);

                    }

                } else {
                    loginFlag = 0

                    /**
                     * MISSING REQUIRE  FIELD (EMAIL || PHONE , PASSWORD)
                     */
                    var successOrError = services.successOrErrors("err_21");
                    var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.loginType0Login, successOrError.location);
                    return responseModel.failResponse(successOrError.fail_msg, [], resobj);
                }
            }

            /**
             * GOOGLE ID LOGIN 
             * LOGIN TYPE 1
             */
            if (req.body.loginType == 1) {

                if (req.body.googleId != "" && typeof req.body.googleId != 'undefined') {

                    var findGoogleId = await query.findOne(usersCollection, { googleId: req.body.googleId })
                    console.log(findGoogleId);
                    if (findGoogleId != null) {

                        loginFlag = 1
                        user.googleId = findGoogleId.googleId

                    } else {

                        loginFlag = 0

                        /**
                         * GOOGLE ID NOT FOUND 
                         */
                        var successOrError = services.successOrErrors("err_22");
                        var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.googleId, successOrError.location);
                        return responseModel.failResponse(successOrError.fail_msg, [], resobj);

                    }
                    // https://ebizzcodestandard.stoplight.io/studio/api-documentation?
                } else {

                    loginFlag = 0

                    /**
                     * GOOGLE ID IS REQUIRE 
                     */
                    var successOrError = services.successOrErrors("err_23");
                    var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.googleId, successOrError.location);
                    return responseModel.failResponse(successOrError.fail_msg, [], resobj);

                }
            }

            /**
             * FACEBOOK ID LOGIN
             * LOGIN TYPE 2
             */
            if (req.body.loginType == 2) {

                if (req.body.facebookId != "" && typeof req.body.facebookId != 'undefined') {

                    var findfacebookId = await query.findOne(usersCollection, { facebookId: req.body.facebookId })

                    if (findfacebookId != null) {

                        loginFlag = 1
                        user.facebookId = findfacebookId.facebookId

                    } else {

                        loginFlag = 0

                        /**
                         * FACEBOOK ID NOT FOUND
                         */
                        var successOrError = services.successOrErrors("err_24");
                        var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.facebookId, successOrError.location);
                        return responseModel.failResponse(successOrError.fail_msg, [], resobj);

                    }

                } else {

                    loginFlag = 0

                    /**
                     * FACEBOOK ID IS REQUIRE
                     */
                    var successOrError = services.successOrErrors("err_50");
                    var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.facebookId, successOrError.location);
                    return responseModel.failResponse(successOrError.fail_msg, [], resobj);

                }
            }

            /**
             * APPLE ID LOGIN
             * LOGIN TYPE 3
             */
            if (req.body.loginType == 3) {

                if (req.body.appleId != "" && typeof req.body.appleId != 'undefined') {

                    var findappleId = await query.findOne(usersCollection, { appleId: req.body.appleId })

                    if (findappleId != null) {

                        loginFlag = 1
                        user.appleId = findappleId.appleId

                    } else {

                        loginFlag = 0

                        /**
                         * APPLE ID NOT FOUND
                         */
                        var successOrError = services.successOrErrors("err_25");
                        var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.appleId, successOrError.location);
                        return responseModel.failResponse(successOrError.fail_msg, [], resobj);

                    }

                } else {

                    loginFlag = 0

                    /**
                     * APPLE ID IS REQUIRE
                     */
                    var successOrError = services.successOrErrors("err_51");
                    var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.appleId, successOrError.location);
                    return responseModel.failResponse(successOrError.fail_msg, [], resobj);

                }
            }


            /**
             * LOGIN TYPE VALIDATION
             */
            else if (req.body.loginType != 0 && req.body.loginType != 1 && req.body.loginType != 2 && req.body.loginType != 3) {

                /**
                 * INVALID LOGIN TYPE 
                 */
                var successOrError = services.successOrErrors("err_38");
                var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.loginType, successOrError.location);
                return responseModel.failResponse(successOrError.fail_msg, [], resobj)

            }

            if (req.body.latitude != "" && typeof req.body.latitude != 'undefined' && req.body.longitude != "" && typeof req.body.longitude != 'undefined') {
                var latitudeValidation = helpers.latLong(req.body.latitude);
                var longitudeValidation = helpers.latLong(req.body.longitude)
                if (latitudeValidation == false) {
                    /**
                     * LATITUDE INVALID
                     */
                    var successOrError = services.successOrErrors("err_47");
                    var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.latitude, successOrError.location);
                    return responseModel.failResponse(successOrError.fail_msg, [], resobj)
                }
                if (longitudeValidation == false) {
                    /**
                     * LONGITUDE INVALID
                     */
                    var successOrError = services.successOrErrors("err_47");
                    var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.longitude, successOrError.location);
                    return responseModel.failResponse(successOrError.fail_msg, [], resobj)
                }
                if (latitudeValidation == true && longitudeValidation == true) {
                    var find = await query.findOne(usersCollection, user)
                    var devicedDB = await query.updateOne(usersCollection, { id: find.id }, { latitude: req.body.latitude, longitude: req.body.longitude })
                }
            }

            var user_id = "";
            if (loginFlag == 1) {

                var find = await query.findOne(usersCollection, user)
                loginFlag = 1
                user_id = find.id
                if (req.body.deviceType != 'A' && req.body.deviceType != 'I') {
                    /**
                     * INVALID DEVICE TYPE
                     */
                    var successOrError = services.successOrErrors("err_42");
                    var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.deviceType, successOrError.location);
                    return responseModel.failResponse(successOrError.fail_msg, [], resobj)
                } else {

                    var validDevice = await query.findOne(deviceCollection, { deviceType: req.body.deviceType, deviceToken: req.body.deviceToken, deviceId: req.body.deviceId })

                    /**
                     * VALIDATION ON DEVICE DETAILS ( DEVICE TYPE , DEVICE TOKEN , DEVICE ID)
                     */
                    if (validDevice != null) {

                        /**
                         * UPDATE TIMEZONE IN LOGIN SAME DEVICE
                         */
                        var devicedDB = await query.updateOne(deviceCollection, { id: validDevice.id }, { timezone: req.body.timeZone })

                        if (devicedDB) {

                            loginFlag = 1

                        } else {

                            loginFlag = 0

                        }

                    } else {
                        /**
                         * REGISTER DEVICE 
                         */
                        var insertObj = {
                            userId: user_id,
                            deviceType: req.body.deviceType,
                            deviceToken: req.body.deviceToken,
                            deviceId: req.body.deviceId,
                            timezone: req.body.timeZone,
                        }
                        var devicedDB = await query.create(deviceCollection, insertObj)
                    }

                    const token = jwt.sign({ userId: user_id },
                        process.env.secretKey)

                    /**
                     * SUCCESS RESPONSE
                     */
                    var response = await responseObject.usersObjectRes(find, token)
                    var successOrError = services.successOrErrors("success_message");
                    return responseModel.successResponse(successOrError.login, [response], []);

                }
            }
        }




    } catch (error) {
        /**
         * CATCH ERROR
         */
        var successOrError = services.successOrErrors("ex_00");
        var resobj = responseModel.resObj(error.message, successOrError.parameters.noparams, successOrError.location);
        return responseModel.failResponse(successOrError.fail_msg, [], resobj);

    }
}