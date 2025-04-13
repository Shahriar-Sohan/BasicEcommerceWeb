"use client"

import ProductForm from "../../components/ProductForm.jsx"
import { Box, Button, IconButton, Typography } from "@mui/material"
import { ArrowBack } from "@mui/icons-material"
import { Link, useParams } from "react-router-dom"

function EditProductPage() {
  const { productId } = useParams()

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Box display="flex" alignItems="center" gap={2}>
        <IconButton component={Link} to="/dashboard/products">
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" fontWeight="bold">
          Edit Product
        </Typography>
      </Box>
      <ProductForm productId={productId} />
    </Box>
  )
}

export default EditProductPage
