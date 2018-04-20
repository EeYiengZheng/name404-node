/*
 * GET home page.
 */
module.exports.index = function (req, res, next) {
    res.render('index', {title: 'Hello World!'});
};

module.exports.get_deleteorder = function(req, res) {
    var o_no = req.params.orderno;
    res.render('deleteorder', { "orderno" : o_no} );
};
/*
 * GET new user form
 */
module.exports.get_neworder = function(req, res) 
{
    res.render('neworder', { "title": 'Add New Order' });
};

