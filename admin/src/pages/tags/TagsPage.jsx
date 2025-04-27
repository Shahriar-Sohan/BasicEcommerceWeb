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
} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import AddIcon from "@mui/icons-material/Add"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"


function TagsPage() {
  const [search, setSearch] = useState("")
  const [tags, setTags] = useState([])

  useEffect(() => {
    (async function (){
      const response = await fetch("http://localhost:5001/tags", {
        method: "GET",
        header: {
          "content-type": 'application/json'
        },
      })
      const data = await response.json();
      setTags(data)
    })();

  }, [])

  function handleDelete(tagId){
    const response =  fetch(`http://localhost:5001/tags/dlt/${tagId}`,{
	    method: 'DELETE',

    })
  }
  
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight="bold">
          Tags
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
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
    </Box>
  )
}

export default TagsPage
