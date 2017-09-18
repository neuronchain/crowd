/**
 * Geocoding/Country.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  identity: 'geocoding/country',
  attributes: {
    ISOAlpha2: {
      type: 'string',
      size: 2,
      unique: true
    },
    ISOAlpha3: {
      type: 'string',
      size: 3,
      unique: true
    },
    name: {
      type: 'string',
      size: 85,
      unique: true
    }
  }
};

