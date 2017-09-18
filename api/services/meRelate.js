module.exports = (req, res, next) => {
    const literalRegExp = new RegExp('/me(/|$|\\?)', 'g');

    var urlBeforeRewrite = req.url;
    var rewriteUrl = urlBeforeRewrite.replace(literalRegExp, '');
    if (urlBeforeRewrite != rewriteUrl && req.session.user && req.session.user.id) {
        if (urlBeforeRewrite.indexOf('/users/user/') != -1) {
            req.url = urlBeforeRewrite.replace(literalRegExp, '/' + req.session.user.id);
            return next();
        } else if (urlBeforeRewrite.indexOf('projects/project') != -1){
            if (req.method == 'GET') {
                req.url = urlBeforeRewrite.replace(literalRegExp, '?where{"owner":' + req.session.user.id + '}');
                return next();
            } else {
                return errorWrapper.sendWrongRequest(res);
            }
        } else {
            return next();
        }
    } else {
        if (urlBeforeRewrite == rewriteUrl) next();
        else errorWrapper.sendNotAuthenticated(res);
    }
}