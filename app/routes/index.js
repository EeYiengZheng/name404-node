const express = require('express');
const router = express.Router();
const ctrlMain = require("../controllers/main");
const modelMain = require("../models/modelMain");
console.log("Router:"); console.log(router);

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
 * and POST the form
 */
router.get('/neworder', ctrlMain.get_neworder);
router.post('/neworder', modelMain.post_neworder);

/*
 * GET/POST edit order form
 */
router.get('/editorder/:order_no', modelMain.get_editorder);
router.post('/editorder/:orderno', modelMain.post_updateorder);

/* GET home page. */
router.get('/', modelMain.get_home);

/*
 * GET show a product
 */
router.get('/showproduct/:product_id', modelMain.get_showproduct);

module.exports = router;
