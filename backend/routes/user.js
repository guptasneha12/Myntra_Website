const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const POST = mongoose.model("POST");
const USER = mongoose.model('USER');
const requireLogin = require("../middlewares/requireLogin");

// Get user profile
router.get("/user/:id", async (req, res) => {
    try {
        const user = await USER.findOne({ _id: req.params.id }).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const posts = await POST.find({ postedBy: req.params.id }).populate("postedBy", "_id");
        res.status(200).json({ user, posts });
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
});

// Follow a user
router.put("/follow", requireLogin, async (req, res) => {
    try {
        const followId = req.body.followId;

        // Add follower to the user being followed
        const updatedFollowedUser = await USER.findByIdAndUpdate(
            followId,
            { $push: { followers: req.user._id } },
            { new: true }
        );

        // Add followed user to the current user's following list
        const updatedCurrentUser = await USER.findByIdAndUpdate(
            req.user._id,
            { $push: { following: followId } },
            { new: true }
        );

        res.json({ updatedFollowedUser, updatedCurrentUser });
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
});

// Unfollow a user
router.put("/unfollow", requireLogin, async (req, res) => {
    try {
        const followId = req.body.followId;

        // Remove follower from the user being unfollowed
        const updatedFollowedUser = await USER.findByIdAndUpdate(
            followId,
            { $pull: { followers: req.user._id } },
            { new: true }
        );

        // Remove unfollowed user from the current user's following list
        const updatedCurrentUser = await USER.findByIdAndUpdate(
            req.user._id,
            { $pull: { following: followId } },
            { new: true }
        );

        res.json({ updatedFollowedUser, updatedCurrentUser });
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
});

// To upload profile pic
router.put("/uploadProfilePic", requireLogin, async (req, res) => {
    try {
        const result = await USER.findByIdAndUpdate(req.user._id, {
            $set: { photo: req.body.pic }
        }, {
            new: true
        });

        res.json(result);
    } catch (err) {
        res.status(422).json({ error: err.message });
    }
});

module.exports = router;
