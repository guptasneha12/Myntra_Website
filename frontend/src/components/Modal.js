import React from "react";
import { RiCloseLine } from "react-icons/ri";
import "./Modal.css";
import { useNavigate } from "react-router-dom";

export default function Modal({ setModalOpen }) {
  const navigate = useNavigate();
  return (
    <div className="darkBg" onClick={() => setModalOpen(false)}>
      <div className="centered">
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          {/* modal header */}
          <div className="modalHeader">
            <h5 className="heading">Confirm</h5>
          </div>
          <button className="closeBtn" onClick={() => setModalOpen(false)}>
            <RiCloseLine />
          </button>
          {/* modal content */}
          <div className="modalContent">Are you sure you want to log out?</div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button
                className="logOutBtn"
                onClick={() => {
                  setModalOpen(false);
                  localStorage.clear();
                  navigate("./signin");
                }}
              >
                Log Out
              </button>

              <button className="cancelBtn" onClick={() => setModalOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
