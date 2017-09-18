'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.insert('users/user',['email', 'emailVerified', 'password', 'id'],
    ['123@123.ru','true','$2a$10$7IUTvx0i3fHNdgZ0.1rzz.nMjccLQyDyD75G3OMn7Y6ckgrCcJ5Am','1'], function(){
      console.log('ok');
    });
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
