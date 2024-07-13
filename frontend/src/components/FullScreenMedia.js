import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './FullScreenMedia.css';
import { useMotionValue, useTransform, useAnimation } from "framer-motion";
import { motion } from "framer-motion";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const style = { 
  backgroundColor: "#55ccff", 
  boxShadow: "5px 10px 18px #888888", 
  borderRadius: 10, 
  height: 300,
  width: 300,
  marginLeft: 10,
  marginRight: 200
};

const FullScreenMedia = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { media } = location.state || {};
  const motionValue = useMotionValue(0);
  const rotateValue = useTransform(motionValue, [-200, 200], [-50, 50]);
  const opacityValue = useTransform(
    motionValue,
    [-200, -150, 0, 150, 200],
    [0, 1, 1, 1, 0]
  );
  const animateControls = useAnimation();

  useEffect(() => {
    const startAnimation = async () => {
      await animateControls.start({ x: motionValue.get() });
    };
    startAnimation();
  }, [animateControls, motionValue]);

  const closeMedia = () => {
    navigate(-1);
  };

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const handleSwipeLeft = async () => {
    try {
      await animateControls.start({ x: -200 });
      notifyA('Disliked');
    } catch (error) {
      console.error("Error in handleSwipeLeft:", error);
      notifyA('Error disliking');
    }
  };

  const handleSwipeRight = async () => {
    try {
      await animateControls.start({ x: 200 });
      notifyB('Liked');
    } catch (error) {
      console.error("Error in handleSwipeRight:", error);
      notifyA('Disliked');
    }
  };

  const handleDragEnd = async (event, info) => {
    try {
      if (Math.abs(info.point.x) <= 150) {
        await animateControls.start({ x: 0 });
      } else {
        if (info.point.x < 0) {
          await handleSwipeLeft();
        } else {
          await handleSwipeRight();
        }
        navigate('/');
      }
    } catch (error) {
      console.error("Error during drag end:", error);
    }
  };

  if (!media) {
    return <div>Loading...</div>;
  }

  return (
    <div className='fullscreen-modal' onClick={closeMedia}>
      <div className='fullscreen-content' onClick={(e) => e.stopPropagation()}>
        <span className='close' onClick={closeMedia}>&times;</span>
        {
          media.endsWith('.mp4') || media.endsWith('.webm') || media.endsWith('.ogg') ? (
            <video controls src={media} className='fullscreen-media' />
          ) : (
            <img src={media} alt='Full View' className='fullscreen-media' />
          )
        }
      </div>
      <motion.div
        drag="x"
        dragConstraints={{ left: -1000, right: 1000 }}
        style={{
          ...style,
          backgroundImage: media ? `url(${media})` : 'none',
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          x: motionValue,
          rotate: rotateValue,
          opacity: opacityValue
        }}
        onDragEnd={handleDragEnd}
      />
    </div>
  );
};

export default FullScreenMedia;
