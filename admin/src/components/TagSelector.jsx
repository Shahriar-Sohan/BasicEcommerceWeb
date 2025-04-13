"use client"

import { Check as CheckIcon } from "@mui/icons-material"
import { Chip, Typography, Box } from "@mui/material"

function TagSelector({ availableTags, selectedTags, onChange }) {
  const toggleTag = (tagId) => {
    if (selectedTags.includes(tagId)) {
      onChange(selectedTags.filter((id) => id !== tagId))
    } else {
      onChange([...selectedTags, tagId])
    }
  }

  return (
    <Box sx={{ spaceY: 4 }}>
      <Typography variant="subtitle2" fontWeight="medium">Select Tags</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {availableTags.map((tag) => {
          const isSelected = selectedTags.includes(tag.id)

          return (
            <Chip
              key={tag.id}
              label={
                <>
                  {isSelected && <CheckIcon sx={{ mr: 1, fontSize: '16px' }} />}
                  {tag.name}
                </>
              }
              variant={isSelected ? "filled" : "outlined"}
              sx={{
                cursor: 'pointer',
                px: 3,
                py: 1.5,
                backgroundColor: isSelected ? 'primary.main' : 'background.paper',
                color: isSelected ? 'primary.contrastText' : 'text.primary',
              }}
              onClick={() => toggleTag(tag.id)}
            />
          )
        })}
      </Box>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {selectedTags.length} tags selected
      </Typography>
    </Box>
  )
}

export default TagSelector
