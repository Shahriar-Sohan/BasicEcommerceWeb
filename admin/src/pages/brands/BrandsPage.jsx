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

// Mock data for brands
//const brands = [
//  { id: 1, name: "RivalRay" },
  //{ id: 2, name: "DenimCo" },
  { id: 3, name: "Floralia" },
  { id: 4, name: "SportElite" },
  { id: 5, name: "WinterWarm" },
]

function BrandsPage() {
  const [search, setSearch] = useState("")

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight="bold">
          Brands
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add Brand
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
          placeholder="Search brands..."
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
            {brands
              .filter((brand) =>
                brand.name.toLowerCase().includes(search.toLowerCase())
              )
              .map((brand) => (
                <TableRow key={brand.id}>
                  <TableCell component="th" scope="row">
                    {brand.name}
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

export default BrandsPage
