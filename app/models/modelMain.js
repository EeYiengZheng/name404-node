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
 * GET order list page.
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
 * GET show user page.
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