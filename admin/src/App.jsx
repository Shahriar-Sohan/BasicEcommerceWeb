import { Routes, Route, Navigate } from "react-router-dom"
import DashboardLayout from "./layouts/DashboardLayout.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import ProductsPage from "./pages/products/ProductsPage.jsx"
import NewProductPage from "./pages/products/NewProductPage.jsx"
import EditProductPage from "./pages/products/EditProductPage.jsx"
import CategoriesPage from "./pages/categories/CategoriesPage.jsx"
import TagsPage from "./pages/tags/TagsPage.jsx"
import BrandsPage from "./pages/brands/BrandsPage.jsx"

function App({ isDarkMode, toggleTheme }) {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Dashboard isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/new" element={<NewProductPage />} />
        <Route path="products/:productId" element={<EditProductPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="tags" element={<TagsPage />} />
        <Route path="brands" element={<BrandsPage />} />
      </Route>
    </Routes>
  )
}

export default App
