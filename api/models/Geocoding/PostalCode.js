/**
 * Geocoding/PostalCode.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  identity: 'geocoding/postalcode',
  attributes: {
    locality: {
      model: 'geocoding/locality'
    },
    number: {
      type: 'string',
      size: 20,
      unique: true
    }
  }
};

