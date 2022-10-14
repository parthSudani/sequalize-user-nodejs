/**
 * DATABASE
 */
const db = require("../../schema/db");
const usersCollection = db.users;
const Op = db.Sequelize.Op;


/**
 * HELPERS
 */
const { query } = require('../../query')
const { responseModel } = require('../../models');
const responseObject = require('../../helpers/responseObject')
const services = require('../../services/responseService')

/**
 * FIND USERS LIST FUNCATION
 * @param {Object} req 
 * @returns Object
 */
module.exports.findAll = async(req) => {
    try {

        /**
         * PARAMS LIMIT 
         */
        var limit = req.query.limit;
        if (!limit || limit == 0) {

            limit = 10;

        } else {

            limit = parseInt(req.query.limit)

        }
        /**
         * PARAMS PAGE VALIDATION
         */
        var page = req.query.page;
        if (!page || page == 0) {

            page = 1

        } else {

            page = parseInt(req.query.page)

        }
        const offset = (page - 1) * limit
        var search = {};
        // $or: [{
        //         FirstName: {
        //             $eq: "John"
        //         }
        //     },
        //     {
        //         FirstName: {
        //             $eq: "Jane"
        //         }
        //     },
        //     {
        //         Age: {
        //             $gt: 18
        //         }
        //     }
        // ]
        if (req.query.search) {
            // where = { $regex: req.query.search, $options: 'i' }
            search = {
                [Op.or]: [{
                        email: {
                            [Op.like]: '%' + req.query.search + '%'
                        }
                    },
                    {
                        firstName: {
                            [Op.like]: '%' + req.query.search + '%'

                        }
                    },
                    {
                        username: {
                            [Op.like]: '%' + req.query.search + '%'

                        }
                    },
                    {
                        lastName: {
                            [Op.like]: '%' + req.query.search + '%'

                        },
                    },
                    {
                        phone: {
                            [Op.like]: '%' + req.query.search + '%'

                        },
                    }
                ]
            }

        }

        var sort = {}
        if (req.query.sort == -1 || req.query.sort == 1) {
            if (req.query.sort == -1) {
                sort = ['createdAt', 'DESC']
            }
            if (req.query.sort == 1) {
                sort = ['createdAt', 'ASC']

            }
        } else {
            sort = ['createdAt', 'ASC']
        }
        console.log("------------sorting", sort);

        var usersTotalList = await usersCollection.findAll({
            where: search,
            order: [sort],
            limit: limit,
            offset: offset,

        })
        if (usersTotalList[0] == null) {
            var successOrError = services.successOrErrors("err_00");
            var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.page, successOrError.location);
            return responseModel.failResponse(successOrError.fail_msg, [], resobj);
        } else {

            // var usersTotalList = await query.findSome(usersCollection, queryyy);
            var userList = await query.findSome(usersCollection, search);

            var TotalPage = Math.ceil(userList.length / limit)
            var dataArray = [];

            for (let i = 0; i < usersTotalList.length; i++) {

                var response = await responseObject.usersObjectRes(usersTotalList[i])
                dataArray.push(response)

            }
            var nextPage = 0;

            if (page < TotalPage) {

                nextPage++;

            } else {

                if (req.query.page == '0' || req.query.page == '' || page < TotalPage) {

                    nextPage++;

                } else {

                    nextPage = 0;

                }
            }
            var previous = 0;
            if (req.query.page <= TotalPage && req.query.page != '1' && req.query.page != '0' && req.query.page != '') {

                previous++;

            } else {

                previous = 0;

            }
            /**
             * PAGINATION FIELDS
             */
            pagination = {
                "previous_page": previous,
                "current_page": page,
                "next_page": nextPage,
                "total_count": userList.length,
                "per_page": usersTotalList.length,
                "total_page": TotalPage
            }

            if (TotalPage < req.query.page) {
                /**
                 * USERS DETAILS NOT FOUND
                 */
                var successOrError = services.successOrErrors("err_00");
                var resobj = responseModel.resObj(successOrError.message, successOrError.parameters.page, successOrError.location);
                return responseModel.failResponse(successOrError.fail_msg, [], resobj);

            } else if (usersTotalList.length > 0) {
                /**
                 * SUCCESS RESPONSE
                 */
                var successOrError = services.successOrErrors("success_message");
                return responseModel.successGetResponse(successOrError.getall, dataArray, [], pagination);

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