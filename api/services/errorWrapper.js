module.exports = {
    sendError: (error, res) => {
        switch(err){
            case 'NOT_ALL_FIELDS_ARE_FILLED':
                errorWrapper.sendNotAllFieldsAreFilled(res);
                break;
            case 'WRONG_REQUEST_DATA':
                errorWrapper.sendWrongRequestData(res);
                break;
            case 'INTERNAL_ERROR':
                errorWrapper.sendInternalError(res);
                break;
            case 'MODEL_NOT_FOUND':
                errorWrapper.sendModelNotFound(res);
                break;
            default:
                errorWrapper.sendError(res);
                break;
        }
    },
    default: (res, err) => {
        res.status(500);
        return res.send(err);
    },
    sendAlreadyAuthenticated: function(res) {
        res.status(400);
        return res.send('ALREADY_AUTHENTICATED');
    },
    sendNotAllFieldsAreFilled: function(res) {
        res.status(400);
        return res.send('NOT_ALL_FIELDS_ARE_FILLED');
    },
    sendAuthFail: function(res) {
        res.status(400);
        return res.send('AUTH_FAILED');
    },
    sendNotAuthenticated: function(res) {
        res.status(401);
        return res.send('NOT_AUTHENTICATED');
    },
    sendModelNotFound: function(res) {
        res.status(404);
        return res.send('MODEL_NOT_FOUND');
    },
    sendWrongOwner: function(res) {
        res.status(403);
        return res.send('WRONG_OWNER');
    },
    sendWrongRequest: function(res) {
        res.status(404);
        return res.send('WRONG_REQUEST');
    },
    sendWrongRequestData: function(res) {
        res.status(400);
        return res.send('WRONG_REQUEST_DATA');
    },
    sendInternalError: function(res) {
        res.status(500);
        return res.send('INTERNAL_ERROR');
    }
}