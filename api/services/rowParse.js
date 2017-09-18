const _ = require('lodash');
const Promise = require('bluebird');
module.exports = {
    rowRequest: function (req, res, next) {
        var projectId;
        var rowId;
        const Project = sails.models['projects/project'];
        if (req.method.toUpperCase() == 'POST') {
            if (!req.session.user) return next('Authentication required');
            var url = req.url.replace('/row', '');
            projectId = url.split('/').pop();
        } else if (req.method.toUpperCase() == 'PUT') {
            if (!req.session.user) return next('Authentication required');
            rowId = req.url.split('/').pop();
            projectId = req.url.split('/')[req.url.split('/').length - 3];
        } else if (req.method.toUpperCase() == 'GET') {
            rowId = req.url.split('/').pop();
            if (rowId == 'row') {
                projectId = req.url.split('/')[req.url.split('/').length - 2];
            } else {
                projectId = req.url.split('/')[req.url.split('/').length - 3];
            }
        }
        if (!Number.isInteger(parseInt(projectId))) return next('Wrong request');
        Project.findOne({ id: projectId }).then(found => {
            if (!found) {
                throw 'Wrong request';
            }
            switch (req.method.toUpperCase()) {
                case 'POST':
                    if (found.owner != req.session.user.id) {
                        throw 'Wrong onwer';
                    }
                    if (!found.investmentType) {
                        throw 'Investment type should be set';
                    }
                    return rowParse.createRow(found, req.body);
                case 'PUT':
                    if (found.owner != req.session.user.id) {
                        throw 'Wrong onwer';
                    }
                    return rowParse.updateRow(found, req.body, rowId);
                case 'GET':
                    if (Number.isInteger(parseInt(rowId))) {
                        return rowParse.getRow(found, rowId);
                    } else if (rowId == 'row') {
                        return rowParse.getAllRows(found);
                    } else {
                        throw 'Wrong request';
                    }
            }
        }).then(data => {
            return res.json(data);
        }).catch(err => {
            if (err == 'stop') {
                return;
            } else {
                return next(err);
            }
        })

    },
    getAllRows: function(project) {
        const Project = sails.models['projects/project'];
        return Project.findOne({id : project.id}).populate('rounds').then(data => {
            return Promise.map(data.rounds, round => {
                return rowParse.getRow(project, round.id);
            })
        })
    },
    getRow: function (project, rowId) {
        const Row = sails.models['projects/row'];
        const PIRound = sails.models['projects/piround'];
        const P2BRow = sails.models['projects/p2brow'];
        const CharityRow = sails.models['projects/charityrow'];
        var foundRow;
        return Row.findOne({ id: rowId }).then(found => {
            if (!found) throw 'Wrong request';
            if (found.project != project.id) throw 'Wrong request';
            return found;
        })
    },
    updateRow: function (project, row, rowId) {
        const Row = sails.models['projects/row'];
        var updatedRow;
        return Row.findOne({ id: rowId }).then(found => {
            if (!found) throw 'Wrong request';
            return Row.update({ id: rowId }, { name: row.name, description: row.description, lotCount: row.lotCount, lotNotional: row.lotNotional, IATDays: row.IATDays,
                                symbol: row.symbol, tokenName: row.tokenName, decimals: row.decimals });
        })
    },
    createRow: function (project, row) {
        switch (project.investmentType) {
            case 'ICO':
                return rowParse.ICORowCreate(project, row);
            default:
                throw 'Wrong request';
        }
    },
    ICORowCreate: function(project, row) {
        const Row = sails.models['projects/row'];
        return Row.findOrCreate({project: project.id}).then(foundOrCreated => {
            if (foundOrCreated instanceof Array) foundOrCreated = foundOrCreated[0];
            return rowParse.updateRow(project, row, foundOrCreated.id);
        })
    },
}