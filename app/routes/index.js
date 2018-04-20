const express = require('express');
const router = express.Router();
const ctrlMain = require("../controllers/main");
const modelMain = require("../models/modelMain");
console.log("Router:"); console.log(router);

/* GET home page. */
router.get('/', ctrlMain.index);

/*
 * GET db test page
 */
router.get('/dbtest', modelMain.dbTest);

/*
 * Deleting a transaction
 */
router.get('/deleteorder/:orderno', ctrlMain.get_deleteorder);
router.post('/deleteorder/:orderno', modelMain.post_deleteorder);

/*
 * GET list transaction page
 */
router.get('/orderlist', modelMain.get_orderlist);

/*
 * GET show a transaction
 */
router.get('/orderlist/:order_no', modelMain.get_showorder);

/*
 * GET new order form
 */
router.get('/neworder', ctrlMain.get_neworder);

/*
 * GET edit order form
 */
router.get('/editorder/:order_no', modelMain.get_editorder);

module.exports = router;
