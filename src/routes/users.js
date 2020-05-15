const router = require('express').Router();
const userController= require('../controllers/userController');
const {userSingupValidator} = require("../validator/index");
const {userSinginpValidator} = require("../validator/index");

router.post("/singup", userSingupValidator, userController.singup);
router.post("/singin", userController.singin);

    
module.exports = router;