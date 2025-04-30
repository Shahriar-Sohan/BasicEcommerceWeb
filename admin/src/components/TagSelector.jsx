import { Check as CheckIcon } from "@mui/icons-material";
import { Chip, Typography, Box } from "@mui/material";

function TagSelector({ availableTags, selectedTags, onChange }) {
  const toggleTag = (tagId) => {
    if (selectedTags.includes(tagId)) {
      onChange(selectedTags.filter((id) => id !== tagId));
    } else {
      onChange([...selectedTags, tagId]);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Typography variant="subtitle2" fontWeight="medium" color="white">
        Select Tags
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={2}>
        {availableTags.map((tag) => {
          const isSelected = selectedTags.includes(tag.tag_id);

          return (
            <Chip
              key={tag.tag_id}
              label={
                <>
                  {isSelected && (
                    <CheckIcon sx={{ mr: 1, fontSize: "16px" }} />
                  )}
                  {tag.tag_name}
                </>
              }
              variant={isSelected ? "filled" : "outlined"}
              sx={{
                cursor: "pointer",
                px: 2,
                py: 1.5,
                fontWeight: "bold",
                backgroundColor: isSelected ? "primary.main" : "background.paper",
                color: isSelected ? "primary.contrastText" : "text.primary",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: isSelected ? "primary.dark" : "grey.800",
                },
              }}
              onClick={() => toggleTag(tag.tag_id)}
            />
          );
        })}
      </Box>

      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        {selectedTags.length} tags selected
      </Typography>
    </Box>
  );
}

export default TagSelector;