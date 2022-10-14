const path = require('path');
const constant = require('./constant')
var moment = require('moment')
var fs = require('fs')

/**
 * IMAGE UPLOAD FUNCTION
 */
function img(req) {
    let sampleFile;
    let uploadPath;
    if (!req.files || Object.keys(req.files).length === 0) {
        return false;
    }
    sampleFile = req.files.profile;
    if (path.extname(sampleFile.name) == '.jpg') {
        var img = (Date.now() + path.extname(sampleFile.name))
        uploadPath = './public/upload/profile/' + img;
        sampleFile.mv(uploadPath, function(err) {
            if (err) throw err
        });
        return (img)
    }
}

/**
 * CHECK STRONG PASSWORD VALIDATION FUNCTION
 * @param {STRING} inputtxt     
 * @returns BOOLEAN
 */
function checkPassword(inputtxt) {
    var passw = constant.passwordRegex;
    if (inputtxt.match(passw)) {
        return true;
    } else {
        return false;
    }
}

/**
 * PHONE NUBER VALIDATION FUNCTION
 * @param {number} phone 
 * @returns BOOLEAN
 */
function checkPhone(phone) {
    var phoneNo = constant.phoneRegex
    if (phone.match(phoneNo)) {
        return true;
    } else {
        return false;
    }
}

/**
 * CHECK EMAIL VALIDATION FUCNTION 
 * @param {STRING} email 
 * @returns BOOLEAN
 */
function validateEmail(email) {
    var re = constant.emailRegex;
    return re.test(email);
}

/**
 * Date validation function
 * @param {String} str 
 * @returns Boolean
 */
function parseDate(str) {
    var m = str.match(constant.dateRegex);
    return (m) ? true : false;
}

/**
 * COUNTRY CODE VALIDATION FUNCTION
 */
function countryCodeValidation(country) {
    var codeRegex = country.match(constant.countryCodeRegex)
    return (codeRegex) ? true : false;
}
/**
 * FIRST NAME VALIDATION FUNCTION
 */
function firstNamevalidation(fsName) {
    var ValidationFsName = fsName.match(constant.firstName)
    return (ValidationFsName) ? true : false;
}

async function getAge(dateString) {
    return new Promise(resolve => {

        var Birthday = moment(dateString, 'YYYY-DD-MM')
        var DOB = Birthday.format('YYYY-DD-MM')

        var split = DOB.split('-');

        var year = parseInt(split[0]);
        var month = parseInt(split[2]);
        var day = parseInt(split[1]);
        var today = new Date();
        var age = today.getFullYear() - year;
        if (today.getMonth() + 1 < month || (today.getMonth() + 1 == month && today.getDate() < day) && age != 18) {
            age--;
        }

        return resolve(age)
    });
}

function latLong(latlong) {
    var latlongitude = latlong.match(constant.latLongitude)
    return latlongitude ? true : false;
}

function destroyImg(image) {
    var imageFullPathName = path.join('./public/upload/profile/', image);
    var dlt = true;
    fs.unlink(imageFullPathName, function(err) {
        if (err) {
            if (err.code != 'ENOENT') {
                dlt = false
            }
        }
    });
}

module.exports = {
    img,
    checkPassword,
    checkPhone,
    validateEmail,
    parseDate,
    countryCodeValidation,
    firstNamevalidation,
    getAge,
    latLong,
    destroyImg
}