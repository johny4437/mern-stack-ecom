const router = require('express').Router();
const userController= require('../controllers/userController');
const {requireSingin, isAdmin, isAuth} = require("../controllers/authController");


router.get("/secret/:userId", requireSingin, isAuth, isAdmin, (request, response)=>{
    response.json({
        user: request.profile
    })
})
router.param("userId", userController.userById);

module.exports = router;