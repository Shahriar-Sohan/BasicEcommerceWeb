import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";

const AddTagDialog = ({ open, onClose, onSubmit }) => {
  const [newTagName, setNewTagName] = useState("");

  const handleAddClick = () => {
    if (newTagName.trim()) {
      onSubmit(newTagName);
      setNewTagName("");  // Clear input field
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Tag</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Tag Name"
          fullWidth
          value={newTagName}
          onChange={(e) => setNewTagName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddClick}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTagDialog;
