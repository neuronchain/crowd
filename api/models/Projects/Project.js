/**
 * Projects/Project.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  identity: 'projects/project',
  attributes: {
    owner: {
      model: 'users/user'
    },
    investmentType: {
      type: 'string',
      size: 3
      // enum???
    },
    stage: {
      type: 'string',
      size: 3
      // enum???
    },
    name: {
      type: 'string',
      size: 63
    },
    description: {
      type: 'string',
      size: 255
    },
    locality: {
      model: 'geocoding/locality'
    },
    website: {
      type: 'string',
      size: 63
    },
    lotAbbr: {
      type: 'string',
      size: 6,
      unique: true
    },
    businessStage: {
      type: 'string',
      size: 1
      // enum??? 
    },
    IATStarted: {
      type: 'datetime'
    },
    rounds: {
      collection: 'projects/row',
      via: 'project'
    },
    news: {
      collection: 'projects/newspiece',
      via: 'project'
    },
    currencies: {
      collection: 'projects/projectcurrency',
      via: 'project'
    },
    contractAddr: {
      type: 'string'
    }
  }
};

