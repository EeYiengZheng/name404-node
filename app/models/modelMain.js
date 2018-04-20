
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