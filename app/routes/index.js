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

module.exports = router;
