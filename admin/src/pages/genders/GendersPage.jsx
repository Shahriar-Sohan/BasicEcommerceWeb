import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    IconButton,
    Button,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Paper,
    InputBase,
    Snackbar,
    Alert,
} from "@mui/material";
import { Delete, Edit, Search as SearchIcon } from "@mui/icons-material";

const API_BASE = "http://localhost:5001";

const GendersPage = () => {
    const [genders, setGenders] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [editingGender, setEditingGender] = useState(null);
    const [genderName, setGenderName] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // 'success' or 'error'

    useEffect(() => {
        fetchGenders();
    }, []);

    useEffect(() => {
        if (!search) return setFiltered(genders);
        setFiltered(
            genders.filter((g) =>
                g.gender_name.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, genders]);

    const fetchGenders = async () => {
        try {
            const res = await fetch(`${API_BASE}/genders`);
            const data = await res.json();
            setGenders(data);
            setFiltered(data);
        } catch (err) {
            console.error("Error fetching genders", err);
        }
    };

    const openSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };

    const closeSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleSave = async () => {
        try {
            const method = editingGender ? "PUT" : "POST";
            const url = editingGender
                ? `${API_BASE}/genders/${editingGender.id}`
                : `${API_BASE}/genders/add`;

            await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: genderName }),
            });

            fetchGenders();
            closeDialog();
            openSnackbar("Gender saved successfully!", "success");
        } catch (err) {
            console.error("Error saving gender", err);
            openSnackbar("Error saving gender!", "error");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this gender?")) return;
        try {
            await fetch(`${API_BASE}/genders/dlt/${id}`, {
                method: "DELETE",
            });

            fetchGenders();
            openSnackbar("Gender deleted successfully!", "success");
        } catch (err) {
            console.error("Error deleting gender", err);
            openSnackbar("Error deleting gender!", "error");
        }
    };

    const openEditDialog = (gender) => {
        setEditingGender(gender);
        setGenderName(gender.gender_name);
        setOpenDialog(true);
    };

    const openAddDialog = () => {
        setEditingGender(null);
        setGenderName("");
        setOpenDialog(true);
    };

    const closeDialog = () => {
        setOpenDialog(false);
        setGenderName("");
        setEditingGender(null);
    };

    return (
        <Box sx={{ backgroundColor: "#121212", minHeight: "100vh", p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" fontWeight="bold" color="white">
                    Genders
                </Typography>
                <Button variant="contained" onClick={openAddDialog}>
                    Add Gender
                </Button>
            </Box>

            {/* Search Bar */}
            <Paper
                sx={{
                    mb: 2,
                    p: "2px 8px",
                    display: "flex",
                    alignItems: "center",
                    width: 300,
                    backgroundColor: "#1E1E1E",
                    color: "white",
                }}
            >
                <SearchIcon sx={{ mr: 1 }} />
                <InputBase
                    placeholder="Search genders..."
                    sx={{ color: "white", flex: 1 }}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Paper>

            {/* Table */}
            <Paper sx={{ backgroundColor: "#1E1E1E" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: "#e0e0e0" }}>ID</TableCell>
                            <TableCell sx={{ color: "#e0e0e0" }}>Name</TableCell>
                            <TableCell align="right" sx={{ color: "#e0e0e0" }}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filtered.map((gender) => (
                            <TableRow
                                key={gender.gender_id}
                                sx={{
                                    "&:hover": {
                                        backgroundColor: "#2C2C2C",
                                    },
                                }}
                            >
                                <TableCell sx={{ color: "#bdbdbd" }}>{gender.gender_id}</TableCell>
                                <TableCell sx={{ color: "#bdbdbd" }}>{gender.gender_name}</TableCell>
                                <TableCell align="right">
                                    <IconButton onClick={() => openEditDialog(gender)}>
                                        <Edit sx={{ color: "#90caf9" }} />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(gender.gender_id)}>
                                        <Delete sx={{ color: "#f44336" }} />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            {/* Snackbar for alerts */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={closeSnackbar}
                anchorOrigin={{
                    vertical: 'bottom', // Position at the bottom
                    horizontal: 'center', // Align in the center
                }}
            >
                <Alert onClose={closeSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            {/* Dialog */}
            <Dialog open={openDialog} onClose={closeDialog}>
                <DialogTitle sx={{ backgroundColor: "#1E1E1E", color: "#fff" }}>
                    {editingGender ? "Edit Gender" : "Add Gender"}
                </DialogTitle>
                <DialogContent sx={{ backgroundColor: "#1E1E1E" }}>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Gender Name"
                        fullWidth
                        value={genderName}
                        onChange={(e) => setGenderName(e.target.value)}
                        InputLabelProps={{ style: { color: "#aaa" } }}
                        InputProps={{
                            style: {
                                color: "white",
                            },
                        }}
                    />
                </DialogContent>
                <DialogActions sx={{ backgroundColor: "#1E1E1E" }}>
                    <Button onClick={closeDialog} sx={{ color: "#ccc" }}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default GendersPage;