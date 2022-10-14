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
const services = require('../../services/responseService');

/**
 * FIND BY USER ID FUNCTION
 * @param {Object} req 
 * @returns Object
 */
module.exports.findById = async(req) => {
    try {

        if (req.params.id != "" && typeof req.params.id != 'undefined') {

            var decrypt_Data = await query.decryptData(req.params.id)

            /**
             * IF USER IS IS VALID THEN CALL THIS CONDITION 
             */
            if (decrypt_Data != false) {

                var userListQuery = { id: decrypt_Data }
                var usersDetails = await query.findOne(usersCollection, userListQuery);

                if (usersDetails != null) {

                    /**
                     * SUCCESS RESPONSE
                     */
                    var response = await responseObject.usersObjectRes(usersDetails)
                    var successOrError = services.successOrErrors("success_message");
                    return responseModel.successGetResponse(successOrError.get, [response], []);

                } else {

                    /**
                     * USER NOT FOUND 
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