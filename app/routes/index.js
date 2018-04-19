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
 * GET order list page.
 */
router.get('/orderlist', modelMain.get_orderlist);




module.exports = router;
