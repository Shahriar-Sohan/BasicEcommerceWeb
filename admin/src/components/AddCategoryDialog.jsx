import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Stack,
    Slide,
  } from "@mui/material";
  import { useState } from "react";
  
  function AddCategoryDialog({ open, onClose, onSubmit }) {
    const [categoryName, setCategoryName] = useState("");
    const [description, setDescription] = useState("");
  
    const handleAddClick = () => {
      if (categoryName.trim()) {
        onSubmit(categoryName, description);
        setCategoryName("");
        setDescription("");
      }
    };
  
    return (
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="sm"
        TransitionComponent={Slide} // Apply Slide animation
        direction="up"  // Slide from the bottom to top
        sx={{
          "& .MuiDialog-paper": { backgroundColor: "#1E1E1E", color: "white" },
        }}
      >
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          <Stack spacing={2}>
            <TextField
              label="Category Name"
              fullWidth
              variant="outlined"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              InputLabelProps={{ style: { color: "gray" } }}
              InputProps={{ style: { color: "white" } }}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              InputLabelProps={{ style: { color: "gray" } }}
              InputProps={{ style: { color: "white" } }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={onClose} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddClick} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  
  export default AddCategoryDialog;