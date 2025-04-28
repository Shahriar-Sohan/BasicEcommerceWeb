import { useEffect, useState } from "react"
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
  Dialog, DialogActions, DialogContent, DialogTitle, TextField,
  Snackbar,
  Alert
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"


function CategoriesPage() {
  const [search, setSearch] = useState("")
  const [fetchedCategories, setFetchedCategories] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5001/categories");
      const data = await response.json();
      setFetchedCategories(data);
    } catch (error) {
      console.error("Error while fetching categories", error);
    }
  };

  // Delete category
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

  // Add category
  const handleAddCategory = () => {
    fetch("http://localhost:5001/categories/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight="bold">
          Categories
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenAddModal(true)}
        >
          Add Category
        </Button>
      </Box>

      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: { xs: "100%", md: 300, lg: 400 },
        }}
      >
        <SearchIcon sx={{ ml: 1 }} />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search categories..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fetchedCategories
              .filter((cat) =>
                cat.category_name.toLowerCase().includes(search.toLowerCase())
              )
              .map((category) => (
                <TableRow key={category.category_id}>
                  <TableCell component="th" scope="row">
                    {category.category_name}
                  </TableCell>
                  <TableCell>{category.category_description}</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteCategory(category.category_id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openAddModal} onClose={() => setOpenAddModal(false)}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Category Name"
            fullWidth
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          />
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={newCategory.description}
            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddModal(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddCategory}>
            Add
          </Button>
        </DialogActions>
      </Dialog>

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
