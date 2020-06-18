const express = require('express');
const router = express.Router();

//Get API users
//Test Route
//Acces public

router.get('/', (req,res)=>{
    res.send('Auth Route');
});

module.exports = router;