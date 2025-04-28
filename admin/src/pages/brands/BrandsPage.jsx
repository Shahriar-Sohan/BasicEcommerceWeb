import { useState, useEffect } from "react";
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
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AddBrandDialog = ({ open, onClose, onAdd }) => {
  const [brandName, setBrandName] = useState("");

  const handleAddClick = () => {
    if (brandName.trim()) {
      onAdd(brandName);
      setBrandName("");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Brand</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Brand Name"
          fullWidth
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddClick}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

function BrandsPage() {
  const [search, setSearch] = useState("");
  const [brands, setBrands] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openAddBrandDialog, setOpenAddBrandDialog] = useState(false);

  // Fetch brands 
  const fetchBrands = async () => {
    try {
      const response = await fetch("http://localhost:5001/brands");
      if (!response.ok) {
        throw new Error(`Failed to fetch brands: ${response.status}`);
      }
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error("Error fetching brands:", error);
      setSnackbarMessage("Failed to load brands!");
      setSnackbarOpen(true);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  // Handle delete brand
  const handleDeleteBrand = (brandId) => {
    fetch(`http://localhost:5001/brands/dlt/${brandId}`, {
      method: 'DELETE',
    })
      .then((response) => response.ok ? fetchBrands() : console.error('Failed to delete brand'))
      .catch((error) => console.error('Error while deleting brand:', error));
    setSnackbarMessage('Brand deleted successfully!');
    setSnackbarOpen(true);
  };

  // Handle adding a brand
  const handleAddBrand = (brandName) => {
    fetch("http://localhost:5001/brands/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ brand_name: brandName }),
    })
      .then((response) => response.ok ? fetchBrands() : console.error("Failed to add brand"))
      .catch((error) => console.error("Error while adding brand:", error));
    setSnackbarMessage("Brand added successfully!");
    setSnackbarOpen(true);
    setOpenAddBrandDialog(false);
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight="bold">
          Brands
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenAddBrandDialog(true)}
        >
          Add Brand
        </Button>
      </Box>

      <AddBrandDialog
        open={openAddBrandDialog}
        onClose={() => setOpenAddBrandDialog(false)}
        onAdd={handleAddBrand}
      />

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
          placeholder="Search brands..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brands
              .filter((brand) =>
                brand.brand_name.toLowerCase().includes(search.toLowerCase())
              )
              .map((brand) => (
                <TableRow key={brand.brand_id}>
                  <TableCell component="th" scope="row">
                    {brand.brand_name}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteBrand(brand.brand_id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

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

export default BrandsPage;