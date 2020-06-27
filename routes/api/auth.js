const express = require('express');
const router = express.Router();
const auth = require('../../middleWare/auth');
const User = require('../../models/user');
const { check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');



//Get API users
//Test Route
//Acces public

router.get('/',auth, async(req,res)=>{

    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error')
    }; 

});

router.post('/login',[    
    check('email','Please enter a valid email address').isEmail(),
    check('password', 'Password is required').exists()
],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
       return  res.status(400).json({errors:errors.array()});
    }
    const { email, password } = req.body;
   try{
       //Check if the user doesnt exist
       let user = await User.findOne({email});
       if(!user){
          return  res.status(400).json({errors :[{msg:'Invalid credentials'}]})
       };
       //Compare password
       const isMatch = await bcrypt.compare(password, user.password);

       if(!isMatch){
        return  res.status(400).json({errors :[{msg:'Invalid credentials'}]})
       };


     const payload ={
         user : {
             id: user.id
         }
     };

    

     const secret = config.get('jwtsecret');

  
      jwt.sign(
         payload, 
        config.get('jwtsecret'),
        {expiresIn: 360000},function(err,token){
            console.log(token);
            if(err) throw err;
                res.json({token})
            
        });
    


   }catch(err){
       console.error(err.message);
       res.status(500).send('Server error')

   };
   
});

module.exports = router;