import React, { useState } from "react";
import Modal from "react-modal";
import { observer } from "mobx-react";

const NotificationModal = ({ userStore }) => {
  const customStyles = {
    content: {
      top: "20%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  function closeModal() {
    userStore.setIsNotification(false);
  }
  return (
    <Modal
      isOpen={userStore.isNotification}
      style={customStyles}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
      <button className="btn btn-primary float-right" onClick={closeModal}>
        x
      </button>
      <div>{userStore.notification}</div>
    </Modal>
  );
};

export default observer(NotificationModal);
