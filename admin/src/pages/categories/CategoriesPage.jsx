import { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Alert
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

function CategoriesPage() {
  const [search, setSearch] = useState("");
  const [fetchedCategories, setFetchedCategories] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5001/categories");
      const data = await response.json();
      setFetchedCategories(data);
    } catch (error) {
      console.error("Error while fetching categories", error);
    }
  };

  const handleDeleteCategory = (categoryId) => {
    fetch(`http://localhost:5001/categories/dlt/${categoryId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          fetchCategories();
          setSnackbarMessage("Category deleted successfully!");
          setSnackbarOpen(true);
        } else {
          console.error("Failed to delete category");
        }
      })
      .catch((error) => console.error("Error while deleting category:", error));
  };

  const handleAddCategory = () => {
    fetch("http://localhost:5001/categories/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCategory),
    })
      .then((response) => {
        if (response.ok) {
          setNewCategory({ name: "", description: "" });
          fetchCategories();
          setOpenAddModal(false);
          setSnackbarMessage("Category added successfully!");
          setSnackbarOpen(true);
        } else {
          console.error("Failed to add category");
        }
      })
      .catch((error) => console.error("Error while adding category:", error));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={3}
      p={3}
      sx={{ backgroundColor: "#121212", minHeight: "100vh" }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold" color="white">
          Categories
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenAddModal(true)}
          sx={{ fontSize: "16px", padding: "8px 16px" }}
        >
          Add Category
        </Button>
      </Box>

      {/* Search Bar */}
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          width: { xs: "100%", sm: 400, md: 500 },
          p: "4px 8px",
          mb: 3,
          borderRadius: "8px",
          backgroundColor: "#1E1E1E",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.5)",
        }}
      >
        <SearchIcon sx={{ color: "gray", mr: 1 }} />
        <InputBase
          sx={{ flex: 1, color: "white" }}
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Paper>

      {/* Categories Table */}
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: "10px",
          overflow: "hidden",
          backgroundColor: "#1E1E1E",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.5)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#2C2C2C" }}>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Description</TableCell>
              <TableCell align="right" sx={{ color: "white", fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fetchedCategories
              .filter((cat) =>
                cat.category_name.toLowerCase().includes(search.toLowerCase())
              )
              .map((category) => (
                <TableRow
                  key={category.category_id}
                  sx={{
                    backgroundColor: "#1E1E1E",
                    "&:hover": { backgroundColor: "#2C2C2C" },
                  }}
                >
                  <TableCell sx={{ color: "#e0e0e0" }}>
                    {category.category_name}
                  </TableCell>
                  <TableCell sx={{ color: "#bdbdbd" }}>
                    {category.category_description}
                  </TableCell>
                  <TableCell align="right">
                    <Box display="flex" justifyContent="flex-end" gap={1}>
                      <IconButton sx={{ color: "#90caf9" }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        sx={{ color: "#f48fb1" }}
                        onClick={() => handleDeleteCategory(category.category_id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Category Modal */}
      <Dialog
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        fullWidth
        maxWidth="sm"
        sx={{ "& .MuiDialog-paper": { backgroundColor: "#1E1E1E", color: "white" } }}
      >
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Category Name"
            fullWidth
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            InputLabelProps={{ style: { color: "gray" } }}
            InputProps={{ style: { color: "white" } }}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={newCategory.description}
            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            InputLabelProps={{ style: { color: "gray" } }}
            InputProps={{ style: { color: "white" } }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddModal(false)} variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleAddCategory}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CategoriesPage;