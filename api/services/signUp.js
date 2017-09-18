module.exports = (req, res, next) => {
    const User = sails.models['users/user'];
    var user = req.body || req.query;
    if (req.session.user) {
        return next('Already registered');
    }
    if (!(req.session.phoneValidationInfo || {}).complete) {
        return next('Phone is not validated');
    }
    user.phoneNumber = req.session.phoneValidationInfo.phone;
    if (!user.email || !user.password || !user.passwordRepeat || !user.acceptedAgreement) {
        return next('Not all required fields');
    }
    if (user.password != user.passwordRepeat) {
        return next('Passwords doesnt match');   
    }
    delete user.passwordRepeat;
    User.create(user).then(created => {
        req.session.user = created;
        return res.send(created);
    }).catch(err => {
        return next(err);
    })
}