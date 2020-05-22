const router = require('express').Router();
const { create,categoryById, read,update, remove}= require('../controllers/categoryController');
const {requireSingin, isAdmin, isAuth} = require("../controllers/authController");
const userController= require('../controllers/userController');


router.get("/category/:categoryId", read)
router.post("/category/create/:userId", requireSingin, isAuth, isAdmin, create);
router.delete("/category/:categoryId/:userId",requireSingin, isAuth, isAdmin,remove )
router.put("/category/:categoryId/:userId",requireSingin, isAuth, isAdmin, update )


router.param("userId", userController.userById);
router.param('categoryId', categoryById);
    
module.exports = router;