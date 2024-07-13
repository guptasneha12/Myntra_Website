import React from "react";
import "./PostDetail.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PostDetail({ item, toggleDetails }) {
  const navigate = useNavigate();

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const removePost = (postId) => {
    console.log(postId)
    if (window.confirm("Do you really want to delete this post ?")) {
      fetch(`http://localhost:5000/deletePost/${postId}`, {
        method: "delete",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          toggleDetails();
          navigate("/");
          notifyB(result.message);
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
          notifyA("Failed to delete post.");
        });
    }
  };

  return (
    <div className="showComment">
      <div className="container">
        <div className="postPic">
          {item.photo && (item.photo.endsWith('.mp4') || item.photo.endsWith('.webm') || item.photo.endsWith('.ogg')) ? (
            <video controls className="post-detail-media">
              <source src={item.photo} type={item.photo.endsWith('.mp4') ? "video/mp4" : item.photo.endsWith('.webm') ? "video/webm" : "video/ogg"} />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={item.photo} alt="Post" className="post-detail-media" />
          )}
        </div>
        <div className="details">
          <div className="card-header" style={{ borderBottom: "1px solid #00000029" }}>
            <div className="card-pic">
              <img
                src="https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
                alt=""
              />
            </div>
            <h5>{item.postedBy.name}</h5>
            <div
              className="deletePost"
              onClick={() => {
                removePost(item._id);
              }}
            >
              <span className="material-symbols-outlined">delete</span>
            </div>
          </div>

          <div className="comment-section" style={{ borderBottom: "1px solid #00000029" }}>
            {item.comments.map((comment) => (
              <p key={comment._id} className="comm">
                <span className="commenter" style={{ fontWeight: "bolder" }}>
                  {comment.postedBy.name}{" "}
                </span>
                <span className="commentText">{comment.comment}</span>
              </p>
            ))}
          </div>

          <div className="card-content">
            <p>{item.likes.length} Likes</p>
            <p>{item.body}</p>
          </div>

          <div className="add-comment">
            <span className="material-symbols-outlined">mood</span>
            <input
              type="text"
              placeholder="Add a comment"
            />
            <button className="comment">
              Post
            </button>
          </div>
        </div>
      </div>
      <div
        className="close-comment"
        onClick={() => {
          toggleDetails();
        }}
      >
        <span className="material-symbols-outlined material-symbols-outlined-comment">
          close
        </span>
      </div>
    </div>
  );
}
