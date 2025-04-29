import { useState, useEffect } from "react"
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
  Stack,
  Tooltip,
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import AddTagDialog from "../../components/AddTagDialog"

function TagsPage() {
  const [search, setSearch] = useState("")
  const [tags, setTags] = useState([])
  const [open, setOpen] = useState(false)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")

  async function fetchTags() {
    const response = await fetch("http://localhost:5001/tags", {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
    const data = await response.json()
    setTags(data)
  }

  useEffect(() => {
    fetchTags()
  }, [])

  async function handleDelete(tagId) {
    const response = await fetch(`http://localhost:5001/tags/dlt/${tagId}`, {
      method: "DELETE",
    })
    try {
      if (response.ok) {
        fetchTags()
        setSnackbarMessage("Tag deleted successfully!")
        setSnackbarOpen(true)
      } else {
        console.error("Failed to delete tag")
      }
    } catch (error) {
      console.error("Error while deleting tag:", error)
    }
  }

  async function handleAddTag(tagName) {
    const response = await fetch("http://localhost:5001/tags/add", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ tag_name: tagName }),
    })
    try {
      if (response.ok) {
        fetchTags()
        setSnackbarMessage("Tag added successfully!")
        setSnackbarOpen(true)
        setOpen(false)
      } else {
        console.error("Failed to add a tag")
      }
    } catch (error) {
      console.error("Error while adding tag:", error)
    }
  }

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
          Tags
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
          sx={{ padding: "8px 16px", fontSize: "16px" }}
        >
          Add Tag
        </Button>
      </Box>

      {/* Search Bar */}
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: { xs: "100%", sm: 400, md: 500 },
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.5)",
          borderRadius: "8px",
          backgroundColor: "#1E1E1E",
          mb: 3,
        }}
      >
        <SearchIcon sx={{ color: "gray", ml: 1 }} />
        <InputBase
          sx={{ ml: 1, flex: 1, color: "white" }}
          placeholder="Search tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Paper>

      {/* Tags Table */}
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
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>Name</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold", color: "white" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tags
              .filter((tag) =>
                tag.tag_name.toLowerCase().includes(search.toLowerCase())
              )
              .map((tag) => (
                <TableRow
                  hover
                  key={tag.tag_id}
                  sx={{
                    backgroundColor: "#1E1E1E",
                    "&:hover": {
                      backgroundColor: "#2C2C2C",
                    },
                  }}
                >
                  <TableCell sx={{ color: "#e0e0e0" }}>{tag.tag_name}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Tooltip title="Edit" arrow>
                        <IconButton sx={{ color: "#90caf9" }}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete" arrow>
                        <IconButton sx={{ color: "#f48fb1" }} onClick={() => handleDelete(tag.tag_id)}>
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

      {/* Add Tag Dialog */}
      <AddTagDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(newTagName) => handleAddTag(newTagName)}
      />

      {/* Snackbar for notifications */}
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
  )
}

export default TagsPage