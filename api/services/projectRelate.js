module.exports = (req, res, next) => {
    if (req.url.indexOf('/projects/project') != -1) {
        if (req.url.indexOf('/newspiece') != -1) {
            const NewsPiece = sails.models['projects/newspiece'];
            const Project = sails.models['projects/project'];
            if (req.method.toUpperCase() == 'POST') {
                if (!req.session.user) return next('Authorization required');
                var url = req.url.replace('/newspiece', '');
                var projectId = url.split('/').pop();
                Project.findOne({ id: projectId }).then(found => {
                    if (!found) throw 'Wrong request';
                    if (found.owner != req.session.user.id) throw 'Wrong owner';
                    if (!req.body.name) throw 'Name must be set';
                    return NewsPiece.create({ project: found.id, name: req.body.name, cover: req.body.cover, description: req.body.description, video: req.body.video });
                }).then(created => {
                    return res.json(created);
                }).catch(err => {
                    return next(err);
                })
            } else if (req.method.toUpperCase() == 'PUT') {
                if (!req.session.user) return next('Authorization required');
                var newsId = req.url.split('/').pop();
                var projectId = req.url.split('/')[req.url.split('/').length - 3];
                var foundProject;
                Project.findOne({ id: projectId }).then(found => {
                    if (!found) throw 'Wrong request';
                    if (found.owner != req.session.user.id) throw 'Wrong owner';
                    if (!req.body.name) throw 'Name must be set';
                    foundProject = found;
                    return NewsPiece.findOne({ id: newsId });
                }).then(found => {
                    if (!found) throw 'Wrong request';
                    if (found.project != foundProject.id) throw 'Wrong request';
                    if (found.name == null) throw 'Wrong request';
                    return NewsPiece.update({ id: found.id }, { name: req.body.name, cover: req.body.cover, description: req.body.description, video: req.body.video })
                }).then(updated => {
                    return res.json(updated[0]);
                }).catch(err => {
                    return next(err);
                })
            } else if (req.method.toUpperCase() == 'GET') {
                var newsId = req.url.split('/').pop();
                var projectId = req.url.split('/')[req.url.split('/').length - 3];
                var foundProject;
                Project.findOne({ id: projectId }).then(found => {
                    if (!found) throw 'Wrong request';
                    foundProject = found;
                    return NewsPiece.findOne({ id: newsId });
                }).then(found => {
                    if (!found) throw 'Wrong request';
                    if (found.project != foundProject.id) throw 'Wrong request';
                    return res.json(found);
                }).catch(err => {
                    return next(err);
                })
            } else {
                return next('Wrong request');
            }
        } else if (req.url.indexOf('/row') != - 1) {
            rowParse.rowRequest(req, res, next);
        } else if (req.url.indexOf('/presentation') != -1) {
            if (req.method.toUpperCase() == "POST" || req.method.toUpperCase() == "PUT") {
                if (req.body.name && req.body.name != null) return next('Name for presentation should be null');
                const NewsPiece = sails.models['projects/newspiece'];
                const Project = sails.models['projects/project'];
                if (!req.session.user) return next('Not Authorized');
                var url = req.url.replace('/presentation', '');
                var projectId = url.split('/').pop();
                Project.findOne({ id: projectId }).then(found => {
                    if (!found) return next('Wrong request');
                    if (found.owner != req.session.user.id) return next('Wrong owner');
                    return NewsPiece.findOrCreate({ project: found.id, name: null });
                }).then(foundOrCreated => {
                    if (foundOrCreated instanceof Array) foundOrCreated = foundOrCreated[0];
                    req.url = '/projects/newspiece/' + foundOrCreated.id;
                    return next();
                }).catch(err => {
                    return next(err);
                })
            } else if (req.method.toUpperCase() == "GET") {
                var url = req.url.replace('/presentation', '');
                var projectId = url.split('/').pop();
                const NewsPiece = sails.models['projects/newspiece'];
                NewsPiece.findOne({ project: projectId, name: null }).then(found => {
                    if (!found) return next('No presentation');
                    req.url = '/projects/newspiece/' + found.id;
                    return next();
                }).catch(err => {
                    return next(err);
                })
            }
        } else if (req.url.indexOf('/deploy') != -1) {
            if (req.method.toUpperCase() == "POST") {
                const Project = sails.models['projects/project'];
                if (!req.session.user) return next('Not Authorized');
                var url = req.url.replace('/deploy', '');
                var projectId = url.split('/').pop();
                Project.findOne({ id: projectId }).then(found => {
                    if (!found) return next('Wrong request');
                    if (found.owner != req.session.user.id) return next('Wrong owner');
                    return deployProject.checkProject(projectId);
                }).then(data => {
                    return deployProject.contractDeploy(data.project, data.row);
                }).then(data => {
                    return res.json(data);
                }).catch(err => {
                    return next(err);
                })
            } else {
                return next('Wrong request');
            }
        } else {
            if (req.method.toUpperCase() == "POST") {
                if (!req.session.user) return errorWrapper.sendNotAuthenticated(res);
                req.body.owner = req.session.user.id;
                req.body.investmentType = 'ICO';
                return next();
            } else if (req.method.toUpperCase() == "PUT" || req.method.toUpperCase() == "PATCH") {
                if (!req.session.user) return errorWrapper.sendNotAuthenticated(res);
                req.method = "PUT";
                const Project = sails.models['projects/project'];
                var projectId = req.url.split('/').pop();
                Project.findOne({ id: projectId }).then(found => {
                    if (!found) return errorWrapper.sendModelNotFound(res);
                    if (found.owner != req.session.user.id) return errorWrapper.sendWrongOwner(res);
                    return next();
                })
            } else {
                return next();
            }
        }
    } else {
        return next();
    }
}