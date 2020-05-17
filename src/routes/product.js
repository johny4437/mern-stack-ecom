const router = require('express').Router();
const { create }= require('../controllers/productController');
const {requireSingin, isAdmin, isAuth} = require("../controllers/authController");
const userController= require('../controllers/userController');


router.post("/product/create/:userId", requireSingin, isAuth, isAdmin, create);

router.param("userId", userController.userById);
    
module.exports = router;