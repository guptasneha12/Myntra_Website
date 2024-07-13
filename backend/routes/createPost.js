const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const POST = mongoose.model("POST");

router.get("/allposts", requireLogin, (req, res) => {
    POST.find()
    .populate("postedBy", "_id name Photo")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt")
    .then(posts => res.json(posts))
    .catch(err => console.log(err));
});




router.post("/createPost", requireLogin, (req, res) => {
    const { body, pic } = req.body;
    if (!body || !pic) {
        return res.status(422).json({ error: "Please add all the fields" });
    }
    req.user;
    const post = new POST({
        body,
        photo: pic,
        postedBy: req.user
    });
    post.save()
    .then(result => res.json({ post: result }))
    .catch(err => console.log(err));
});



router.get("/myposts", requireLogin, (req, res) => {
    POST.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .populate("comments.postedBy", "_id name")
    .sort("-createdAt")
    .then(myposts => res.json(myposts))
    .catch(err => console.log(err));
});




router.put("/like", requireLogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    }, { new: true })
    .populate("postedBy", "_id name Photo")
    .then(result => res.json(result))
    .catch(err => res.status(422).json({ error: err }));
});




router.put("/unlike", requireLogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    }, { new: true })
    .populate("postedBy", "_id name Photo")
    .then(result => res.json(result))
    .catch(err => res.status(422).json({ error: err }));
});



router.put("/comment",requireLogin,(req,res)=>{
    const comment={
        comment:req.body.text,
        postedBy:req.user._id
    }
    POST.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name")
    .populate("postedBy","_id name Photo")
    .then(result => res.json(result))
    .catch(err => res.status(422).json({ error: err }));
})



// Api to delete post
router.delete("/deletePost/:postId", requireLogin, async (req, res) => {
    try {
        const post = await POST.findOne({ _id: req.params.postId }).populate("postedBy", "_id");

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Check if the logged-in user is the owner of the post
        if (post.postedBy._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "Unauthorized access" });
        }

        // Delete the post
        await post.deleteOne();
        res.json({ message: "Post deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete post" });
    }
});




// to show following post
router.get("/myfollowingpost",requireLogin,(req,res)=>{
    POST.find({postedBy:{$in:req.user.following}})
    .populate("postedBy","_id name")
    .populate("comments.postedBy","_id name")
    .then(posts=>{
        res.json(posts)
    })
    .catch(err=>{console.log(err)})
})




// Add this to the existing router code
router.get("/likedposts", requireLogin, (req, res) => {
    POST.find({ likes: req.user._id })
        .populate("postedBy", "_id name photo")
        .populate("comments.postedBy", "_id name")
        .sort("-createdAt")
        .then(posts => res.json(posts))
        .catch(err => res.status(422).json({ error: err }));
});

module.exports = router;
