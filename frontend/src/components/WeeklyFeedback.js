import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './WeeklyFeedback.css';

export default function WeeklyFeedback() {
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const submitFeedback = () => {
    if (!feedback) {
      notifyA("Feedback cannot be empty");
      return;
    }

    fetch("http://localhost:5000/weeklyFeedback", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        feedback
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB("Feedback submitted successfully");
          navigate('/');
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className='createPost1'>
      <ToastContainer />
      <div className='post-header1'>
        <h4 style={{ margin: "-10px 50px", fontSize:"30px"}}>Weekly Feedback</h4>
        
      </div>
      <div className='main-div1'>
        <div className='details1'>
          <div className='card-header1'>
            
            <h5>{user ? user.name : 'User'}</h5>
          </div>
          <div className='startquiz-btn'>
          <button id='post-btn1' onClick={submitFeedback}>Start Quiz</button>
          </div>
          <textarea className='text' value={feedback} onChange={(e) => setFeedback(e.target.value)} type="text" placeholder='Write your weekly feedback...'></textarea>
          <button id='post-btn1' onClick={submitFeedback}>Submit</button>
        </div>
      </div>
    </div>
  );
}
