var bcrypt = require('bcrypt');

module.exports = (req, res, next) => {
    const User = sails.models['users/user'];
    var credentials = req.body || req.query;
    if (req.session.user) {
        return errorWrapper.sendAlreadyAuthenticated(res);
    }
    if (!credentials.password || !credentials.email) {
        return errorWrapper.sendNotAllFieldsAreFilled(res);
    }
    var user;
    User.findOne({ email: credentials.email }).then(found => {
        if (!found) return errorWrapper.sendAuthFail(res);
        user = found;
        return bcrypt.compare(credentials.password, found.password);
    }).then(result => {
        if (result) {
            req.session.user = user;
            return res.json(user);
        } else {
            return errorWrapper.sendAuthFail(res);
        }
    }).catch(err => {
        return next(err);
    })
}