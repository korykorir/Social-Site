const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const { check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

const User = require('../../models/user');
const { findOne } = require('../../models/user');
//Post API users
//Test Route
//Acces public

router.post('/',[
    check('name','name is required')
    .not()
    .isEmpty(),
    check('email','Put the right email').isEmail(),
    check('password','please enter password which is more than 6 characters')
    .isLength({min:6})
], async(req,res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty){
        return res.status(400).json({errors:errors.array()})
    }
 

    const { name, email, password } = req.body;
    try{
         //check if user exists
        let user = await User.findOne({email});
        if(user){
            res.status(400).json({errors:[{msg: "User already exists"}]});

        };

  
   //get users gravitor
        const avator = gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'mm'
        });

        user = new User({
            name,
            email,
            password,
           avator
        });
   //encrypt password
   const salt = await bcrypt.genSalt(10);

   user.password = await bcrypt.hash(password,salt);

   await user.save();

   res.send('User registered');

   //return jsonwebtoken
   res.send('User route')
    }catch(err){
        console.error(err.message);
        res.status(500).send('server error');
    }

   
});

module.exports = router;