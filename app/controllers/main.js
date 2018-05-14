/*
 * GET old home page.
 */
/*module.exports.index = function (req, res, next) {
    res.render('index', {
        title: 'CS 157B - Assignment 7',
        welcome: 'Click on links below to access the required REST API calls',
        api: {
            list: '../orderlist/',
            show: '../orderlist/',
            new: '../neworder/',
            edit: '../editorder/',
            create: '../neworder/',
            update: '../editorder/',
            delete: '../deleteorder/'
        }
    });
};*/

module.exports.get_deleteorder = function (req, res) {
    var o_no = req.params.orderno;
    res.render('deleteorder', {"orderno": o_no});
};

/*
 * GET new user form
 */
module.exports.get_neworder = function (req, res) {
    res.render('neworder', {"title": 'Add New Order'});
};

/*
 * GET login page
 */
module.exports.get_login = function (req, res) {
    res.render('login', {"title": 'Login', "error": "" });
};


/*
 * GET buyproduct page
 */
module.exports.get_buyproduct = function (req, res) {
    const quan = req.query.quantity == null ? 0 : req.query.quantity;
    const id = req.query.id;
    const n = req.query.name;
    const pr = req.query.price.valueOf();
    const user = req.session.currentUserObj;
    if (parseInt(quan) > 0) {
        res.render(
            'buyproduct',
            {
                title: 'Purchase confirmation',
                info: {
                    confirm: 'Would you like to buy this product?',
                    quantity: quan,
                    name: n,
                    price: pr,
                    id: id,
                    user: user
                }
            });
    } else {
        res.redirect('showproduct/' + id);
    }
};

