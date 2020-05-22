const router = require('express').Router();
const { read, userById, update}= require('../controllers/userController');
const {requireSingin, isAdmin, isAuth} = require("../controllers/authController");


router.get("/secret/:userId", requireSingin, isAuth, isAdmin, (request, response)=>{
    response.json({
        user: request.profile
    })
});

router.get("/user/:userId", requireSingin, isAuth, read);
router.put("/user/:userId", requireSingin, isAuth, update)

router.param("userId", userById);

module.exports = router;