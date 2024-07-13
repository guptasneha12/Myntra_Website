import React, { useEffect, useState } from 'react';
import './profile.css';
import { useParams } from 'react-router-dom';

export default function UserProfile() {
  const picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const { userid } = useParams();
  const [isFollow, setIsFollow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Function to fetch user profile and posts
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:5000/user/${userid}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt")
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const result = await response.json();
        setUser(result.user);
        setPosts(result.posts);
        setIsFollow(result.user.followers.includes(JSON.parse(localStorage.getItem("user"))._id));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userid]);

  // Function to handle follow/unfollow
  const handleFollowToggle = () => {
    if (isFollow) {
      unfollowUser(user._id);
    } else {
      followUser(user._id);
    }
  };

  // Function to follow user
  const followUser = (userId) => {
    fetch("http://localhost:5000/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        followId: userId
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setIsFollow(true);
      })
      .catch(err => console.error("Error following user:", err));
  };

  // Function to unfollow user
  const unfollowUser = (userId) => {
    fetch("http://localhost:5000/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        followId: userId
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setIsFollow(false);
      })
      .catch(err => console.error("Error unfollowing user:", err));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='profile'>
      <div className='profile-frame'>
        <div className='profile-pic'>
          <img src={user.photo ? user.photo : picLink} alt='Profile' />
        </div>
        <div className='profile-data'>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h1>{user.name}<br />(Eco-Explorer)</h1>
            <button className='followBtn' onClick={handleFollowToggle}>
              {isFollow ? "Unfollow" : "Follow"}
            </button>
          </div>
          <div className='profile-info' style={{ display: "flex" }} >
            <p>{posts.length} posts</p>
            <p>{user.followers.length} followers</p>
            <p>{user.following.length} following</p>
            <p>5 Eco-credits </p>
          </div>
        </div>
      </div>
      <hr style={{
        width: "90%",
        margin: "25px auto",
        opacity: "0.8"
      }} />
      <div className='gallery'>
        {posts.map((item) => (
          <div key={item._id} className='gallery-item'>
            {item.photo && (item.photo.endsWith('.mp4') || item.photo.endsWith('.webm') || item.photo.endsWith('.ogg')) ? (
              <video className='item' controls>
                <source src={item.photo} type='video/mp4' />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img src={item.photo} alt='Post' className='item' />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
