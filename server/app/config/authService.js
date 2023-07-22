/**
 * Module dependencies.
 */
const jwt = require('jsonwebtoken');
const config = require('./db.config');
/**
 * Global variable.
 */
const auth = {};

/**
 * Jwt token generate.
 */
auth.generateToken = (userObj) => {
    // console.log(userObj);
    if (userObj.COMPANY_ID) {
        return jwt.sign({
            COMPANY_ID: userObj.COMPANY_ID,
            FULL_NAME: userObj.CONTACT_PERSON,
            EMAIL_ID: userObj.CONTACT_EMAIL,
            LOGIN_DT: userObj.CREATE_DT,
            CONTACT_NUMBER: userObj.CONTACT_NUMBER
        }, config.JWTSECRET.secret, { expiresIn: config.JWTSECRET.expireTime });
    } else if (userObj.AGENT_MASTER_ID) {
        return jwt.sign({
            AGENT_MASTER_ID: userObj.AGENT_MASTER_ID,
            FULL_NAME: userObj.FIRST_NAME + " " + userObj.LAST_NAME,
            EMAIL_ID: userObj.EMAIL_ID,
            CREATE_DT: userObj.CREATE_DT,
            CONTACT_NUMBER: userObj.CONTACT_NO
        }, config.JWTSECRET.secret, { expiresIn: config.JWTSECRET.expireTime });
    }
}

/**
 * Jwt token verify.
 */
auth.verifyAuthToken = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (typeof token !== 'undefined') {
            token = token.split(" ")[1]
            let decoded = jwt.verify(token, config.JWTSECRET.secret);
            req.user = decoded;
            next();
        } else {
            res.status(401).json({ msg: "Unauthorized request" });
        }
    } catch (error) {
        // if (error.message === 'jwt expired' || error.message === 'invalid signature') {
        // res.end(JSON.stringify({ "error": "X", msg: "Your session is expired" }));
        res.status(401).json({ msg: "Your session is expired" });
        // } else {
        // res.end(JSON.stringify({ "error": "X", msg: error.message }));
        // }
    }
}

module.exports = auth;