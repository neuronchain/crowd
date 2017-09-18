/**
 * Projects/ProjectCurrency.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  identity: 'projects/projectcurrency',
  attributes: {
    project: {
      model: 'projects/project',
    },
    currency: {
      model: 'currency/currency'
    },
    isMain: {
      type: 'boolean'
    }
  }
};

