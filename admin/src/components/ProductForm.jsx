import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
  Tabs,
  Tab,
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  FormGroup
} from "@mui/material"
import ImageUpload from "./ImageUpload.jsx"
import VariantManager from "./VariantManager.jsx"
import TagSelector from "./TagSelector.jsx"

// data for dropdowns


const genders = [
  { id: 1, name: "Men" },
  { id: 2, name: "Women" },
  { id: 3, name: "Unisex" },
  { id: 4, name: "Kids" },
]

const brands = [
  { id: 1, name: "RivalRay" },
  { id: 2, name: "DenimCo" },
  { id: 3, name: "Floralia" },
  { id: 4, name: "SportElite" },
  { id: 5, name: "WinterWarm" },
]

// const tags = [
//   { id: 1, name: "Summer" },
//   { id: 2, name: "Winter" },
//   { id: 3, name: "Casual" },
//   { id: 4, name: "Formal" },
//   { id: 5, name: "Sport" },
//   { id: 6, name: "Outdoor" },
//   { id: 7, name: "Sustainable" },
//   { id: 8, name: "Limited Edition" },
// ]


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
}

// Form schema
const formSchema = z.object({
  title: z.string().min(3, {
    message: "Product title must be at least 3 characters.",
  }),
  description: z.string().optional(),
  price: z.coerce.number().positive({
    message: "Price must be a positive number.",
  }),
  discount: z.coerce.number().min(0).max(100, {
    message: "Discount must be between 0 and 100.",
  }),
  category_id: z.string(),
  gender_id: z.string(),
  brand_id: z.string(),
  is_featured: z.boolean().default(false),
  is_new: z.boolean().default(false),
  stock: z.coerce.number().int().nonnegative({
    message: "Stock must be a non-negative integer.",
  }),
  image_alt: z.string().optional(),
})

