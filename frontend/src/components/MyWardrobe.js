import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import './MyWardrobe.css';

export default function MyWardrobe() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate('/signup');
    } else {
      fetchLikedPosts(token);
    }
  }, [navigate]);

  const fetchLikedPosts = (token) => {
    fetch("http://localhost:5000/likedposts", {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(res => res.json())
      .then(result => setData(result))
      .catch(err => console.log(err));
  };

  const openFullScreen = (media) => {
    navigate('/fullscreen', { state: { media } });
  };

  // const handleUnlikePost = (id) => {
  //   fetch(`http://localhost:5000/unlike/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("jwt")
  //     }
  //   })
  //     .then(res => res.json())
  //     .then(result => {
  //       if (result.error) {
  //         toast.error("Error: Failed to Unlike Post");
  //       } else {
  //         const newData = data.filter(post => post._id !== id);
  //         setData(newData);
  //         toast.error("Removed from Favorites");
  //         navigate('/'); // Redirect to home page after unliking
  //       }
  //     })
  //     .catch(err => toast.error("Error: Failed to Unlike Post"));
  // };

  return (
    <div className='mywardrobe'>
   
      {data.length === 0 ? (
        <p>No Favorite items yet</p>
      ) : (
        data
          .filter(post => post.photo.endsWith('.jpg') || post.photo.endsWith('.jpeg') || post.photo.endsWith('.png'))
          .map((post) => (
            <div className='image-container' key={post._id}>
              <img src={post.photo} alt='Liked Post' onClick={() => openFullScreen(post.photo)} />
              
            </div>
          ))
      )}
    </div>
  );
}
