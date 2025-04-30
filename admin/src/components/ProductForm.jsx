import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  FormGroup,
} from "@mui/material";

import ImageUpload from "./ImageUpload.jsx";
import VariantManager from "./VariantManager.jsx";
import TagSelector from "./TagSelector.jsx";

// Mock product data for edit mode
const mockProduct = {
  id: 1,
  title: "Classic Cotton T-Shirt",
  description: "A comfortable cotton t-shirt perfect for everyday wear. Made with 100% organic cotton.",
  price: 29.99,
  discount: 0,
  category_id: 1,
  gender_id: 1,
  brand_id: 1,
  is_featured: true,
  is_new: false,
  stock: 120,
  image_url: "/placeholder.svg",
  image_alt: "Classic Cotton T-Shirt",
  variants: [
    { id: 1, size: "S", color: "Black" },
    { id: 2, size: "M", color: "Black" },
    { id: 3, size: "L", color: "Black" },
    { id: 4, size: "S", color: "White" },
    { id: 5, size: "M", color: "White" },
  ],
  tags: [1, 3, 7],
};

// Form validation schema
const formSchema = z.object({
  title: z.string().min(3, { message: "Product title must be at least 3 characters." }),
  description: z.string().optional(),
  price: z.coerce.number().positive({ message: "Price must be a positive number." }),
  discount: z.coerce.number().min(0).max(100, { message: "Discount must be between 0 and 100." }),
  category_id: z.string(),
  gender_id: z.string(),
  brand_id: z.string(),
  is_featured: z.boolean().default(false),
  is_new: z.boolean().default(false),
  stock: z.coerce.number().int().nonnegative({ message: "Stock must be a non-negative integer." }),
  image_alt: z.string().optional(),
});

function ProductForm(props) {
  const { productId } = props;
  const navigate = useNavigate();
  const isEditMode = !!productId;

  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [genders, setGenders] = useState([]);
  const [imageUrl, setImageUrl] = useState(isEditMode ? mockProduct.image_url : "");
  const [variants, setVariants] = useState(isEditMode ? mockProduct.variants : []);
  const [selectedTags, setSelectedTags] = useState(isEditMode ? mockProduct.tags : []);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: isEditMode
      ? {
        title: mockProduct.title,
        description: mockProduct.description,
        price: mockProduct.price,
        discount: mockProduct.discount,
        category_id: mockProduct.category_id.toString(),
        gender_id: mockProduct.gender_id.toString(),
        brand_id: mockProduct.brand_id.toString(),
        is_featured: mockProduct.is_featured,
        is_new: mockProduct.is_new,
        stock: mockProduct.stock,
        image_alt: mockProduct.image_alt,
      }
      : {
        title: "",
        description: "",
        price: 0,
        discount: 0,
        category_id: "",
        gender_id: "",
        brand_id: "",
        is_featured: false,
        is_new: false,
        stock: 0,
        image_alt: "",
      },
  });

  async function fetchTags() {
    const response = await fetch("http://localhost:5001/tags");
    const data = await response.json();
    setTags(data);
  }

  async function fetchCategories() {
    try {
      const response = await fetch("http://localhost:5001/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  }

  async function fetchBrands() {
    try {
      const response = await fetch("http://localhost:5001/brands");
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  }

  async function fetchGenders() {
    try {
      const response = await fetch("http://localhost:5001/genders");
      const data = await response.json();
      setGenders(data);
    } catch (error) {
      console.error("Error fetching genders:", error);
    }
  }

  useEffect(() => {
    fetchTags();
    fetchCategories();
    fetchBrands();
    fetchGenders();
  }, []);

  async function onSubmit(values) {
    try {
      const payload = {
        title: values.title,
        description: values.description,
        price: values.price,
        discount: values.discount,
        category: categories.find((c) => c.category_id.toString() === values.category_id)?.category_name,
        gender: genders.find((g) => g.gender_id.toString() === values.gender_id)?.gender_name,
        brand: brands.find((b) => b.brand_id.toString() === values.brand_id)?.brand_name,
        tag: tags
          .filter((t) => selectedTags.includes(t.tag_id))
          .map((t) => t.tag_name),
        size: variants[0]?.size || null,
        color: variants[0]?.color || null,
        featuredProduct: values.is_featured,
        newArrival: values.is_new,
      };

      const response = await fetch("http://localhost:5001/products/add", {
        method: isEditMode ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Server error");

      showSnackbar(`Product ${isEditMode ? "updated" : "created"} successfully!`, "success");
      setTimeout(() => navigate("/dashboard/products"), 1500);
    } catch (error) {
      console.error("Error submitting form:", error);
      showSnackbar("Failed to submit product. Please try again.", "error");
    }
  }

  return (
    <Box component="form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" fontWeight="bold" color="white">
          {isEditMode ? "Edit Product" : "Add New Product"}
        </Typography>
      </Box>

      <Box className="space-y-4 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormControl fullWidth margin="normal">
            <TextField label="Product Title" {...form.register("title")} />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField label="Price ($)" type="number" {...form.register("price")} />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField label="Discount (%)" type="number" {...form.register("discount")} />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <TextField label="Stock Quantity" type="number" {...form.register("stock")} />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Category</InputLabel>
            <Select {...form.register("category_id")} value={form.watch("category_id") || ""}>
              {categories.map((category) => (
                <MenuItem key={category.category_id} value={category.category_id.toString()}>
                  {category.category_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Gender</InputLabel>
            <Select {...form.register("gender_id")} value={form.watch("gender_id") || ""}>
              {genders.map((gender) => (
                <MenuItem key={gender.gender_id} value={gender.gender_id.toString()}>
                  {gender.gender_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Brand</InputLabel>
            <Select {...form.register("brand_id")} value={form.watch("brand_id") || ""}>
              {brands.map((brand) => (
                <MenuItem key={brand.brand_id} value={brand.brand_id.toString()}>
                  {brand.brand_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormGroup row>
            <FormControlLabel control={<Checkbox {...form.register("is_featured")} />} label="Featured" />
            <FormControlLabel control={<Checkbox {...form.register("is_new")} />} label="New Arrival" />
          </FormGroup>
        </div>

        <FormControl fullWidth margin="normal">
          <TextField label="Description" multiline rows={4} {...form.register("description")} />
        </FormControl>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Variants</Typography>
            <VariantManager variants={variants} onChange={setVariants} />
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>Tags</Typography>
            <TagSelector availableTags={tags} selectedTags={selectedTags} onChange={setSelectedTags} />
          </CardContent>
        </Card>
      </Box>

      <Box display="flex" justifyContent="flex-end" gap={2} mt={6}>
        <Button variant="outlined" onClick={() => navigate("/dashboard/products")}>
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          {isEditMode ? "Update Product" : "Create Product"}
        </Button>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
          elevation={6}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}

export default ProductForm;