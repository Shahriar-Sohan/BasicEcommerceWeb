import { useEffect, useState } from "react"
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
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import { Link } from "react-router-dom"

// const products = [
//   {
//     id: 1,
//     title: "Classic Cotton T-Shirt",
//     category: "Tops",
//     gender: "Men",
//     brand: "RivalRay",
//     price: 29.99,
//     discount: 0,
//     stock: 120,
//     featured: true,
//     new: false,
//   },
//   {
//     id: 2,
//     title: "Slim Fit Jeans",
//     category: "Pants",
//     gender: "Men",
//     brand: "DenimCo",
//     price: 59.99,
//     discount: 10,
//     stock: 85,
//     featured: false,
//     new: true,
//   },
//   {
//     id: 3,
//     title: "Summer Floral Dress",
//     category: "Dresses",
//     gender: "Women",
//     brand: "Floralia",
//     price: 49.99,
//     discount: 15,
//     stock: 42,
//     featured: true,
//     new: true,
//   },
//   {
//     id: 4,
//     title: "Athletic Performance Shorts",
//     category: "Shorts",
//     gender: "Unisex",
//     brand: "SportElite",
//     price: 34.99,
//     discount: 0,
//     stock: 67,
//     featured: false,
//     new: false,
//   },
//   {
//     id: 5,
//     title: "Wool Winter Sweater",
//     category: "Tops",
//     gender: "Women",
//     brand: "WinterWarm",
//     price: 79.99,
//     discount: 20,
//     stock: 28,
//     featured: true,
//     new: false,
//   },
// ]



function ProductsPage() {
  const [search, setSearch] = useState("")
  const [products, setProducts] = useState([])


  useEffect(()=>{
    async function fetchProducts(){
      try {
        const res = await fetch('http://localhost:5001/products')
        if(!res.ok) throw new Error("failed to fetch")
        const data = await res.json()
      setProducts(data)
      }catch(error){
        console.error('fetch error:', error)
      }
    }
    fetchProducts()
  },[])

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Box display="flex" flexDirection="column" gap={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight="bold">
          Products
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          component={Link}
          to="/dashboard/products/new"
        >
          Add New Product
        </Button>
      </Box>

      <TextField
        placeholder="Search products..."
        variant="outlined"
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ maxWidth: 400 }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Stock</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.gender}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell align="right">
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
                <TableCell align="center">{product.stock}</TableCell>
                <TableCell align="center">
                  <Box display="flex" flexWrap="wrap" justifyContent="center" gap={1}>
                    {product.featured && <Chip label="Featured" color="warning" variant="outlined" />}
                    {product.new && <Chip label="New" color="success" variant="outlined" />}
                    {product.stock <= 30 && <Chip label="Low Stock" color="error" variant="outlined" />}
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Box display="flex" justifyContent="flex-end" gap={1}>
                    <IconButton component={Link} to={`/dashboard/products/${product.id}`}>
                      <EditIcon />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default ProductsPage
