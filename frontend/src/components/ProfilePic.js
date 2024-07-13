import React, { useState, useEffect, useRef, useCallback } from 'react';

export default function ProfilePic({ changeprofile, updateProfilePic }) {
  const hiddenFileInput = useRef(null);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [error, setError] = useState(null);

  const postDetails = useCallback(() => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "Myntra-Website");
    data.append("cloud_name", "myntrawebsite");

    fetch("https://api.cloudinary.com/v1_1/myntrawebsite/auto/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => console.log("Error uploading image:", err));
  }, [file]);

  const postPic = useCallback(() => {
    fetch("http://localhost:5000/uploadProfilePic", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        pic: url
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Profile picture updated:", data);
        updateProfilePic(url); // Call updateProfilePic with the new URL
        
      
      })
      .catch(err => console.log("Error updating profile picture:", err));
  }, [url, updateProfilePic]);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  useEffect(() => {
    if (file) {
      postDetails();
    }
  }, [file, postDetails]);

  useEffect(() => {
    if (url) {
      postPic();
    }
  }, [url, postPic]);

  return (
    <div className='profilePic darkBg'>
      <div className='changePic centered'>
        <div>
          <h2>Change Profile Photo</h2>
        </div>
        <div style={{ borderTop: "1px solid #00000030" }}>
          <button className='upload-btn' style={{ color: "#1EA1F7" }} onClick={handleClick}>Upload Photo</button>
          <input
            type='file'
            ref={hiddenFileInput}
            accept='image/*'
            style={{ display: "none" }}
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              if (selectedFile && selectedFile.type.startsWith('image/')) {
                setFile(selectedFile);
                setError(null);
              } else {
                setError("Please select a valid image file.");
              }
            }}
          />
        </div>
        {error && <div className="error">{error}</div>}
        <div style={{ borderTop: "1px solid #00000030" }}>
          <button className='upload-btn' onClick={()=>{setUrl(null); postPic()}} style={{ color: "#ED4956" }}>Remove Current Photo</button>
        </div>
        <div style={{ borderTop: "1px solid #00000030" }}>
          <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "15px" }} onClick={changeprofile}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
