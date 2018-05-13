/*
 * GET all orders by category and keyword
 */
module.exports.get_home = function (req, res) {
	var keyw = req.query.keyword == null ? /.*/ : new RegExp(req.query.keyword);
	var cat = req.query.category == null ? /.*/ : req.query.category;
	if(cat === "all_categories")
		cat = /.*/;
	
    var db = req.db;
    var collection = db.get('testproduct');

    	collection.find({$and: [{"product_name": keyw}, {"cat_name": cat}] },
    		function (err, docs) {
    			if(req.query.keyword === undefined) //no selection - don't send any products
    				collection.find({}, function(err, cats){ //query DB to find categories
    					res.render('home', {"product_list": {}, "category_list": cats, "currentUserObj": req.session.currentUserObj})
    				});
    			else //find products based on category and keyword
    				collection.find({}, function(err, cats){ //query DB to find categories
    					res.render('home', {"product_list": docs, "category_list": cats, "currentUserObj": req.session.currentUserObj})
    				});
   	});
};

/*
 * GET admin page
 */
module.exports.get_admin = function (req, res) {
    if (!req.session.currentUserObj.isAdmin) {
        res.send("Access Denied");
    }

    res.render('admin', {"currentUserObj" : req.session.currentUserObj});
};



/*
 * POST delete a transaction
 */
module.exports.post_deleteorder = function (req, res) {
    var o_no = parseInt(req.params.orderno, 10);
    var db = req.db;
    var collection = db.get('transaction');

    // Submit to the database.
    collection.remove({"order_no": o_no},
        function (err, doc) {
            if (err) {
                res.send("Delete failed.");
            }
            else {
                res.send("Successfully deleted Order " + doc);
            }
        });
};


/*
 * GET list of transactions
 */
module.exports.get_orderlist = function (req, res) {
    const db = req.db;
    const collection = db.get('transaction');
    collection.find({}, {},
        function (err, docs) {
            res.render('orderlist', {"orderlist": docs});
        });
};


/*
 * GET show a transaction
 */
module.exports.get_showorder = function (req, res) {
    const orderNo = req.params.order_no;
    const db = req.db;
    const collection = db.get('transaction');

    collection.find({order_no: parseInt(orderNo)},
        function (err, doc) {
            if (err) {
                res.send("Find failed.");
            }
            else {
                res.render('showorder', {title: 'Show Order No: ' + orderNo, order: doc[0]});
            }
        });
};

/*
 * POST update a transaction
 */
module.exports.post_updateorder = function(req, res, next) 
{
	var quant = req.body.quantity;
    var o_no = parseInt(req.params.orderno, 10);
    var db = req.db;
    var collection = db.get('transaction');

    // Submit to the database.
    collection.update( { "order_no" : o_no }, {$set: {"quantity" : quant}},
                       function (err, doc) 
                       {
                           if (err) {
                               res.send("Update failed.");
                           }
                           else {
                               res.send("Successfully updated Order " + o_no + " to quantity " + quant);
                           }
                       });
};

/*
 * GET edit user form
 */
module.exports.get_editorder = function (req, res) {
    const orderNo = req.params.order_no;
    const db = req.db;
    const collection = db.get('transaction');
    collection.find(
        {order_no: parseInt(orderNo)},
        function (err, doc) {
            if (err) {
                res.send("Find failed.");
            }
            else {
                console.log(doc[0])
                res.render('editorder', {title: 'Edit Quantity of Order #' + orderNo, order: doc[0], orderNo: orderNo});
            }
        }
    );
};

/*
 * POST add order
 */
module.exports.post_neworder = (req, res, next) => {
    // new order fields
    const id = req.body.customer_id;
    const o_no = req.body.order_no;
    const p_name = req.body.product_name;
    const m_name = req.body.manf_name;
    const q = req.body.quantity;
    const o_date = req.body.order_date;
    const c_name = req.body.customer_name;
    const dob = req.body.dob;
    const zip = req.body.zip;
    const state = req.body.state;
    const city = req.body.city;
    const street = req.body.street;
    const h_no = req.body.house_no;
    const email = req.body.customer_email;

    // database operations
    const db = req.db;
    const collection = db.get('transaction');

    collection.insert(
        {
            "customer_ID": parseInt(id),
            "order_no": parseInt(o_no),
            "product_name": p_name,
            "manf_name": m_name,
            "quantity": parseInt(q),
            "order_date": o_date,
            "customer_name": c_name,
            "DoB": dob,
            "zip": parseInt(zip),
            "state": state,
            "city": city,
            "street": street,
            "house_no": h_no,
            "customer_email": email
        },
        (err, doc) => {
            if (err) {
                res.send("Add order failed");
            } else {
                res.render('neworder_success', {order_no: o_no});
            }
        }
    )
};

/*
 * GET product
 */
module.exports.get_showproduct = function (req, res) {
    const productId = req.params.product_id;
    const db = req.db;
    const collection = db.get('testproduct');

    collection.find({_id: productId},
        function (err, doc) {
            if (err) {
                res.send("Find failed.");
            }
            else {
                res.render('showproduct', {product: doc[0], "currentUserObj": req.session.currentUserObj});
            }
        });
};
/*
 * POST login
 */
module.exports.post_login = function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const db = req.db;
    const collection = db.get('testaccount');

    collection.find({"customer_email": email, "password": password},
        function (err, doc) {
            if (err) {
                	res.send("Find failed.");
            }
            else {
            		if(doc[0] === undefined && (email === "" || password === "")) //no username/password entered - error
            			res.render('login', {"error": "No Username and/or Password was Entered" });
            		else if(doc[0] === undefined) //incorrect username/password - error
            			res.render('login', {"error": "Username and/or Password is Incorrect" }); 
            		else{
            			var custObj = {"customer_id": doc[0].customer_id, "customer_email": doc[0].customer_email, "isAdmin": false};
                		req.session.currentUserObj = custObj;
                		req.session.save();
                		res.redirect('/');
            		}	
            }
        });
};

/*
 * POST admin login
 */
module.exports.post_admin_login = function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const db = req.db;
    const collection = db.get('testaccount');

    collection.find({"customer_email": email, "password": password, "isAdmin": true},
        function (err, doc) {
            if (err) {
                res.send("Find failed.");
            }
            else {
                var custObj = {"customer_id": doc[0].customer_id, "customer_email": doc[0].customer_email, "isAdmin" : true};
                req.session.currentUserObj = custObj;
                req.session.save();
                res.redirect('/admin');
            }
        });
};


/*
 * GET profile
 */
module.exports.get_showprofile = function (req, res) {
    const customerId = req.params.customer_id;
    const db = req.db;
    const collection = db.get('testcustomer');

    collection.find({_id: customerId},
        function (err, doc) {
            if (err) {
                res.send("Find failed.");
            }
            else {
                res.render('showprofile', {customer: doc[0], "currentUserObj": req.session.currentUserObj});
            }
        });
};