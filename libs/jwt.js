const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode")
const db = require("../schema/db");
const users = db.users;
const admins = db.admin;

/**
 * verify user authentication token function
 */
const verifyTokenUser = async(req, res, next) => {
    const bearer_token =
        req.body.bearer_token || req.query.bearer_token || req.headers["authorization"];
    if (!bearer_token) {
        return res.status(400).send("Unauthorized");
    }
    try {
        var token = bearer_token.replace(/Bearer /g, '');
        await jwt.verify(token, process.env.secretKey, async function(err, decoded) {
            if (err) {
                return res.status(400).send("Unauthorized");
            } else {
                var decoded = jwt_decode(token);
                var user_exist = await users.findOne({ where: { id: decoded.userId } });
                if (user_exist == null) {
                    return res.status(400).send("Unauthorized");
                } else {
                    return next();
                }
            }
        });
    } catch (err) {
        return res.status(400).send("Unauthorized");
    }
};

/**
 * verify admin authentication token function
 */
const verifyTokenAdmin = async(req, res, next) => {
    const bearer_token =
        req.body.bearer_token || req.query.bearer_token || req.headers["authorization"];
    if (!bearer_token) {
        return res.status(400).send("Unauthorized");
    }
    try {
        var token = bearer_token.replace(/Bearer /g, '');
        await jwt.verify(token, process.env.JWTSECRETKEY, async function(err, decoded) {
            if (err) {
                return res.status(400).send("Unauthorized");
            } else {
                var decoded = jwt_decode(token);
                var user_exist = await admins.findOne({ where: { id: decoded.id } });
                if (user_exist == null) {
                    return res.status(400).send("Unauthorized");
                } else {
                    return next();
                }
            }
        });
    } catch (err) {
        return res.status(400).send("Unauthorized");
    }
};

/**
 * verify both(user , admin) authentication token function
 */
const verifyToken = async(req, res, next) => {
    const bearer_token =
        req.body.bearer_token || req.query.bearer_token || req.headers["authorization"];
    if (!bearer_token) {
        return res.status(400).send("Unauthorized");
    }
    try {
        var token = bearer_token.replace(/Bearer /g, '');
        await jwt.verify(token, process.env.JWTSECRETKEY, async function(err, decoded) {
            if (err) {
                return res.status(400).send("Unauthorized");
            } else {
                var decoded = jwt_decode(token);
                var user_exist = await users.findOne({ where: { id: decoded.id } });
                var admin_exist = await admins.findOne({ where: { id: decoded.id } });
                if (user_exist != null || admin_exist != null) {
                    return next();
                } else {
                    return res.status(400).send("Unauthorized");
                }
            }
        });
    } catch (err) {
        return res.status(400).send("Unauthorized");
    }
};


module.exports = {
    verifyTokenUser,
    verifyTokenAdmin,
    verifyToken
};