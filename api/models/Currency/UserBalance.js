/**
 * Currency/UserBalance.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  identity: 'currency/userbalance',
  attributes: {
    owner: {
      model: 'users/user'
    },
    amount: {
      type: 'float'
    },
    currency: {
      model: 'currency/currency'
    }
  }
};

