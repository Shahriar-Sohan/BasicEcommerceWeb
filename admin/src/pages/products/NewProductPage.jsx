import ProductForm from "../../components/ProductForm.jsx"
import { ArrowBack } from "@mui/icons-material"
import { Box, IconButton } from "@mui/material"
import { Link } from "react-router-dom"

function NewProductPage() {
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Box display="flex" alignItems="center" gap={2}>
        <IconButton component={Link} to="/dashboard/products">
          <ArrowBack />
        </IconButton>
      </Box>
      <ProductForm />
    </Box>
  )
}

export default NewProductPage
