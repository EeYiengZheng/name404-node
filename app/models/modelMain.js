/*
 * database functions go here
 */

/*
 * test db
 */
module.exports.dbTest = function (req, res, next) {
    const db = req.db;
    console.log('Connected correctly to server');
    let collection = db.get('transaction');
    return collection.findOne({}, {},
        function (err, docs) {
            if (err) {
                res.send("Find failed.");
            }
            else {
                const docsString = JSON.stringify(docs);
                res.render('dbTest', {"findTest": docsString});
            }
        })
};

/*
 * POST delete a transaction
 */
module.exports.post_deleteorder = function(req, res) 
{
    var o_no = parseInt(req.params.orderno, 10);
    var db = req.db;
    var collection = db.get('transaction');

    // Submit to the database.
    collection.remove( { "order_no" : o_no },
                       function (err, doc) 
                       {
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
module.exports.get_orderlist = function(req, res) 
{
    const db = req.db;
    const collection = db.get('transaction');
    collection.find({}, {}, 
                    function(err, docs)
                    {
                        res.render('orderlist', { "orderlist" : docs });
                    });
};


/*
 * GET show a transaction
 */
module.exports.get_showorder = function(req, res) 
{
    const orderNo = req.params.order_no;
    const db = req.db;
    const collection = db.get('transaction');
    collection.find( { order_no: parseInt(orderNo) }, 
                     function(err, doc) 
                     {
                         if (err) {
                             res.send("Find failed.");
                         }
                         else {
                            console.log(doc);
                             res.render('showorder', 
                                        { title: 'Show Order No: ' + orderNo,
                                          order: doc[0] })
                         }
                     });
};
