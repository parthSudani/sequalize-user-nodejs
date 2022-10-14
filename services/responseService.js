function successOrErrors(key) {

    /**
     *error parameter
     */
    var parameters = {
        "noparams": "",
        "page": "page",
        "registerRequire": "loginType, latitude, timeZone, longitude",
        "email": "email",
        "googleId": "googleId",
        "facebookId": "facebookId",
        "appleId": "appleId",
        "username": "username",
        "password": "password",
        "confirmPassword": "password, confirmPassword",
        "date": "dateOfBirth",
        "userId": "user_id",
        "phone": "phone",
        "newPassword": "newPassword",
        "oldPassword": "oldPassword",
        "loginType0Require": "(email / phone, countryCode ), password, confirmPassword, ",
        "deviceRequire": " deviceType, deviceToken, deviceId  ",
        "confirmPassword": "confirmPassword",
        "loginType": "loginType",
        "loginRequire": "loginType, deviceType, deviceToken, deviceId, timeZone",
        "loginType0Login": "phone, countryCode / email, password",
        "loginType0": "phone / email",
        "countryCode": "countryCode",
        "deviceType": "deviceType",
        "firstName": "firstName",
        "lastName": "lastName",
        "profile": "profile",
        "latitude": "latitude",
        "longitude": "longitude"
    }

    /**
     * success message 
     */
    var successMessages = {
        "login": "Login Successfull",
        "register": "Registered Successfull",
        "update": "Updated Successfully",
        "delete": "Deleted Successfully",
        "get": "Fetched Single Successfully",
        "getall": "Get All Successfull",
        "logout": "Logout Successfull",
        "deleteImage": "Deleted User Image Successfully",
        "create": "Created Successfully",
        "AddChat": "Added to Chat Successfully",
        "passUser": "Passed the user",
        "unblock": "User has been Unblocked Successfully",
        "block": "User has been Blocked Sccessfully",
        "updatestats": "Update Suggestion Status Fetched Successfully",
        "unlike": "Unliked the User",
        "like": "Liked the User",

    }

    /**
     * error object
     */
    var obj = {
        "success_message": successMessages,
        "ex_00": {
            code: "ex_00",
            fail_msg: "Exception",
            message: "exception",
            parameters: parameters,
            location: "params"
        },
        "err_00": {
            code: "err_00",
            fail_msg: "NotFound",
            message: "users list not found",
            parameters: parameters,
            location: "params"
        },
        "err_01": {
            code: "err_01",
            fail_msg: "SomeThingWentWrong",
            message: "something went wrong while register user",
            parameters: parameters,
            location: "body"
        },
        "err_02": {
            code: "err_02",
            fail_msg: "InvalidDetails",
            message: "Please enter valid details",
            parameters: parameters,
            location: "body"
        },
        "err_03": {
            code: "err_03",
            fail_msg: "InvalidEmail",
            message: "Please enter valid email",
            parameters: parameters,
            location: "body"
        },
        "err_04": {
            code: "err_04",
            fail_msg: "EmailAlreadyExits",
            message: "email address already exits",
            parameters: parameters,
            location: "body"
        },
        "err_05": {
            code: "err_05",
            fail_msg: "GoogleIdAlreadyExits",
            message: "google id already exits",
            parameters: parameters,
            location: "body"
        },
        "err_06": {
            code: "err_06",
            fail_msg: "InvalidGoogleId",
            message: "Please enter valid google id",
            parameters: parameters,
            location: "body"
        },
        "err_07": {
            code: "err_07",
            fail_msg: "facebookIdAlreadyExits",
            message: "facebookid already exits",
            parameters: parameters,
            location: "body"
        },
        "err_08": {
            code: "err_08",
            fail_msg: "InvalidFacebookId",
            message: "Please enter valid facebook id",
            parameters: parameters,
            location: "body"
        },
        "err_09": {
            code: "err_09",
            fail_msg: "AppleIdAlreadyExits",
            message: "appleId already exits",
            parameters: parameters,
            location: "body"
        },
        "err_10": {
            code: "err_10",
            fail_msg: "InvalidAppleId",
            message: "Please enter valid apple id",
            parameters: parameters,
            location: "body"
        },
        "err_28": {
            code: "err_28",
            fail_msg: "UsernameAlreadyExits",
            message: "username already exits",
            parameters: parameters,
            location: "body"
        },
        "err_12": {
            code: "err_12",
            fail_msg: "InvalidPassword",
            message: "Password should be 8 characters long, including at least one upper case, at least one lower case, at least one special character and at least one digit",
            parameters: parameters,
            location: "body"
        },
        "err_13": {
            code: "err_13",
            fail_msg: "NotMatch",
            message: "the password and confirmation password do not match",
            parameters: parameters,
            location: "body"
        },
        "err_14": {
            code: "err_14",
            fail_msg: "InvalidPhoneNumber",
            message: "Please enter valid phone number",
            parameters: parameters,
            location: "body"
        },
        "err_15": {
            code: "err_15",
            fail_msg: "DateNotValid",
            message: "date format not valid, Please use yyyy-mm-dd format",
            parameters: parameters,
            location: "body"
        },
        "err_16": {
            code: "err_16",
            fail_msg: "NotRegister",
            message: "device not registered",
            parameters: parameters,
            location: "body"
        },
        "err_17": {
            code: "err_17",
            fail_msg: "NotRegister",
            message: "device not registered",
            parameters: parameters,
            location: "body"
        },
        "err_18": {
            code: "err_18",
            fail_msg: "ErrorWhileDeleteUser",
            message: "Something went wrong while deleting user",
            parameters: parameters,
            location: "body"
        },
        "err_19": {
            code: "err_19",
            fail_msg: "UserNotFound",
            message: "User details not found",
            parameters: parameters,
            location: "params"
        },
        "err_20": {
            code: "err_20",
            fail_msg: "IncorrectDetails",
            message: "Incorrect login credentials email ",
            parameters: parameters,
            location: "body"
        },
        "err_21": {
            code: "err_21",
            fail_msg: "InvalidDetails",
            message: "Please enter valid phone number / email ",
            parameters: parameters,
            location: "body"
        },
        "err_22": {
            code: "err_22",
            fail_msg: "IncorrectDetails",
            message: "Incorrect google id, Please enter register google id",
            parameters: parameters,
            location: "body"
        },
        "err_23": {
            code: "err_23",
            fail_msg: "InvalidDetails",
            message: "Please enter register googleId",
            parameters: parameters,
            location: "body"
        },
        "err_24": {
            code: "err_24",
            fail_msg: "IncorrectDetails",
            message: "Incorrect facebook id, Please enter register facebook id",
            parameters: parameters,
            location: "body"
        },
        "err_25": {
            code: "err_25",
            fail_msg: "IncorrectDetails",
            message: "Incorrect apple id, Please enter register apple id",
            parameters: parameters,
            location: "body"
        },
        "err_26": {
            code: "err_26",
            fail_msg: "IncorrectDetails",
            message: "Incorrect login credentials phone number",
            parameters: parameters,
            location: "body"
        },
        "err_27": {
            code: "err_27",
            fail_msg: "NotValid",
            message: "Please enter valid login details",
            parameters: parameters,
            location: "body"
        },
        "err_28": {
            code: "err_28",
            fail_msg: "AlreadyExits",
            message: "username already exists",
            parameters: parameters,
            location: "body"
        },
        "err_29": {
            code: "err_29",
            fail_msg: "SomethingWrong",
            message: "something went wrong while update",
            parameters: parameters,
            location: "body"
        },
        "err_30": {
            code: "err_30",
            fail_msg: "SomethingWrong",
            message: "something went wrong while find by id",
            parameters: parameters,
            location: "params"
        },
        "err_31": {
            code: "err_31",
            fail_msg: "SomethingWrong",
            message: "something went wrong while login user",
            parameters: parameters,
            location: "params"
        },
        "err_32": {
            code: "err_32",
            fail_msg: "invalidUserId",
            message: "Please enter valid user id",
            parameters: parameters,
            location: "params"
        },
        "err_33": {
            code: "err_33",
            fail_msg: "NotMatch",
            message: "old password was not match",
            parameters: parameters,
            location: "body"
        },
        "err_34": {
            code: "err_34",
            fail_msg: "InvalidDetails",
            message: "Please enter a New password",
            parameters: parameters,
            location: "body"
        },
        "err_35": {
            code: "err_35",
            fail_msg: "InvalidDetails",
            message: "Please enter require field",
            parameters: parameters,
            location: "body"
        },
        "err_36": {
            code: "err_36",
            fail_msg: "InvalidDetails",
            message: "Please enter device require details",
            parameters: parameters,
            location: "body"
        },
        "err_37": {
            code: "err_37",
            fail_msg: "InvalidDetails",
            message: "Please enter confirm new password",
            parameters: parameters,
            location: "body"
        },
        "err_38": {
            code: "err_38",
            fail_msg: "InvalidDetails",
            message: "Invalid login type, only avaliable 0, 1, 2 and 3",
            parameters: parameters,
            location: "body"
        },
        "err_39": {
            code: "err_39",
            fail_msg: "InvalidDetails",
            message: "require email / phone while login type 0",
            parameters: parameters,
            location: "body"
        },
        "err_40": {
            code: "err_40",
            fail_msg: "InvalidDetails",
            message: "Please enter valid country code",
            parameters: parameters,
            location: "body"
        },
        "err_41": {
            code: "err_41",
            fail_msg: "InvalidDetails",
            message: "Phone number already exits",
            parameters: parameters,
            location: "body"
        },
        "err_42": {
            code: "err_42",
            fail_msg: "InvalidDetails",
            message: "Invalid device type, Allow( 'A'/'I')",
            parameters: parameters,
            location: "body"
        },
        "err_43": {
            code: "err_43",
            fail_msg: "InvalidDetails",
            message: "Invalid first name, allowed only letters, 0-9, space, _, ', (), dot and comma",
            parameters: parameters,
            location: "body"
        },
        "err_44": {
            code: "err_44",
            fail_msg: "InvalidDetails",
            message: "Invalid last name, allowed only letters, 0-9, space, _, ', (), dot and comma",
            parameters: parameters,
            location: "body"
        },
        "err_45": {
            code: "err_45",
            fail_msg: "InvalidDetails",
            message: "You must be at least 18 years old!",
            parameters: parameters,
            location: "body"
        },
        "err_46": {
            code: "err_46",
            fail_msg: "InvalidDetails",
            message: "Profile picture not valid, picture maximum size require 5mb",
            parameters: parameters,
            location: "body"
        },
        "err_47": {
            code: "err_47",
            fail_msg: "InvalidDetails",
            message: "Invalid latitude / longitude",
            parameters: parameters,
            location: "body"
        },
        "err_48": {
            code: "err_48",
            fail_msg: "InvalidDetails",
            message: "Invalid username, allowed only letters, 0-9, space, _, ', (), dot and comma",
            parameters: parameters,
            location: "body"
        },
        "err_49": {
            code: "err_49",
            fail_msg: "IncorrectDetails",
            message: "Incorrect password, Please try again",
            parameters: parameters,
            location: "body"
        },
        "err_50": {
            code: "err_49",
            fail_msg: "InvalidDetails",
            message: "Please enter register facebook id",
            parameters: parameters,
            location: "body"
        },
        "err_51": {
            code: "err_51",
            fail_msg: "InvalidDetails",
            message: "Please enter register apple id",
            parameters: parameters,
            location: "body"
        },
        "err_52": {
            code: "err_52",
            fail_msg: "InvalidDetails",
            message: "Please enter valid latitude",
            parameters: parameters,
            location: "body"
        },
        "err_53": {
            code: "err_53",
            fail_msg: "InvalidDetails",
            message: "Please enter valid longitude",
            parameters: parameters,
            location: "body"
        },
        "err_54": {
            code: "err_54",
            fail_msg: "InvalidDetails",
            message: "Please enter valid date of birth(YYYY-DD-MM)",
            parameters: parameters,
            location: "body"
        },
    }
    return obj[key]
}

module.exports = {
    successOrErrors
}