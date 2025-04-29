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
  Stack,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Add Brand Dialog
const AddBrandDialog = ({ open, onClose, onAdd }) => {
  const [brandName, setBrandName] = useState("");

  const handleAddClick = () => {
    if (brandName.trim()) {
      onAdd(brandName);
      setBrandName("");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm"
      sx={{ "& .MuiDialog-paper": { backgroundColor: "#1E1E1E", color: "white" } }}
    >
      <DialogTitle>Add New Brand</DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <TextField
          autoFocus
          margin="dense"
          label="Brand Name"
          fullWidth
          variant="outlined"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value)}
          InputLabelProps={{ style: { color: "gray" } }}
          InputProps={{ style: { color: "white" } }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="secondary">
          Cancel
        </Button>
        <Button onClick={handleAddClick} variant="contained">
          Add
        </Button>
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
  const handleDeleteBrand = async (brandId) => {
    try {
      const response = await fetch(`http://localhost:5001/brands/dlt/${brandId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchBrands();
        setSnackbarMessage("Brand deleted successfully!");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error while deleting brand:", error);
      setSnackbarMessage("Failed to delete brand!");
      setSnackbarOpen(true);
    }
  };

  // Handle adding a brand
  const handleAddBrand = async (brandName) => {
    try {
      const response = await fetch("http://localhost:5001/brands/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ brand_name: brandName }),
      });
      if (response.ok) {
        fetchBrands();
        setSnackbarMessage("Brand added successfully!");
        setSnackbarOpen(true);
        setOpenAddBrandDialog(false);
      }
    } catch (error) {
      console.error("Error while adding brand:", error);
      setSnackbarMessage("Failed to add brand!");
      setSnackbarOpen(true);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={3}
      p={3}
      sx={{ backgroundColor: "#121212", minHeight: "100vh" }}
    >
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold" color="white">
          Brands
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenAddBrandDialog(true)}
          sx={{ padding: "8px 16px", fontSize: "16px" }}
        >
          Add Brand
        </Button>
      </Box>

      {/* Add Brand Dialog */}
      <AddBrandDialog
        open={openAddBrandDialog}
        onClose={() => setOpenAddBrandDialog(false)}
        onAdd={handleAddBrand}
      />

      {/* Search Bar */}
      <Paper
        component="form"
        sx={{
          display: "flex",
          alignItems: "center",
          width: { xs: "100%", sm: 400, md: 500 },
          p: 2,
          borderRadius: "8px",
          backgroundColor: "#1E1E1E",
          boxShadow: "0px 2px 8px rgba(0,0,0,0.5)",
          mb: 3,
        }}
      >
        <SearchIcon sx={{ ml: 1, color: "gray" }} />
        <InputBase
          sx={{ ml: 1, flex: 1, color: "white" }}
          placeholder="Search brands..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Paper>

      {/* Brands Table */}
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
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>Brand Name</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold", color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {brands
              .filter((brand) =>
                brand.brand_name.toLowerCase().includes(search.toLowerCase())
              )
              .map((brand) => (
                <TableRow
                  hover
                  key={brand.brand_id}
                  sx={{
                    backgroundColor: "#1E1E1E",
                    "&:hover": {
                      backgroundColor: "#2C2C2C",
                    },
                  }}
                >
                  <TableCell sx={{ color: "#e0e0e0" }}>{brand.brand_name}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Tooltip title="Edit" arrow>
                        <IconButton sx={{ color: "#90caf9" }}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete" arrow>
                        <IconButton sx={{ color: "#f48fb1" }} onClick={() => handleDeleteBrand(brand.brand_id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Snackbar Notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled" onClose={() => setSnackbarOpen(false)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default BrandsPage;