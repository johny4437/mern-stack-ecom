const router = require('express').Router();
const {singup, singin, singout, requireSingin}= require('../controllers/authController');
const {userSingupValidator} = require("../validator/index");


router.post("/singup", userSingupValidator, singup);
router.post("/singin", singin);
router.get("/singout", singout);

router.get("/hello", requireSingin, (request,response)=>{
    response.send("hello");
})


    
module.exports = router;