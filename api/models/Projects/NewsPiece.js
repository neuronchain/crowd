/**
 * Projects/NewsPiece.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  identity: 'projects/newspiece',
  attributes: {
    project: {
      model: 'projects/project'
    },
    name: {
      type: 'string'
    },
    cover: {
      type: 'string'
    },
    description: {
      type: 'longtext'
    },
    video: {
      type: 'string'
    }
  }
};

