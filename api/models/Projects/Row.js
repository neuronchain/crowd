/**
 * Projects/Row.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  identity: 'projects/row',
  attributes: {
    project: {
      model: 'projects/project'
    },
    name: {
      type: 'string',
      size: 85
    },
    description: {
      type: 'string',
      size: 255
    },
    lotCount: {
      type: 'integer',
    },
    lotNotional: {
      type: 'integer'
    },
    IATDays: {
      type: 'integer'
      // enum???
    },
    symbol: {
      type: 'string'
    },
    decimals: {
      type: 'integer'
    },
    tokenName: {
      type: 'string'
    }
  }
};

