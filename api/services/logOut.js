module.exports = (req, res, next) => {
    if (!req.session.user) {
        return errorWrapper.sendNotAuthenticated(res);
    }
    delete req.session.user;
    return res.ok();
}