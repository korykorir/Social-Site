const express = require('express');
const router = express.Router();
const { check, validationResuslt, validationResult } = require('express-validator');
const Profile = require ('../../models/Profile');
const auth = require('../../middleWare/auth');
const User = require('../../models/user');

//Get API/profile/me
//Get current users profile
//Acces public

router.get('/me',auth, async(req,res)=>{

    try{
        const profile = await Profile.findOne({user: req.user.id}).populate('user',
        ['name','avatar']);

        if(!profile){
            return res.status(400).json({msg: "There is no profile for this user"});
        }

        res.send(profile);

    }catch(err){
        console.error(err.message);
       res.status(500).send('Server error')
    }
   
});

//Post API/profile/
//Create a profile
//Acces private
router.post('/',auth,[
    check('status', 'status is required').not().isEmpty(),
   check('skills', 'Skills is required').not().isEmpty()
], async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
        console.log(errors);
    }

    try{

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = req.body;

    console.log(skills);
    const profileFields = {};

    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills) {
        profileFields.skills =  skills.split(',').map(skill=>skill.trim())
    };
    //Build social object
    profileFields.social = {};

    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;

   
        let profile = await Profile.findOne({user : req.user.id});

        if(profile){
            profile = await Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set : profileFields},
                {new:true});
                return res.json(profile);
        };

        profile = new Profile(profileFields);

        console.log(profileFields.social);

        await profile.save();
        res.json(profile);

    }catch(err){

   
        
        console.error(err.message);
       res.status(500).send('Server error')
    }


});

//Get API/profile/me
//Get all profiles
//Acces public

router.get('/', async(req, res)=>{
    try{
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);

    }catch(err){
        console.error(err.message);
        res.status(500).send('server Error');
    }
});


//Get API/profile/user/:user_id
//Get profile by user iD
//Acces public

router.get('/user/:user_id', async(req, res)=>{
    try{
        const profile = await Profile.findOne({user: req.params.user_id}).populate('user', ['name', 'avatar']);
       if(!profile){
           return res.status(400).json({msg: "There is no profile for this user"});
       };

       res.json(profile);

    }catch(err){
        if(err.kind =='ObjectId'){

            return res.status(400).json({msg: "There is no profile for this user"});

        }
        
        res.status(500).send('server Error');
    }
});


//Deleting a profile

router.delete('/',auth, async(req,res)=>{
    try{
//remove profile
await Profile.findByIdAndRemove({user: req.user.id});

//remove user
await User.findByIdAndRemove({_id : req.user.id});

res.json({msg: 'User deleted'});

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


//Add profile experience

router.put('/experience',auth, [
    check('title','Title is required').not().isEmpty(),
    check('company','company is requred').not().isEmpty(),
    check('from','from date is requred').not().isEmpty()
    

],async(req,res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    };

    const{ title, location, to, current,description, company, from } = req.body;

    const newExp = { title, location, to, current,description, company, from };


    try{

        const profile = await Profile.findOne({user: req.user.id});

        profile.experience.unshift(newExp);

        await profile.save();

        res.json(profile);

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


//delete Experience

router.delete('/experience/:exp_id',auth, async(req,res)=>{
    const profile = await Profile.findOne({user: req.user.id});

    //get remove index

    const removeIndex = profile.experience
    .map(item=> item.id)
    .indexOf(req.params.exp_id);

    profile.experience.splice(removeIndex, 1);

    await profile.save();

    res.send(profile);
});


//Add education

router.put('/education',[
    check('school','School is required').not().isEmpty(),
    check('degree','degree is required').not().isEmpty(),
    check('fieldofstudy','fieldofstudy is required').not().isEmpty(),
    check('from','from date is required').not().isEmpty(),
    check('to','to date is required').not().isEmpty()
], auth, async(req,res)=>{

    const errors =validationResult(req);

    if(!errors.isEmpty()){
        return res.status(401).json({errors: errors.array()});
    };

    const { school, degree, fieldofstudy, from, to, current, description } =req.body;

    const newEd = { school, degree, fieldofstudy, from, to, current, description };

    try{

        const profile = await Profile.findOne({user: req.user.id});

        profile.education.unshift(newEd);

        await profile.save();

        res.json(profile);

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }

});

//delete education

router.delete('/education/:ed_id',auth, async(req,res)=>{
   
    const profile = await Profile.findOne({user: req.user.id});


    const removeIndex = profile.education.map(item => item.map).indexOf(req.params.ed_id);

    profile.education.splice(removeIndex, 1);

    await profile.save()

    res.json(profile);
});


//Github repos

router.get('/github/:username', (req, res)=>{

    try{

        const options ={
            uri: `https://api.github/users/${req.params.username}/repos?per_page=5&
            sort=created:asc&client_id=${config.get('GithubClientId')}&client_secret =${'clientSecret'}`,
            method: 'GET',
            headers :{ 'user-agent':'node.js'}
        };

        request(options, (error, response,body)=>{
            if(error) console.error(error);

            if(response.statusCode !==200){
                return res.status(401).json({msg: 'No Github profile found'});
            }

            res.json(JSON.parse(body));
        })

    }catch(err){
        res.status(401).json({msg : "No github repo fror this profile"})
    }
})

module.exports = router;