const express = require('express');
const router = express.Router();
// const path = require('path');
const userController = require('../controllers/userController');
const checkAuth = require('../middleware/check-auth');


router.post('/signup', userController.addUser);
router.post('/authenticate', userController.loginUser);
router.get('/user', checkAuth, userController.getUser);
router.patch('/addItem/:username', userController.addForSaleItem);
router.delete('/deleteItem/:username/:itemId', userController.deleteForSaleItem);

/* GET home page. */
// router.get('/', function(req, res, next) {
//     res.sendFile(path.join(__dirname, 'dist/wdd430-final-project/browser/index.html'));
// });

module.exports = router;