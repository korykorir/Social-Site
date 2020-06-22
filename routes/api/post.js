const express = require('express');
const router = express.Router();
const { check, validationResuslt, validationResult } = require('express-validator');
const Profile = require ('../../models/Profile');
const auth = require('../../middleWare/auth');
const User = require('../../models/user');
const Post = require('../../models/Posts');
const user = require('../../models/user');

//Creating posts

router.post('/',auth, [
    check('text','text is required').not().isEmpty()
],async(req,res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    };

    try{

        const user = await User.findById(req.user.id).select('-password');

        const newPost = {
            text: req.body.text,
            name: user.name,
            avatar : user.avatar,
            user : req.user.id
        };

        const post = new Post(newPost);

        await post.save();

        res.json(post);

    }catch(err){
        console.log(err.message);
        res.status(500).send('Sever error')
    }
});

//getting posts

router.get('/', async(req,res)=>{
    try{

        const posts = await Post.find();

        if(!posts){
            return res.status(400).json({msg: "No post found"})
        };

        res.json(posts);

    }catch(err){
        console.error(err.message);
        res.status(500).send('server error');
    }
});

//getting one post

router.get('/:post_id', auth, async(req,res)=>{
    try{

        const post = await Post.findById(req.params.post_id);
        if(!post){
            return res.status(400).json({msg: "No post found"})
        };

        res.json(post);
    }catch(err){

        console.error(err.message);
        res.status(500).send('server error');

    }
});

//Delete request

router.delete('/:post_id', auth, async(req,res)=>{

try{
    const post = await Post.findById(req.params.post_id);

    console.log(post);
    if(post.user.toString() !== req.user.id){
        return res.status(401).json({msg :"Opertaion not authorized"});
    }

    await post.remove();

    res.json(await Post.find());

}catch(err){

    console.error(err.message);
        res.status(500).send('server error');

}

});


//Put request for likes

router.put('/like/:id', auth, async(req,res)=>{

    try{

        const post = await Post.findById(req.params.id);
        //check if post has been liked by this user

        if(post.likes.filter(like=>like.user.toString() == req.user.id).length >0){
            return res.status(400).json({msg: "Post has already been liked"})
        };

        post.likes.unshift({user : req.user.id});

        await post.save();

        res.json(post.likes);

    }catch(err){
        console.error(err.message);
        res.status(500).send('server error');
    }
});

//Unliking

router.put('/unlike/:id', auth, async(req,res)=>{

    try{

        const post = await Post.findById(req.params.id);
        //check if post has been liked by this user

        if(post.likes.filter(like=>like.user.toString() == req.user.id).length === 0){
            return res.status(400).json({msg: "Post has not been unliked"})
        };
        const removeIndex = post.likes.map(like=> like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        await post.save();

        res.json(post);
        

    }catch(err){
        console.error(err.message);
        res.status(500).send('server error');
    }
});


//Postin comments

router.post('/comment/:id',auth, [
    check('text','text is required').not().isEmpty()
],async(req,res)=>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    };

    try{

        const user = await User.findById(req.user.id).select('-password');

        const post = await Post.findById(req.params.id);

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar : user.avatar,
            user : req.user.id
        };
        post.comments.unshift(newComment);
        

        await post.save();

        res.json(post.comments);

    }catch(err){
        console.log(err.message);
        res.status(500).send('Sever error')
    }
});

// delete comment


router.delete('/comment/:id/:comment_id', auth, async(req,res)=>{

    try{
        const post = await Post.findById(req.params.id);

        //pull out comment

        const comment = post.comments.find(comment => comment.id === req.params.comment_id);


        //check whether comment is there
        if(!comment){
            return res.status(404).json({msg: "Comment does not exist"});
        };

        //check user

        if(comment.user.toString()!== req.user.id){
            return res.status(401).json({msg: "Usr is unauthorized"});

        };

        // get remove index
        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);

        post.comments.splice(removeIndex, 1);

        await post.save();
         res.json(post.comments);

    }catch(err){

        console.log(err.message);
        res.status(500).send('Sever error')

    }
})
module.exports = router;