function ProductForm(props) {
  const { productId } = props
  const navigate = useNavigate()
  const isEditMode = !!productId

  const [tags, setTags] = useState([])
  

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
  
  

  const [categories, setCategories] = useState([])

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5001/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error while fetching categories", error);
    }
  };

  const [brands, setBrands] = useState([])

  const fetchBrands = async () => {
    try {
      const response = await fetch("http://localhost:5001/brands");
      if (!response.ok) {
        throw new Error(`Failed to fetch brands: ${response.status}`);
      }
      const data = await response.json();
      setBrands(data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  useEffect(()=>{
    fetchTags()
    fetchCategories()
    fetchBrands()
  },[])
  

  // State for image upload
  const [imageUrl, setImageUrl] = useState(isEditMode ? mockProduct.image_url : "")

  // State for variants
  const [variants, setVariants] = useState(isEditMode ? mockProduct.variants : [])

  // State for tags
  const [selectedTags, setSelectedTags] = useState(isEditMode ? mockProduct.tags : [])

  // State for tab value
  const [tabValue, setTabValue] = useState("basic")

  // Initialize form with default values or existing product data
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
  })

  async function onSubmit(values) {
    // In a real application, this would send data to your API
    try {
      const selectedCategory = categories.find(c => c.id.toString() === values.category_id)?.name;
      const selectedGender = genders.find(g => g.id.toString() === values.gender_id)?.name;
      const selectedBrand = brands.find(b => b.id.toString() === values.brand_id)?.name;
      const selectedTag = tags.find(t => selectedTags.includes(t.id))?.name;
      const selectedVariant = variants[0] || {}; // Assuming one variant for now

      const payload = {
        title: values.title,
        description: values.description,
        price: values.price,
        discount: values.discount,
        category: selectedCategory,
        brand: selectedBrand,
        gender: selectedGender,
        tag: selectedTag,
        size: selectedVariant.size,
        color: selectedVariant.color,
        featuredProduct: values.is_featured,
        newArrival: values.is_new
      };

      const response = await fetch("http://localhost:5001/products/add", {
        method: isEditMode ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
    } catch {
      console.error("fetch is not working");
    }
    console.log("sending to backend", values);
    // Redirect back to products list after submission
    navigate("/dashboard/products");
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <Box component="form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
      <Tabs value={tabValue} onChange={handleTabChange} className="w-full">
        <Tab value="basic" label="Basic Info" />
        {/* <Tab value="images" label="Images" /> */}
        <Tab value="variants" label="Variants" />
        <Tab value="tags" label="Tags" />
      </Tabs>

      {tabValue === "basic" && (
        <Box className="space-y-4 pt-4">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormControl fullWidth margin="normal">
              <TextField
                label="Product Title"
                {...form.register("title")}
                error={!!form.formState.errors.title}
                helperText={form.formState.errors.title?.message}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                label="Price ($)"
                type="number"
                {...form.register("price")}
                error={!!form.formState.errors.price}
                helperText={form.formState.errors.price?.message}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                label="Discount (%)"
                type="number"
                {...form.register("discount")}
                error={!!form.formState.errors.discount}
                helperText={form.formState.errors.discount?.message}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField
                label="Stock Quantity"
                type="number"
                {...form.register("stock")}
                error={!!form.formState.errors.stock}
                helperText={form.formState.errors.stock?.message}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select value={form.watch("category_id") || ""} {...form.register("category_id")}>
                {categories.map((category) => (
                  <MenuItem key={category.category_id} value={category.category_id.toString()}>
                    {category.category_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Gender</InputLabel>
              <Select value={form.watch("gender_id") || ""} {...form.register("gender_id")}>
                {genders.map((gender) => (
                  <MenuItem key={gender.id} value={gender.id.toString()}>
                    {gender.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel>Brand</InputLabel>
              <Select value={form.watch("brand_id") || ""} {...form.register("brand_id")}>
                {brands.map((brand) => (
                  <MenuItem key={brand.brand_id} value={brand.brand_id.toString()}>
                    {brand.brand_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormGroup row>
              <FormControlLabel
                control={<Checkbox {...form.register("is_featured")} />}
                label="Featured Product"
              />
              <FormControlLabel
                control={<Checkbox {...form.register("is_new")} />}
                label="New Arrival"
              />
            </FormGroup>
          </div>

          <FormControl fullWidth margin="normal">
            <TextField
              label="Description"
              multiline
              rows={4}
              {...form.register("description")}
              error={!!form.formState.errors.description}
              helperText={form.formState.errors.description?.message}
            />
          </FormControl>
        </Box>
      )}
      {/* {tabValue === "images" && (
        <Box className="space-y-4 pt-4">
          <Card>
            <CardContent className="pt-6">
              <ImageUpload value={imageUrl} onChange={(url) => setImageUrl(url)} />

              <FormControl fullWidth margin="normal">
                <TextField
                  label="Image Alt Text"
                  {...form.register("image_alt")}
                  error={!!form.formState.errors.image_alt}
                  helperText={form.formState.errors.image_alt?.message}
                />
              </FormControl>
            </CardContent>
          </Card>
        </Box>
      )} */}
      {tabValue === "variants" && (
        <Box className="space-y-4 pt-4">
          <Card>
            <CardContent className="pt-6">
              <VariantManager variants={variants} onChange={setVariants} />
            </CardContent>
          </Card>
        </Box>
      )}
      {tabValue === "tags" && (
        <Box className="space-y-4 pt-4">
          <Card>
            <CardContent className="pt-6">
              <TagSelector availableTags={tags} selectedTags={selectedTags} onChange={setSelectedTags} />
            </CardContent>
          </Card>
        </Box>
      )}

      <div className="flex justify-end gap-4">
        <Button variant="outlined" onClick={() => navigate("/dashboard/products")}>
          Cancel
        </Button>
        <Button type="submit">{isEditMode ? "Update Product" : "Create Product"}</Button>
      </div>
    </Box>
  )
}

export default ProductForm
