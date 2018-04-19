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
