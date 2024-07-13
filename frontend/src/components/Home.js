import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
  const picLink =
    'https://cdn-icons-png.flaticon.com/128/3177/3177440.png';
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState('');
  const [show, setShow] = useState(false);
  const [item, setItem] = useState(null);
  const [user, setUser] = useState(null);

  // Toast functions to display any error
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    const storedUser = localStorage.getItem('user');
    if (!token || !storedUser) {
      navigate('/signup');
    } else {
      setUser(JSON.parse(storedUser));
      fetchPosts(token);
    }
  }, [navigate]);

  const fetchPosts = (token) => {
    fetch('http://localhost:5000/allposts', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((err) => console.log(err));
  };

  const openFullScreen = (media) => {
    navigate('/fullscreen', { state: { media } });
  };

  const toggleComment = (post) => {
    setShow(!show);
    setItem(post);
  };

  const likePost = (id) => {
    fetch('http://localhost:5000/like', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((post) =>
          post._id === result._id ? result : post
        );
        setData(newData);
        notifyB('Added To Favorites');
      })
      .catch((err) => console.log(err));
  };

  const unlikePost = (id) => {
    fetch('http://localhost:5000/unlike', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({ postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((post) =>
          post._id === result._id ? result : post
        );
        setData(newData);
        notifyA('Removed from Favorites');
        navigate('/');
      })
      .catch((err) => console.log(err));
  };

  const makeComment = (text, id) => {
    fetch('http://localhost:5000/comment', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('jwt'),
      },
      body: JSON.stringify({ text, postId: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((post) =>
          post._id === result._id ? result : post
        );
        setData(newData);
        setComment('');
        notifyB('Comment Posted');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='home'>
      {data.map((post, index) => (
        <div className='card' key={post._id}>
          <div className='card-header'>
            <div className='card-pic'>
              <img
                src={post.postedBy.photo ? post.postedBy.photo : picLink}
                alt='Profile Pic'
              />
            </div>
            <h5>
              <Link to={`/profile/${post.postedBy._id}`}>
                {post.postedBy.name}
              </Link>
            </h5>
          </div>
          <div className='card-image'>
            {post.photo.endsWith('.mp4') ||
            post.photo.endsWith('.webm') ||
            post.photo.endsWith('.ogg') ? (
              <video
                controls
                src={post.photo}
                alt='Video'
                onClick={() => openFullScreen(post.photo)}
              />
            ) : (
              <img
                src={post.photo}
                alt='Post'
                onClick={() => openFullScreen(post.photo)}
              />
            )}
          </div>
          <div className='card-content'>
            {post.likes.includes(user && user._id) ? (
              <span
                className='material-symbols-outlined material-symbols-outlined-red'
                onClick={() => unlikePost(post._id)}
              >
                favorite
              </span>
            ) : (
              <span
                className='material-symbols-outlined'
                onClick={() => likePost(post._id)}
              >
                favorite
              </span>
            )}
            <p>{post.likes.length} Likes</p>
            <p>{post.body}</p>
            <p
              style={{ fontWeight: 'bold', cursor: 'pointer' }}
              onClick={() => toggleComment(post)}
            >
              View all comments
            </p>
          </div>
          <div className='add-comment'>
            <span className='material-symbols-outlined'>sentiment_satisfied</span>
            <input
              type='text'
              placeholder='Add a comment'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button
              className='comment'
              onClick={() => makeComment(comment, post._id)}
            >
              Post
            </button>
          </div>
        </div>
      ))}
      {show && item && (
        <div className='showComment'>
          <div className='container'>
            <div className='postPic'>
              {item.photo.endsWith('.mp4') ||
              item.photo.endsWith('.webm') ||
              item.photo.endsWith('.ogg') ? (
                <video controls src={item.photo} alt='Video' />
              ) : (
                <img src={item.photo} alt='' />
              )}
            </div>
            <div className='details'>
              <div
                className='card-header'
                style={{ borderBottom: '1px solid #00000029' }}
              >
                <div className='card-pic'>
                  <img
                    src='https://media.istockphoto.com/id/1318988756/photo/studio-portrait-of-a-young-businesswoman.jpg?s=612x612&w=is&k=20&c=UUdmfJOnKOGPKW4HYwxFkqth0KcTvh-wU9h_hfH4LVc='
                    alt='Profile Pic'
                  />
                </div>
                <h5>{item.postedBy.name}</h5>
              </div>
              <div
                className='comment-section'
                style={{ borderBottom: '1px solid #00000029' }}
              >
                {item.comments.map((comment, i) => (
                  <p className='comm' key={i}>
                    <span
                      className='commenter'
                      style={{ fontWeight: 'bolder' }}
                    >
                      {comment.postedBy.name}
                    </span>
                    <span className='commentText'> {comment.comment}</span>
                  </p>
                ))}
              </div>
              <div className='card-content'>
                <p>{item.likes.length} Likes</p>
                <p>{item.body}</p>
              </div>
              <div className='add-comment'>
                <span className='material-symbols-outlined'>
                  sentiment_satisfied
                </span>
                <input
                  type='text'
                  placeholder='Add a comment'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  className='comment'
                  onClick={() => {
                    makeComment(comment, item._id);
                    toggleComment();
                  }}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
          <div className='close-comment' onClick={toggleComment}>
            <span className='material-symbols-outlined material-symbols-outlined-comment'>
              close
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
