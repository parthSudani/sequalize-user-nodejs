/**
 *  NPM PACKAGES 
 */
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');

/**
 * DATABASE
 */
const db = require("../../schema/db");
const usersCollection = db.users;
const deviceCollection = db.device

/**
 *  HELPERS 
 */
const { query } = require('../../query')
const { responseModel } = require('../../models');
const responseObject = require('../../helpers/responseObject')
const helpers = require('../../helpers/helpers')
const services = require('../../services/responseService')
const constant = require('../../helpers/constant')
    /**
     * REGISTER USER FUNCTION
     * @param {Object} req 
     * @returns Object
     */
module.exports.create = async(req) => {
    try {
        if (req.body.loginType == "" || typeof req.body.loginType == 'undefined' ||
            req.body.latitude == "" || typeof req.body.latitude == 'undefined' ||
            req.body.longitude == "" || typeof req.body.longitude == 'undefined' ||
            req.body.timeZone == "" || typeof req.body.timeZone == 'undefined') {

            /**
             * InvalidDetails
             */
            var successOrError = services.successOrErrors("err_02");
            var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.registerRequire, successOrError.location);
            return responseModel.failResponse(successOrError.fail_msg, [], resobj);

        } else {

            /**
             * NORMAL LOGIN
             * IF LOGIN TYPE 0 THEN CALL THIS CONDITION
             */
            if (req.body.loginType == 0) {

                if (req.body.email != "" && typeof req.body.email != 'undefined' &&
                    req.body.password != "" && typeof req.body.password != 'undefined' &&
                    req.body.confirmPassword != "" && typeof req.body.confirmPassword != 'undefined') {

                    var emailValidation = await helpers.validateEmail(req.body.email);
                    var strongPass = await helpers.checkPassword(req.body.password);

                    /**
                     * PASSWORD VALIDATION
                     */
                    if (strongPass == false) {

                        /**
                         * INVALID PASSWORD 
                         */
                        var successOrError = services.successOrErrors("err_12");
                        var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.password, successOrError.location);
                        return responseModel.failResponse(successOrError.fail_msg, [], resobj)

                    }

                    /**
                     * CONFIRM PASSWORD VALIDATION
                     */
                    else if (req.body.password != req.body.confirmPassword) {

                        /**
                         * CONFIRM PASSWORD OR PASSWORD NOT MATCH
                         */
                        var successOrError = services.successOrErrors("err_13");
                        var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.confirmPassword, successOrError.location);
                        return responseModel.failResponse(successOrError.fail_msg, [], resobj)

                    }

                    /**
                     * EMAIL VALIDATION
                     */
                    if (emailValidation == false) {

                        /**
                         * INVALID EMAIL
                         */
                        var successOrError = services.successOrErrors("err_03");
                        var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.email, successOrError.location);
                        return responseModel.failResponse(successOrError.fail_msg, [], resobj);

                    } else {

                        var userListQuery = { email: req.body.email }
                        var usersDetails = await query.findOne(usersCollection, userListQuery);

                        if (usersDetails != null) {

                            /**
                             * EMAIL ALREADY EXITS
                             */
                            var successOrError = services.successOrErrors("err_04");
                            var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.email, successOrError.location);
                            return responseModel.failResponse(successOrError.fail_msg, [], resobj);

                        }
                    }

                } else if (req.body.phone != "" && typeof req.body.phone != 'undefined' &&
                    req.body.countryCode != "" && typeof req.body.countryCode != 'undefined' &&
                    req.body.password != "" && typeof req.body.password != 'undefined' &&
                    req.body.confirmPassword != "" && typeof req.body.confirmPassword != 'undefined') {

                    var phoneNum = await helpers.checkPhone(req.body.phone)
                    var countryCodeValidation = await helpers.countryCodeValidation(req.body.countryCode)
                    var strongPass = await helpers.checkPassword(req.body.password);

                    /**
                     * PASSWORD VALIDATION
                     */
                    if (strongPass == false) {

                        /**
                         * INVALID PASSWORD 
                         */
                        var successOrError = services.successOrErrors("err_12");
                        var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.password, successOrError.location);
                        return responseModel.failResponse(successOrError.fail_msg, [], resobj)

                    }

                    /**
                     * CONFIRM PASSWORD VALIDATION
                     */
                    if (req.body.password != req.body.confirmPassword) {

                        /**
                         * CONFIRM PASSWORD OR PASSWORD NOT MATCH
                         */
                        var successOrError = services.successOrErrors("err_13");
                        var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.confirmPassword, successOrError.location);
                        return responseModel.failResponse(successOrError.fail_msg, [], resobj)

                    }
                    /**
                     * PHONE NUMBER VALIDATION
                     */
                    if (phoneNum == false) {

                        /**
                         * INVALID PHONE NUMBER 
                         */
                        var successOrError = services.successOrErrors("err_14");
                        var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.phone, successOrError.location);
                        return responseModel.failResponse(successOrError.fail_msg, [], resobj)

                    }
                    if (countryCodeValidation == false) {

                        /**
                         * INVALID COUNTRY CODE 
                         */
                        var successOrError = services.successOrErrors("err_40");
                        var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.countryCode, successOrError.location);
                        return responseModel.failResponse(successOrError.fail_msg, [], resobj)

                    } else {
                        var userListQuery = { phone: req.body.phone }
                        var usersDetails = await query.findOne(usersCollection, userListQuery);

                        if (usersDetails != null) {

                            /**
                             * PHONE NUMBER ALREADY EXITS
                             */
                            var successOrError = services.successOrErrors("err_41");
                            var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.phone, successOrError.location);
                            return responseModel.failResponse(successOrError.fail_msg, [], resobj);

                        }
                    }
                } else {
                    /**
                     * SOME MISSING FIELD
                     */
                    var successOrError = services.successOrErrors("err_35");
                    var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.loginType0Require, successOrError.location);
                    return responseModel.failResponse(successOrError.fail_msg, [], resobj);

                }
            }
            /**
             * GOOGLE LOGIN
             * IF LOGIN TYPE 1 THEN CALL THIS CONDITION
             */
            else if (req.body.loginType == 1) {

                if (req.body.googleId != "" && typeof req.body.googleId != 'undefined') {

                    var userListQuery = { googleId: req.body.googleId }
                    var usersDetails = await query.findOne(usersCollection, userListQuery);

                    if (usersDetails != null) {

                        /**
                         * GOOGLE ID ALREADY EXITS
                         */
                        var successOrError = services.successOrErrors("err_05");
                        var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.googleId, successOrError.location);
                        return responseModel.failResponse(successOrError.fail_msg, [], resobj);

                    }
                } else {

                    /**
                     * GOOGLE ID REQUIRE
                     */
                    var successOrError = services.successOrErrors("err_06");
                    var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.googleId, successOrError.location);
                    return responseModel.failResponse(successOrError.fail_msg, [], resobj);

                }

            }
            /**
             * FACEBOOK LOGIN
             * IF LOGIN TYPE 2 THEN CALL THIS CONDITION 
             */
            else if (req.body.loginType == 2) {

                if (req.body.facebookId != "" && typeof req.body.facebookId != 'undefined') {

                    var userListQuery = { facebookId: req.body.facebookId }
                    var usersDetails = await query.findOne(usersCollection, userListQuery);

                    if (usersDetails != null) {

                        /**
                         * FACEBOOK ID ALREADY EXITS
                         */
                        var successOrError = services.successOrErrors("err_07");
                        var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.facebookId, successOrError.location);
                        return responseModel.failResponse(successOrError.fail_msg, [], resobj);

                    }
                } else {
                    /**
                     * FACEBOOK ID REQUIRE
                     */
                    var successOrError = services.successOrErrors("err_08");
                    var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.facebookId, successOrError.location);
                    return responseModel.failResponse(successOrError.fail_msg, [], resobj);

                }

            }
            /**
             * APPLE LOGIN
             * IF LOGIN TYPE 3 THEN CALL THIS CONDITION
             */
            else if (req.body.loginType == 3) {

                if (req.body.appleId != "" && typeof req.body.appleId != 'undefined') {

                    var userListQuery = { appleId: req.body.appleId }
                    var usersDetails = await query.findOne(usersCollection, userListQuery);

                    if (usersDetails != null) {

                        /**
                         * APPLE ID ALREADY EXITS 
                         */
                        var successOrError = services.successOrErrors("err_09");
                        var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.appleId, successOrError.location);
                        return responseModel.failResponse(successOrError.fail_msg, [], resobj)

                    }
                } else {

                    /**
                     * APPLE ID REQUIRE
                     */
                    var successOrError = services.successOrErrors("err_10");
                    var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.appleId, successOrError.location);
                    return responseModel.failResponse(successOrError.fail_msg, [], resobj)

                }

            }

            if (req.body.phone != "" && typeof req.body.phone != 'undefined' &&
                req.body.countryCode != "" && typeof req.body.countryCode != 'undefined') {
                var phoneNum = await helpers.checkPhone(req.body.phone)
                var countryCodeValidation = await helpers.countryCodeValidation(req.body.countryCode)

                /**
                 * PHONE NUMBER VALIDATION
                 */
                if (phoneNum == false) {

                    /**
                     * INVALID PHONE NUMBER 
                     */
                    var successOrError = services.successOrErrors("err_14");
                    var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.phone, successOrError.location);
                    return responseModel.failResponse(successOrError.fail_msg, [], resobj)

                }
                if (countryCodeValidation == false) {

                    /**
                     * INVALID COUNTRY CODE 
                     */
                    var successOrError = services.successOrErrors("err_40");
                    var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.countryCode, successOrError.location);
                    return responseModel.failResponse(successOrError.fail_msg, [], resobj)

                }
            }

            /**
             * 
             */
            if (constant.multipleLogin == false) {
                if (req.body.email != "" && typeof req.body.email != 'undefined') {
                    var emailValidation = await helpers.validateEmail(req.body.email);
                    if (emailValidation == false) {

                        /**
                         * INVALID EMAIL
                         */
                        var successOrError = services.successOrErrors("err_03");
                        var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.email, successOrError.location);
                        return responseModel.failResponse(successOrError.fail_msg, [], resobj);

                    } else {

                        var userListQuery = { email: req.body.email }
                        var usersDetails = await query.findOne(usersCollection, userListQuery);

                        if (usersDetails != null) {

                            /**
                             * EMAIL ALREADY EXITS
                             */
                            var successOrError = services.successOrErrors("err_04");
                            var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.email, successOrError.location);
                            return responseModel.failResponse(successOrError.fail_msg, [], resobj);

                        }
                    }
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

            /**
             * IF USER ENTER USERNAME THEN CHECK THIS CONDITION
             */

            if (req.body.username != "" && typeof req.body.username != 'undefined') {

                var usernamevalidation = await query.findOne(usersCollection, { username: req.body.username })

                if (usernamevalidation != null) {
                    /**
                     * USERNAME ALREADY EXITS
                     */
                    var successOrError = services.successOrErrors("err_28");
                    var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.username, successOrError.location);
                    return responseModel.failResponse(successOrError.fail_msg, [], resobj)

                } else {
                    var usernamevalidation = await helpers.firstNamevalidation(req.body.username)
                    if (usernamevalidation == false) {
                        /**
                         * FIRST NAME VALIDATION
                         */
                        var successOrError = services.successOrErrors("err_48");
                        var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.username, successOrError.location);
                        return responseModel.failResponse(successOrError.fail_msg, [], resobj)
                    }
                }
            }

            /**
             * DATE VALIDATION
             */
            if (req.body.dateOfBirth != "" && typeof req.body.dateOfBirth != 'undefined') {

                var validDate = await helpers.parseDate(req.body.dateOfBirth)

                if (validDate == false) {
                    /**
                     * INVALID DATE
                     */
                    var successOrError = services.successOrErrors("err_15");
                    var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.date, successOrError.location);
                    return responseModel.failResponse(successOrError.fail_msg, [], resobj)

                }

                var findAge = await helpers.getAge(req.body.dateOfBirth)
                console.log("---------------->", findAge);
                if (findAge <= 18) {
                    /**
                     * YOU ARE NOT 18 YEAR OLD
                     */
                    var successOrError = services.successOrErrors("err_45");
                    var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.date, successOrError.location);
                    return responseModel.failResponse(successOrError.fail_msg, [], resobj)
                } else if (isNaN(findAge)) {
                    /**
                     * INVALID DATE
                     */
                    var successOrError = services.successOrErrors("err_54");
                    var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.date, successOrError.location);
                    return responseModel.failResponse(successOrError.fail_msg, [], resobj)
                }

            }

            /**
             * FIRST NAME VALIDATION
             */
            if (req.body.firstName != "" && typeof req.body.firstName != 'undefined') {
                var firstNameValidation = await helpers.firstNamevalidation(req.body.firstName)
                if (firstNameValidation == false) {
                    /**
                     * FIRST NAME VALIDATION
                     */
                    var successOrError = services.successOrErrors("err_43");
                    var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.firstName, successOrError.location);
                    return responseModel.failResponse(successOrError.fail_msg, [], resobj)
                }
            }
            /**
             * LAST NAME VALIDATION
             */
            if (req.body.lastName != "" && typeof req.body.lastName != 'undefined') {
                var lastNameValidation = await helpers.firstNamevalidation(req.body.lastName)
                if (lastNameValidation == false) {
                    /**
                     * FIRST NAME VALIDATION
                     */
                    var successOrError = services.successOrErrors("err_44");
                    var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.lastName, successOrError.location);
                    return responseModel.failResponse(successOrError.fail_msg, [], resobj)
                }
            }

            /**
             * FILE SIZE VALIDATION
             */
            if (req.files != null) {
                var bytes = (req.files.profile.size / 1048576).toFixed(2)
                if (bytes >= 5) {
                    /**
                     * INVALID PROFILE PICTURE MAXIMUM FILE SIZE IS 5 MB
                     */
                    var successOrError = services.successOrErrors("err_46");
                    var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.profile, successOrError.location);
                    return responseModel.failResponse(successOrError.fail_msg, [], resobj)
                }
            }

            /**
             * LATITUDE, LONGITUDE VALIDATION
             */
            if (req.body.latitude != "" && typeof req.body.latitude != 'undefined' && req.body.longitude != "" && typeof req.body.longitude != 'undefined') {
                console.log(req.body.latitude, req.body.longitude);
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
            }

            var addUserObject = {
                firstName: req.body.firstName ? req.body.firstName : '',
                lastName: req.body.lastName ? req.body.lastName : '',
                username: req.body.username ? req.body.username : '',
                password: req.body.password ? bcrypt.hashSync(req.body.password, salt) : '',
                email: req.body.email ? req.body.email : '',
                phone: req.body.phone ? req.body.phone : '',
                countryCode: req.body.countryCode ? req.body.countryCode : '',
                dateOfBirth: req.body.dateOfBirth ? req.body.dateOfBirth : '',
                address: req.body.address ? req.body.address : '',
                loginType: req.body.loginType,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                googleId: req.body.loginType == 1 ? req.body.googleId ? req.body.googleId : '' : '',
                facebookId: req.body.loginType == 2 ? req.body.facebookId ? req.body.facebookId : '' : '',
                appleId: req.body.loginType == 3 ? req.body.appleId ? req.body.appleId : '' : ''
            };

            /**
             * PROFILE PICTURE SIZE VALIDATION
             */
            if (req.files != null) {
                var image = await helpers.img(req)
                if (image == false) {
                    addUserObject.profile = ""
                } else {
                    addUserObject.profile = image
                }
            }

            /**
             * DEVICE DETAILS VALIDATION
             */
            if (req.body.deviceType == "" || typeof req.body.deviceType == 'undefined' || req.body.deviceToken == "" || typeof req.body.deviceToken == 'undefined' || req.body.deviceId == "" || typeof req.body.deviceId == 'undefined') {

                /**
                 * DEVICE DETAILS REQUIRE
                 */
                var successOrError = services.successOrErrors("err_36");
                var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.deviceRequire, successOrError.location);
                return responseModel.failResponse(successOrError.fail_msg, [], resobj)

            } else {
                /**
                 * DEVICE TYPE VALIDATION
                 */
                if (req.body.deviceType != 'A' && req.body.deviceType != 'I') {
                    /**
                     * INVALID DEVICE TYPE
                     */
                    var successOrError = services.successOrErrors("err_42");
                    var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.deviceType, successOrError.location);
                    return responseModel.failResponse(successOrError.fail_msg, [], resobj)
                } else {

                    var usersDetails = await query.create(usersCollection, addUserObject);

                    var deviceObject = {
                        userId: usersDetails.id,
                        deviceType: req.body.deviceType,
                        deviceToken: req.body.deviceToken,
                        deviceId: req.body.deviceId,
                        timeZone: req.body.timeZone,
                    }
                    var createDevice = await query.create(deviceCollection, deviceObject)

                    if (createDevice) {

                        /**
                         * GENERATE JWT TOKEN
                         */
                        const token = jwt.sign({ userId: usersDetails.id },
                            process.env.secretKey)

                        /**
                         * SUCCESS RESPONSE
                         */
                        var response = await responseObject.usersObjectRes(usersDetails, token)
                        var successOrError = services.successOrErrors("success_message");
                        return responseModel.successCreateResponse(successOrError.register, [response], []);

                    } else {

                        /**
                         * SOMETHIGN WENT WRONG WHILE REGISTER DEVICE
                         */
                        var successOrError = services.successOrErrors("err_16");
                        var resobj = responseModel.resObj(successOrError.message, successOrError.location);
                        return responseModel.failResponse(successOrError.fail_msg, [], resobj)

                    }
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