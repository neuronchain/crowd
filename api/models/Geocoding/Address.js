/**
 * Geocoding/Address.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  identity: 'geocoding/address',
  attributes: {
    locality: {
      model: 'geocoding/locality',
    },
    street: {
      type: 'string',
      size: 85
    },
    building: {
      type: 'string',
      size: 20
    },
    apartment: {
      type: 'string',
      size: 20
    },
    postalCode: {
      model: 'geocoding/postalcode'
    }
  }
};

