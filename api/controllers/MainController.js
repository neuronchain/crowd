/**
 * MainController
 *
 * @description :: Server-side logic for managing mains
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: (req, res, next) => {
        locals = {
            layout: false
        };
        if (req.session.user) {
            locals.user = req.session.user
        } else locals.user = null;
        return res.view('crowd/index', locals);
    }
};

