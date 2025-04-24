import { useState } from "react"
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

// Mock data for tags
//const tags = [
//  { id: 1, name: "Summer" },
//  { id: 2, name: "Winter" },
//  { id: 3, name: "Casual" },
//  { id: 4, name: "Formal" },
//  { id: 5, name: "Sport" },
//  { id: 6, name: "Outdoor" },
//  { id: 7, name: "Sustainable" },
//  { id: 8, name: "Limited Edition" },
//]

function TagsPage() {
  const [search, setSearch] = useState("")
useEffect(async ()=>{
const response = await fetch("http://localhost:5001/tags",{
	method: "GET",
	header: {
"content-type" = 'application/json'
	},
})
	
},[])
	useEffect(async ()=>{
	const response = await fetch()
	},[])
	const tags = response;
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
                tag.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((tag) => (
                <TableRow key={tag.id}>
                  <TableCell component="th" scope="row">
                    {tag.name}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                    <IconButton>
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
