/**
 * Users/UserDocumentController
 *
 * @description :: Server-side logic for managing users/userdocuments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	identity: 'users/userdocument',
	create: (req, res, next) => {
		if (req.session.user && req.session.user.id){
			req.body.owner = req.session.user.id;
			return next();
		} else {
			return next('Auth required');
		}
	}
};

