const CODE_EXPIRATION = 150000;

function validatePhone(p) {
    if (p.length > 31) return false;
    if (p.length < 10) return false;
    return true;
}

function generateCode() {
    return Math.floor((Math.random() + 1)*10000).toString().substr(1);
}


module.exports = (req, res, next) => {
    var params = req.body || req.query || {};
    if (!req.session.phoneValidationInfo) req.session.phoneValidationInfo = {};
    if (req.session.phoneValidationInfo.complete) {
        return next('Phone already validated');
    }
    var now = new Date();
    var phone = params.phone || "";
    var code = params.code;
    if (req.session.phoneValidationInfo.codeExpiration != null && req.session.phoneValidationInfo.codeExpiration > now.getTime()) {
        if (phone != req.session.phoneValidationInfo.phone) {
            return next('Wrong phone');
        }
        if (code != req.session.phoneValidationInfo.code) {
            return next('Wrong code');
        }
        req.session.phoneValidationInfo.complete = true;
        delete req.session.phoneValidationInfo.code;
        delete req.session.phoneValidationInfo.codeExpiration;
        return res.send(req.session.phoneValidationInfo);
    } else {
        if (code != null) {
            return next('Wrong code');
        }
        if (validatePhone(phone)) {
            req.session.phoneValidationInfo.code = generateCode();
            req.session.phoneValidationInfo.codeExpiration = now.getTime() + CODE_EXPIRATION;
            req.session.phoneValidationInfo.phone = phone;
            //TODO: sms send service
            return res.send({
                code: req.session.phoneValidationInfo.code
            })
        } else {
            return next('Wrong phone'); 
        }

    }

}