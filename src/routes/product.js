const router = require('express').Router();
const { 
    create, 
    productId, 
    read, 
    remove, 
    update, 
    list,
    listRelated,
    listCategories
}= require('../controllers/productController');
const {requireSingin, isAdmin, isAuth} = require("../controllers/authController");
const {userById}= require('../controllers/userController');


router.get("/product/:productId", productId, read);
router.post("/product/create/:userId", requireSingin, isAuth, isAdmin, create);
router.delete("/product/:productId/:userId",requireSingin, isAuth, isAdmin,remove );
router.put("/product/:productId/:userId",requireSingin, isAuth, isAdmin, update );
router.get("/products/", list);
router.get("/products/related/:productId", listRelated);
router.get("/products/categories", listCategories);


router.param("userId", userById);
router.param("productId",productId);
    
module.exports = router;