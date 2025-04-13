"use client"

import { useState } from "react"
import {
  Box,
  Button,
  Chip,
  IconButton,
  Stack,
  TextField,
  Typography
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import CloseIcon from "@mui/icons-material/Close"

function VariantManager({ variants, onChange }) {
  const [size, setSize] = useState("")
  const [color, setColor] = useState("")

  const handleAddVariant = () => {
    if (size && color) {
      const newVariant = {
        id: Date.now(),
        size,
        color,
      }

      onChange([...variants, newVariant])
      setSize("")
      setColor("")
    }
  }

  const handleRemoveVariant = (variantId) => {
    onChange(variants.filter((v) => v.id !== variantId))
  }

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={2}>
        <TextField
          label="Size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          placeholder="e.g., S, M, L, XL"
          fullWidth
        />
        <TextField
          label="Color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="e.g., Black, White, Red"
          fullWidth
        />
      </Box>

      <Button
        variant="outlined"
        onClick={handleAddVariant}
        startIcon={<AddIcon />}
        disabled={!size || !color}
      >
        Add Variant
      </Button>

      <Box mt={2}>
        <Typography variant="subtitle1" gutterBottom>
          Current Variants
        </Typography>
        {variants.length === 0 ? (
          <Typography variant="body2" color="text.secondary">
            No variants added yet. Add size and color combinations above.
          </Typography>
        ) : (
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {variants.map((variant) => (
              <Chip
                key={variant.id}
                label={`${variant.size} / ${variant.color}`}
                onDelete={() => handleRemoveVariant(variant.id)}
                deleteIcon={<CloseIcon />}
                variant="outlined"
              />
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  )
}

export default VariantManager
