import React from "react";
import { observer } from "mobx-react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";

const NotificationModal = ({ userStore }) => {
  const customStyles = {
    top: "-70%",
  };

  function closeModal() {
    userStore.setIsNotification(false);
  }
  return (
    <Dialog
      style={customStyles}
      open={userStore.isNotification}
      onClose={closeModal}
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {userStore.notification}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default observer(NotificationModal);
