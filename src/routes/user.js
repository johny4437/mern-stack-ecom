const router = require('express').Router();
const userController= require('../controllers/userController');
const authController = require("../controllers/authController");


router.get("/secret/:userId", authController.requireSingin,(request, response)=>{
    response.json({
        user: request.profile
    })
})
router.param("userId", userController.userById);

module.exports = router;