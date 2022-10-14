/**
 * NPM PACKAGE
 */
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

/**
 * DATABASE
 */
const db = require("../../schema/db");
const usersCollection = db.users;

/**
 * HELPERS
 */
const { query } = require('../../query')
const { responseModel } = require('../../models');
const responseObject = require('../../helpers/responseObject')
const helpers = require('../../helpers/helpers')
const services = require('../../services/responseService')


/**
 * USER UPDATE DETAILS FUNCTION
 * @param {Object} req 
 * @returns Object
 */
module.exports.update = async(req) => {
    try {
        /**
         * PARAMS ID VALIDATION (REQUIRE)
         */
        if (req.params.id) {

            var decrypt_Data = await query.decryptData(req.params.id)

            /**
             * DECRYPT ID VALIDATION
             */
            if (decrypt_Data != false) {

                var userListQuery = { id: decrypt_Data }
                var usersDetails = await query.findOne(usersCollection, userListQuery);
                var usersObject = {};
                var flag = 0;

                if (usersDetails != null) {

                    /**
                     * UPDATE FIRSTNAME THEN CALL THIS CONDITION
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

                        } else {

                            usersObject.firstName = req.body.firstName ? req.body.firstName : usersDetails.dataValues.firstName;

                        }
                    }

                    /**
                     * UPDATE LASTNAME THEN CALL THIS CONDITION
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
                        } else {

                            usersObject.lastName = req.body.lastName ? req.body.lastName : usersDetails.dataValues.lastName;

                        }
                    }

                    /**
                     * IF UPDATE USERNAME THEN CALL THIS CONDITION
                     */
                    if (req.body.username != "" && typeof req.body.username != 'undefined') {

                        var findUsername = await query.findSome(usersCollection, { username: req.body.username })
                        var filter = findUsername.filter(item => item.dataValues.id != decrypt_Data)

                        if (filter.length != 0) {

                            flag = 1;
                            /**
                             * USERNAME ALREDY EXITS
                             */
                            var successOrError = services.successOrErrors("err_28");
                            var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.username, successOrError.location);
                            return responseModel.failResponse(successOrError.fail_msg, [], resobj);

                        } else {

                            var usernamevalidation = await helpers.firstNamevalidation(req.body.username)
                            if (usernamevalidation == false) {
                                /**
                                 * USERNAME VALIDATION
                                 */
                                var successOrError = services.successOrErrors("err_48");
                                var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.username, successOrError.location);
                                return responseModel.failResponse(successOrError.fail_msg, [], resobj)

                            } else {

                                usersObject.username = req.body.username ? req.body.username : usersDetails.dataValues.username;

                            }
                        }
                    }

                    /**
                     * UPDATE PASSWORD THEN CALL THIS CONDITION
                     */
                    if (req.body.oldPassword != "" && typeof req.body.oldPassword != 'undefined' && typeof req.body.oldPassword == 'string') {

                        if (req.body.newPassword != "" && typeof req.body.newPassword != 'undefined' && typeof req.body.newPassword == 'string') {

                            if (req.body.confirmPassword != "" && typeof req.body.confirmPassword != 'undefined' && typeof req.body.confirmPassword == 'string') {

                                /**
                                 * CONFIRM PASSWORD VALIDATION
                                 */
                                if (req.body.newPassword != req.body.confirmPassword) {

                                    /**
                                     * CONFIRM PASSWORD OR PASSWORD NOT MATCH
                                     */
                                    var successOrError = services.successOrErrors("err_13");
                                    var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.confirmPassword, successOrError.location);
                                    return responseModel.failResponse(successOrError.fail_msg, [], resobj)

                                }
                                var resultComparePass = await bcrypt.compare(req.body.oldPassword, usersDetails.password)

                                if (resultComparePass == false) {

                                    flag = 1;
                                    /**
                                     * OLDPASSWORD WROND
                                     */
                                    var successOrError = services.successOrErrors("err_33");
                                    var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.oldPassword, successOrError.location);
                                    return responseModel.failResponse(successOrError.fail_msg, [], resobj);

                                } else {

                                    var strongPass = helpers.checkPassword(req.body.newPassword);

                                    if (strongPass == true) {

                                        usersObject.password = bcrypt.hashSync(req.body.newPassword, salt)

                                    } else {
                                        flag = 1;

                                        /**
                                         * INVALID PASSWORD(Password should be 8 characters long, including at least one upper case, at least one lower case, at least one special character and at least one digit)
                                         */
                                        var successOrError = services.successOrErrors("err_12");
                                        var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.newPassword, successOrError.location);
                                        return responseModel.failResponse(successOrError.fail_msg, [], resobj);

                                    }
                                }
                            } else {
                                flag = 1;
                                /**
                                 * INVALID CONFIRM PASSWORD
                                 */
                                var successOrError = services.successOrErrors("err_37");
                                var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.confirmPassword, successOrError.location);
                                return responseModel.failResponse(successOrError.fail_msg, [], resobj);
                            }
                        } else {

                            usersObject.password = usersDetails.password
                            flag = 1;
                            /**
                             * INVALID NEW PASSWORD
                             */
                            var successOrError = services.successOrErrors("err_34");
                            var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.newPassword, successOrError.location);
                            return responseModel.failResponse(successOrError.fail_msg, [], resobj);

                        }
                    }

                    /**
                     * UPDATE EMAIL THEN CALL THIS CONDITION
                     */
                    if (req.body.email != "" && typeof req.body.email != 'undefined' && typeof req.body.email == 'string') {
                        var emailValidation = await helpers.validateEmail(req.body.email)
                        var userListQueryemail = { email: req.body.email }
                        var usersDetailss = await query.findOne(usersCollection, userListQueryemail);
                        var userdetail;
                        if (usersDetailss == null || usersDetailss.length == 0) {
                            userdetail = []
                        } else {
                            userdetail = [usersDetailss]
                        }
                        var filter = userdetail.filter(item => item.dataValues.id != decrypt_Data)
                        if (filter.length != 0) {
                            flag = 1;

                            /**
                             * EMAIL ALREADY EXITS
                             */
                            var successOrError = services.successOrErrors("err_04");
                            var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.email, successOrError.location);
                            return responseModel.failResponse(successOrError.fail_msg, [], resobj)

                        } else {
                            if (emailValidation == false) {
                                flag = 1;
                                /**
                                 * INVALID EMAIL 
                                 */
                                var successOrError = services.successOrErrors("err_03");
                                var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.email, successOrError.location);
                                return responseModel.failResponse(successOrError.fail_msg, [], resobj)
                            } else {
                                usersObject.email = req.body.email ? req.body.email : usersDetails.dataValues.email;
                            }
                        }
                    }

                    /**
                     * IF UPDATE PHONE NUMBER THEN CALL THIS CONDITION
                     */
                    if (req.body.phone != "" && typeof req.body.phone != 'undefined') {
                        var phoneNum = await helpers.checkPhone(req.body.phone)
                        if (phoneNum == false) {

                            /**
                             * INVALID PHOE NUMBER
                             */
                            flag = 1;
                            var successOrError = services.successOrErrors("err_14");
                            var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.phone, successOrError.location);
                            return responseModel.failResponse(successOrError.fail_msg, [], resobj)

                        } else {

                            var findPhone = await query.findSome(usersCollection, { phone: req.body.phone })
                            var filter = findPhone.filter(item => item.dataValues.id != decrypt_Data)

                            if (filter.length != 0) {

                                flag = 1;
                                /**
                                 * USERNAME ALREDY EXITS
                                 */
                                var successOrError = services.successOrErrors("err_41");
                                var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.phone, successOrError.location);
                                return responseModel.failResponse(successOrError.fail_msg, [], resobj);

                            } else {
                                usersObject.phone = req.body.phone ? parseInt(req.body.phone) : usersDetails.dataValues.phone

                            }
                        }
                    }

                    /**
                     * IF UPDATE COUNTRY CODE THEN CALL THIS CONDITION
                     */
                    if (req.body.countryCode != "" && typeof req.body.countryCode != 'undefined') {

                        var countryCodeValidation = await helpers.countryCodeValidation(req.body.countryCode)

                        if (countryCodeValidation == false) {

                            /**
                             * INVALID COUNTRY CODE 
                             */
                            flag = 1;
                            var successOrError = services.successOrErrors("err_40");
                            var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.countryCode, successOrError.location);
                            return responseModel.failResponse(successOrError.fail_msg, [], resobj)

                        } else {
                            usersObject.countryCode = req.body.countryCode ? req.body.countryCode : usersDetails.dataValues.countryCode

                        }
                    }

                    /**
                     * UPDATE DATE OF BIRTH THEN CALL THIS CONDITION
                     */
                    if (req.body.dateOfBirth != "" && typeof req.body.dateOfBirth != 'undefined') {
                        /**
                         * DATE VALIDATION
                         */

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
                        } else {

                            usersObject.dateOfBirth = req.body.dateOfBirth ? req.body.dateOfBirth : usersDetails.dataValues.dateOfBirth;

                        }
                    }

                    /**
                     * UPDATE LATITUDE THEN CALL THIS CONDITION
                     */
                    if (req.body.latitude != "" && typeof req.body.latitude != 'undefined') {
                        var latitudeValidation = helpers.latLong(req.body.latitude);
                        if (latitudeValidation == false) {
                            /**
                             * LATITUDE INVALID
                             */
                            var successOrError = services.successOrErrors("err_52");
                            var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.latitude, successOrError.location);
                            return responseModel.failResponse(successOrError.fail_msg, [], resobj)
                        }

                        if (latitudeValidation == true) {
                            usersObject.latitude = req.body.latitude ? req.body.latitude : usersDetails.dataValues.latitude;
                        }
                    }
                    /**
                     * UPDATE LONGITUDE THEN CALL THIS CONDITION
                     */
                    if ((req.body.longitude != "" && typeof req.body.longitude != 'undefined')) {
                        var longitudeValidation = helpers.latLong(req.body.longitude)
                        if (longitudeValidation == false) {
                            /**
                             * LONGITUDE INVALID
                             */
                            var successOrError = services.successOrErrors("err_53");
                            var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.longitude, successOrError.location);
                            return responseModel.failResponse(successOrError.fail_msg, [], resobj)
                        }

                        if (longitudeValidation == true) {

                            usersObject.longitude = req.body.longitude ? req.body.longitude : usersDetails.dataValues.longitude;

                        }
                    }
                    if (flag == 0) {
                        /**
                         * IF UPDATE PROFILE IMAGE THEN CALL THIS CONDITION 
                         */
                        if (req.files != null && req.files != undefined) {
                            var bytes = (req.files.profile.size / 1048576).toFixed(2)
                            if (bytes >= 5) {
                                /**
                                 * INVALID PROFILE PICTURE MAXIMUM FILE SIZE IS 5 MB
                                 */
                                var successOrError = services.successOrErrors("err_46");
                                var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.profile, successOrError.location);
                                return responseModel.failResponse(successOrError.fail_msg, [], resobj)
                            }
                            var image = await helpers.img(req)
                            var deleteImg = await helpers.destroyImg(usersDetails.dataValues.profile)
                            usersObject.profile = req.files.profile ? image : usersDetails.dataValues.profile;

                        }
                        usersObject.address = req.body.address ? req.body.address : usersDetails.dataValues.address;
                        usersObject.isNotification = req.body.isNotification == "0" || req.body.isNotification == "1" ? req.body.isNotification : usersDetails.dataValues.isNotification;

                        var isUserUpdated = await query.updateOne(usersCollection, userListQuery, usersObject);
                        if (isUserUpdated) {

                            /**
                             * SUCCESS RESPONSE
                             */
                            var usersDetails = await query.findOne(usersCollection, userListQuery);
                            var response = await responseObject.usersObjectRes(usersDetails)
                            var successOrError = services.successOrErrors("success_message");
                            return responseModel.successResponse(successOrError.update, [response], []);

                        } else {
                            /**
                             * SOME THING WENT WRONG WHIL UPDATE USER
                             */
                            var successOrError = services.successOrErrors("err_29");
                            var resobj = responseModel.resObj(successOrError.message, successOrError.location);
                            return responseModel.failResponse(successOrError.fail_msg, [], resobj);

                        }
                    }

                } else {
                    /**
                     * INVALID USER ID (PARAMS)
                     */
                    var successOrError = services.successOrErrors("err_19");
                    var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.user_id, successOrError.location);
                    return responseModel.failResponse(successOrError.fail_msg, [], resobj);

                }

            } else {
                /**
                 * INVALID USER ID
                 */
                var successOrError = services.successOrErrors("err_32");
                var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.userId, successOrError.location);
                return responseModel.failResponse(successOrError.fail_msg, [], resobj);

            }
        } else {
            /**
             * INVALID USER ID
             */
            var successOrError = services.successOrErrors("err_32");
            var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.userId, successOrError.location);
            return responseModel.failResponse(successOrError.fail_msg, [], resobj);

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