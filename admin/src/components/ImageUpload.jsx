"use client"

import { useState } from "react"
import { Button, IconButton, Box, Typography } from "@mui/material"
import { AddCircle as ImagePlus, Delete as Trash2 } from "@mui/icons-material"
import placeholderImg from "../assets/placeholder.svg"

// No import needed; we'll use <img> tags instead

function ImageUpload({ value, onChange }) {
  const [isUploading, setIsUploading] = useState(false)

  // In a real application, this would upload to your storage service
  const handleUpload = () => {
    setIsUploading(true)

    // Simulate upload delay
    setTimeout(() => {
      // Use a placeholder image for demo purposes
      onChange(placeholderImg)
      setIsUploading(false)
    }, 1000)
  }

  const handleRemove = () => {
    onChange("")
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, width: '100%' }}>
        {value ? (
          <Box sx={{ position: 'relative', width: '100%', maxWidth: 300, aspectRatio: '1', overflow: 'hidden', borderRadius: '8px', border: '1px solid' }}>
            <img src={value || placeholderImg} alt="Product image" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <IconButton
              sx={{ position: 'absolute', top: 2, right: 2 }}
              onClick={handleRemove}
              color="error"
            >
              <Trash2 sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>
        ) : (
          <Box sx={{ height: 256, width: '100%', maxWidth: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed', borderRadius: '8px' }}>
            <ImagePlus sx={{ fontSize: 40, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">Upload product image</Typography>
          </Box>
        )}
      </Box>

      {!value && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleUpload}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload Image"}
        </Button>
      )}
    </Box>
  )
}

export default ImageUpload
