import React, { useState, useEffect } from 'react';
import './Createpost.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [body, setBody] = useState("");
  const [file, setFile] = useState("");
  // const [error, setError] = useState(""); // Remove unused state variable
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // toast functions to display any error 
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    // saving posts to mongodb
    if (url) {
      fetch("http://localhost:5000/createPost", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          body,
          pic: url
        })
      }).then(res => res.json())
        .then(data => {
          if (data.error) {
            notifyA(data.error)
          } else {
            notifyB("Successfully Posted")
            navigate('/')
          }
        })
        .catch(err => console.log(err))
    }

  }, [url, body, navigate]);

  // posting image/video to cloudinary
  const MAX_FILE_SIZE = 12582912; // 12 MB in bytes

  const postDetails = () => {
    if (!file) {
      console.error("No file selected");
      // setError("No file selected"); // Not used, remove if unnecessary
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      console.error("File size too large");
      // setError("File size too large. Maximum is 12 MB."); // Not used, remove if unnecessary
      return;
    }

    console.log(body, file);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Myntra-Website");
    data.append("cloud_name", "myntrawebsite");
    fetch("https://api.cloudinary.com/v1_1/myntrawebsite/auto/upload", {
      method: "post",
      body: data
    }).then(res => res.json())
      .then(data => setUrl(data.url))
      .catch(err => console.log(err))
  }

  const loadFile = (event) => {
    const file = event.target.files[0];
    const output = document.getElementById('output');

    if (file) {
      const fileURL = URL.createObjectURL(file);
      if (file.type.startsWith('image/')) {
        output.innerHTML = `<img src="${fileURL}" alt="Preview" />`;
      } else if (file.type.startsWith('video/')) {
        output.innerHTML = `<video controls src="${fileURL}" alt="Preview"></video>`;
      }
    }
  }

  return (
    <div className='createPost'>
      <div className='post-header'>
        <h4 style={{ margin: "3px auto" }}>Create New Post</h4>
        <button id='post-btn' onClick={postDetails}>Share</button>
      </div>
      <div className='main-div'>
        <div id="output">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png" alt="Default Preview" />
        </div>
        <input type='file' accept='image/*,video/*' onChange={(event) => {
          loadFile(event);
          setFile(event.target.files[0]);
        }} />
      </div>
      <div className='details'>
        <div className='card-header'>
          <div className='card-pic'>
            <img src={user && user.profilePic ? user.profilePic : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png'} alt='Profile' />
          </div>
          <h5>{user ? user.name : 'User'}</h5>
        </div>
        <textarea value={body} onChange={(e) => {
          setBody(e.target.value)
        }} type="text" placeholder='Write a caption...'></textarea>
      </div>
    </div>
  );
}
