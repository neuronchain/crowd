'use strict';

var fs = require('fs');
var uuidv4 = require('uuid/v4');
var path = require('path');

module.exports = function (req, res, next) {
    var uuid = uuidv4();
    var uploadedFileName = '';
    var originalName = '';
    var dirPath = 'storage/' + uuid.slice(0, 2) + '/' + uuid.slice(2, 8);

    req.file('file').upload({
        dirname: path.resolve(sails.config.appPath, dirPath),
    }, function (err, uploadedFiles) {
        if (err) return next(err);
        if (uploadedFiles.length > 0) {
            return res.json({
                uploaded: dirPath + '/' + uploadedFiles[0].fd.split('/').pop()
            })
        } else {
            return next('Wrong request');
        }
    })
}