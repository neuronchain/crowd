/**
 * Currency/Currency.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  identity: 'currency/currency',
  attributes: {
    name: {
      type: 'string',
      size: 20,
      unique: true
    },
    shortName: {
      type: 'string',
      size: 5,
      unique: true
    },
    isCrypto: {
      type: 'boolean'
    },
    projects: {
      collection: 'projects/projectcurrency',
      via: 'currency'
    }
  }
};

