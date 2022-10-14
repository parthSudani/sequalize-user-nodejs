/**
 * DATABASE
 */
const db = require("../../schema/db");
const usersCollection = db.users;
const deviceCollection = db.device;
/**
 * HELPERS
 */
const { query } = require('../../query')
const { responseModel } = require('../../models');
const responseObject = require('../../helpers/responseObject')
const services = require('../../services/responseService');
const helpers = require('../../helpers/helpers')

/**
 * DELETE USER FUNCTION
 * @param {Object} req 
 * @returns Object
 */
module.exports.delete = async(req) => {
    try {
        if (req.params.id != "" && typeof req.params.id != 'undefined') {

            var decryptRes = await query.decryptData(req.params.id);

            if (decryptRes != false) {

                var userListQuery = { id: parseInt(decryptRes) }
                var usersDetails = await query.findOne(usersCollection, userListQuery);

                /**
                 * IF USER IS IS VALID THEN CALL THIS CONDITION 
                 */
                if (usersDetails != null) {

                    var isRemoved = await query.remove(usersCollection, userListQuery);
                    var removeDevice = await query.deleteMany(deviceCollection, { where: { userId: decryptRes } })
                    if (isRemoved == 1 && removeDevice != 0) {
                        var deleteImg = await helpers.destroyImg(usersDetails.dataValues.profile)

                        /**
                         * SUCCESS RESPONSE
                         */
                        var response = await responseObject.usersObjectRes(usersDetails)
                        var successOrError = services.successOrErrors("success_message");
                        return responseModel.successResponse(successOrError.delete, [response], []);

                    } else {

                        /**
                         * SOMETHING WENT WRONG WHILE REMOVE USER
                         */
                        var successOrError = services.successOrErrors("err_18");
                        var resobj = responseModel.resObj(successOrError.message, successOrError.location);
                        return responseModel.failResponse(successOrError.fail_msg, [], resobj);

                    }

                } else {

                    /**
                     * USER NOT FOUND 
                     */
                    var successOrError = services.successOrErrors("err_19");
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
         * CETCH ERROR
         */
        var successOrError = services.successOrErrors("ex_00");
        var resobj = responseModel.resObj(error.message, successOrError.parameters.noparams, successOrError.location);
        return responseModel.failResponse(successOrError.fail_msg, [], resobj);

    }
}