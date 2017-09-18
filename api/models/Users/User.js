/**
 * Users/User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt');

module.exports = {
  identity: 'users/user',
  attributes: {
    email: {
      type: 'string',
      size: 255
    },
    emailVerified: {
      type: 'boolean',
      defaultsTo: false
    },
    password: {
      type: 'string',
      size: 255
    },
    toJSON: function(){
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },
  beforeCreate: function(data, cb) {
    if (data && data.password) {
      bcrypt.hash(data.password, 10).then(hash => {
        data.password = hash;
        cb();
      }).catch(err => {
        cb(err);
      })
    } else {
      cb();
    }
  }
};

