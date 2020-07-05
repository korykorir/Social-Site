const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const { check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/user');
//User registration

router.post('/',[
    check('name','name is required').not().isEmpty(),
    check('email','Please enter a valid email address').isEmail(),
    check('password', 'Password has to be more than 6 characters').isLength({min:6})
],async(req,res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
       return  res.status(400).json({errors:errors.array()});
    }

    const { name, email, password } = req.body;
   try{
       //Check if the user exists
       let user = await User.findOne({email});

       if(user){
          return  res.status(400).json({errors :[{msg:'User already exists'}]})
       };

       //get the user gravatar

       const avatar = gravatar.url(email, {
           s:'200',
           r:'pg',
           d:'mm'

       });

       user = new User({
           name,
           email,
           password,
           avatar
       });

       //excrypt the password

       const salt = await bcrypt.genSalt(8);
      user.password = await bcrypt.hash(password, salt);
       await user.save();
       //web tokens

     const payload ={
         user : {
             id: user.id
         }
     };
 

 jwt.sign(
         payload, 
        config.get('jwtsecret'),
        {expiresIn: 3600},function(err,token){            
            if(err) throw err;
                res.json({token})
            
        });   


   }catch(err){
       console.error(err.message);
       res.status(500).send('Server error')

   };
    
});

module.exports = router;