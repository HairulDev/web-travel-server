const router = require('express').Router();
const apiController = require('../controllers/apiController');

router.post('/signin', apiController.actionSignin);
module.exports = router;
