function Response() {
    this.code = 200;
    this.success = true;
    this.message = "";
    this.data = [];
    this.err = [];

}

/**
 * get response function
 */
function ResponseGet() {
    this.code = 200;
    this.success = true;
    this.message = "";
    this.data = {};
    this.err = {};
    this.pagination = {};
}

/**
 * success get response with pagination
 * @param {string} message 
 * @param {array} payload 
 * @param {array} err 
 * @param {object} pagination 
 * @returns object
 */
function successGetResponse(message, payload, err, pagination) {
    let response = new ResponseGet();
    response.code = 200;
    response.success = true;
    response.message = message;
    response.data = payload;
    response.err = err;
    response.pagination = pagination
    return response;

}

/**
 * success create response
 * @param {string} message 
 * @param {array} payload 
 * @param {array} err 
 * @returns object
 */
function successCreateResponse(message, payload, err) {
    let res = new Response();
    res.code = 201;
    res.success = true;
    res.message = message;
    res.data = payload;
    res.err = err;
    return res;
}

/**
 * success response 
 * @param {string} message 
 * @param {array} payload 
 * @param {array} err 
 * @returns object
 */
function successResponse(message, payload, err) {
    let res = new Response();
    res.code = 200;
    res.success = true;
    res.message = message;
    res.data = payload;
    res.err = err
    return res;
}

/**
 * error response 
 * @param {string} message 
 * @param {array} payload 
 * @param {array} err 
 * @returns object
 */
function failResponse(message, payload, err) {
    let res = new Response();
    res.code = 400;
    res.success = false;
    res.message = message;
    res.data = payload;
    res.err = err;
    return res;
}

function resObj(message, param, location) {
    let resObj = [{
        "value": "",
        "msg": message,
        "param": param,
        "location": location
    }];

    return resObj;
}

module.exports = {
    successResponse,
    failResponse,
    successCreateResponse,
    successGetResponse,
    resObj
}