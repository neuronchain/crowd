module.exports = (req, res, next) => {
    if (req.body && req.body.birthPlace) {
        geocoding.parseLocality(req.body.birthPlace).then(data => {
            req.body.birthPlace = data;
            return next();
        }).catch(err => {
            errorWrapper.sendError(err, res);
        })
    } else if (req.body && req.body.registrationAddr) {
        geocoding.parseAddress(req.body.registrationAddr).then(data => {
            req.body.registrationAddr = data;
            return next();
        }).catch(err => {
            errorWrapper.sendError(err, res);
        })
    }  else if (req.body && req.body.actualAddr) {
        geocoding.parseAddress(req.body.actualAddr).then(data => {
            req.body.actualAddr = data;
            return next();
        }).catch(err => {
            errorWrapper.sendError(err, res);
        })
    } else if (req.body && req.body.legalAddr) {
        geocoding.parseAddress(req.body.legalAddr).then(data => {
            req.body.legalAddr = data;
            return next();
        }).catch(err => {
            errorWrapper.sendError(err, res);
        })
    } else if (req.body && req.body.locality) {
        geocoding.parseLocality(req.body.locality).then(data => {
            req.body.locality = data;
            return next();
        }).catch(err => {
            errorWrapper.sendError(err, res);
        })
    }
    else {
        return next();
    }
}