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
