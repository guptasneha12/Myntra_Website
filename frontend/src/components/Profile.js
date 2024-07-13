import React, { useEffect, useState } from 'react';
import './profile.css';
import { useNavigate } from 'react-router-dom';
import PostDetail from './PostDetail';
import ProfilePic from './ProfilePic';

const fetchUserProfile = async (userId, setPic, setUser, setLoading) => {
  try {
    const response = await fetch(`http://localhost:5000/user/${userId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt")
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }
    const result = await response.json();
    setPic(result.posts);
    setUser(result.user);
    setLoading(false);
  } catch (err) {
    console.log("Error fetching user profile:", err);
    setLoading(false);
  }
};

const Profile = () => {
  const picLink = "https://cdn-icons-png.flaticon.com/128/3177/3177440.png";
  const [pic, setPic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState(null);
  const [changePic, setChangePic] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();

  const toggleDetails = (post) => {
    setShow(!show);
    setPosts(post);
  };

  const changeprofile = () => {
    setChangePic(!changePic);
  };

  const updateProfilePic = (newPicUrl) => {
    setUser((prevUser) => {
      const updatedUser = { ...prevUser, photo: newPicUrl };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    });
    setChangePic(false);
  };

  const deletePost = (postId) => {
    fetch(`http://localhost:5000/deletePost/${postId}`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to delete post');
        }
        return res.json();
      })
      .then((result) => {
        const updatedPic = pic.filter(item => item._id !== postId);
        setPic(updatedPic);

        if (show && posts && posts._id === postId) {
          setShow(false);
          setPosts(null);
        }
      })
      .catch(err => console.log("Error deleting post:", err));
  };

  useEffect(() => {
    fetchUserProfile(user._id, setPic, setUser, setLoading);
  }, [user._id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='profile'>
      <div className='profile-frame'>
        <div className='profile-pic'>
          <img onClick={changeprofile} src={user.photo ? user.photo : picLink} alt='Profile' />
        </div>
        <div className='profile-data'>
          <h1>{user.name}<br/>(Eco-Explorer)</h1>
          <button className='followBtn'>Redeem Points</button>
          <button className='followBtn' onClick={() => navigate('/weeklyfeedback')}>Weekly Feedback</button>
          <div className='profile-info' style={{ display: "flex" }} >
            <p>{pic.length} posts</p>
            <p>{user.followers.length} followers</p>
            <p>{user.following.length} following</p>
            <p>5 Eco-credits</p>
          </div>
        </div>
      </div>
      <hr style={{
        width: "90%",
        margin: "25px auto",
        opacity: "0.8"
      }} />
      <div className='gallery'>
        {pic.map((item) => (
          <div key={item._id} className='gallery-item' onClick={() => { toggleDetails(item) }}>
            {item.photo && (item.photo.endsWith('.mp4') || item.photo.endsWith('.webm') || item.photo.endsWith('.ogg')) ? (
              <video className='item' controls>
                <source src={item.photo} type='video/mp4' />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img src={item.photo} alt='Post' className='item' />
            )}
            <button onClick={() => deletePost(item._id)}>Delete</button>
          </div>
        ))}
      </div>
      {show && posts &&
        <PostDetail item={posts} toggleDetails={toggleDetails} />
      }
      {changePic &&
        <ProfilePic changeprofile={changeprofile} updateProfilePic={updateProfilePic} />
      }
    </div>
  );
};

export default Profile;
