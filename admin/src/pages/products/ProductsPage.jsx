import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

function ProductsPage() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("http://localhost:5001/products");
        if (!res.ok) throw new Error("Failed to fetch products.");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase().trim())
  );

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product.");
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      alert(error.message);
    }
  };

  if (loading) {
    return <Typography variant="h6" align="center" color="white">Loading products...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error" align="center">{error}</Typography>;
  }

  return (
    <Box display="flex" flexDirection="column" gap={3} p={3} sx={{ backgroundColor: "#121212", minHeight: "100vh" }}>
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold" color="white">
          Products
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          to="/dashboard/products/new"
          sx={{ padding: "6px 16px", fontSize: "16px" }}
        >
          Add New Product
        </Button>
      </Box>

      {/* Search Bar */}
      <Box display="flex" justifyContent="flex-start" mb={3}>
        <TextField
          placeholder="Search products..."
          variant="outlined"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "gray" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            maxWidth: 400,
            width: "100%",
            backgroundColor: "#1E1E1E",
            borderRadius: "8px",
            color: "white",
            "& .MuiOutlinedInput-root": {
              color: "white",
              borderColor: "#333",
            },
            "& .MuiInputLabel-root": {
              color: "gray",
            },
          }}
        />
      </Box>

      {/* Products Table */}
      <TableContainer component={Paper} sx={{ backgroundColor: "#1E1E1E", borderRadius: "10px" }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#2C2C2C" }}>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>Product</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>Category</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>Gender</TableCell>
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>Brand</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold", color: "white" }}>Price</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>Stock</TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold", color: "white" }}>Status</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold", color: "white" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <TableRow
                  key={product.id}
                  sx={{
                    backgroundColor: "#1E1E1E",
                    "&:hover": {
                      backgroundColor: "#333333",
                    },
                  }}
                >
                  <TableCell sx={{ color: "#e0e0e0" }}>{product.title}</TableCell>
                  <TableCell sx={{ color: "#bdbdbd" }}>{product.category}</TableCell>
                  <TableCell sx={{ color: "#bdbdbd" }}>{product.gender}</TableCell>
                  <TableCell sx={{ color: "#bdbdbd" }}>{product.brand}</TableCell>
                  <TableCell align="right" sx={{ color: "#bdbdbd" }}>
                    {product.discount > 0 ? (
                      <Box display="flex" flexDirection="column" alignItems="flex-end">
                        <Typography variant="body2" sx={{ textDecoration: "line-through", color: "gray" }}>
                          ${product.price}
                        </Typography>
                        <Typography fontWeight="medium">
                          ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                        </Typography>
                      </Box>
                    ) : (
                      `$${product.price.toFixed(2)}`
                    )}
                  </TableCell>
                  <TableCell align="center" sx={{ color: "#bdbdbd" }}>{product.stock}</TableCell>
                  <TableCell align="center">
                    <Box display="flex" flexWrap="wrap" justifyContent="center" gap={1}>
                      {product.featured && <Chip label="Featured" color="warning" variant="outlined" />}
                      {product.new && <Chip label="New" color="success" variant="outlined" />}
                      {product.stock <= 30 && <Chip label="Low Stock" color="error" variant="outlined" />}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Box display="flex" justifyContent="flex-end" gap={1}>
                      <IconButton component={Link} to={`/dashboard/products/${product.id}`} aria-label="edit" sx={{ color: "#90caf9" }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(product.id)} aria-label="delete" sx={{ color: "#f48fb1" }}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Typography>No products found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ProductsPage;