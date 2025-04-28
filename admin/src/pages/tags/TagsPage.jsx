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
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import AddTagDialog from "../../components/AddTagDialog";

function TagsPage() {
  const [search, setSearch] = useState("")
  const [tags, setTags] = useState([])
  const [open, setOpen] = useState(false);
  // const [newTagName, setNewTagName] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  async function fetchTags(){
    const response = await fetch("http://localhost:5001/tags", {
      method: "GET",
      headers: {
        "content-type": 'application/json'
      },
    })
    const data = await response.json();
    setTags(data)
  };

  useEffect(() => {
    fetchTags();
  }, [])

  async function handleDelete(tagId){

    const response = await fetch(`http://localhost:5001/tags/dlt/${tagId}`,{
	    method: 'DELETE',

    })
    try{
      if(response.ok){
        fetchTags();
        setSnackbarMessage("Tag deleted successfully!");
        setSnackbarOpen(true);
      }else {
        console.error('Failed to delete tag');
      }

    }catch (error) {
      console.error('Error while deleting tag:', error);
    }
  }

  async function handleAddTag(tagName){
    
    const response = await fetch('http://localhost:5001/tags/add', {
      method: 'POST',
      headers: {
        'content-type' : 'application/json'
      },
      body: JSON.stringify({tag_name: tagName})
      
    });
    
    try {
      if (response.ok) {
        fetchTags();
        setSnackbarMessage("Tag added successfully!");
        setSnackbarOpen(true);
        setOpen(false); 
      } else {
        console.error('Failed to add a tag');
      }
    } catch (error) {
      console.error('Error while adding tag:', error);
    }
  }
  
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight="bold">
          Tags
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
          Add Tag
        </Button>
      </Box>

      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: { xs: "100%", md: 300, lg: 400 },
        }}
      >
        <SearchIcon sx={{ ml: 1 }} />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tags
              .filter((tag) =>
                tag.tag_name.toLowerCase().includes(search.toLowerCase())
              )
              .map((tag) => (
                <TableRow key={tag.tag_id}>
                  <TableCell component="th" scope="row">
                    {tag.tag_name}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={()=>handleDelete(tag.tag_id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddTagDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={(newTagName) => handleAddTag(newTagName)}
      />
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
