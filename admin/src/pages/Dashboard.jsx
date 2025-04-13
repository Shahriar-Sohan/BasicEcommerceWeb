import React from "react"
import { Box, Button, Card, CardContent, CardHeader, Grid, Typography, Switch } from "@mui/material"
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag"
import InventoryIcon from "@mui/icons-material/Inventory"
import CategoryIcon from "@mui/icons-material/Category"
import PeopleIcon from "@mui/icons-material/People"
import { Link } from "react-router-dom"
import Overview from "../components/Overview.jsx"
import RecentSales from "../components/RecentSales.jsx"

function Dashboard({ isDarkMode, toggleTheme }) {
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      {/* Dark mode toggle */}
      <Box display="flex" justifyContent="flex-end">
        <Typography variant="body2" sx={{ marginRight: 2 }}>Dark Mode</Typography>
        <Switch checked={isDarkMode} onChange={toggleTheme} />
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight="bold">
          Dashboard
        </Typography>
        <Button variant="contained" component={Link} to="/dashboard/products/new">
          Add New Product
        </Button>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardHeader
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 0 }}
              title={<Typography variant="body2">Total Products</Typography>}
              action={<InventoryIcon color="action" />}
            />
            <CardContent>
              <Typography variant="h5" fontWeight="bold">254</Typography>
              <Typography variant="caption" color="text.secondary">+12 from last month</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardHeader
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 0 }}
              title={<Typography variant="body2">Total Sales</Typography>}
              action={<ShoppingBagIcon color="action" />}
            />
            <CardContent>
              <Typography variant="h5" fontWeight="bold">$45,231.89</Typography>
              <Typography variant="caption" color="text.secondary">+20.1% from last month</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardHeader
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 0 }}
              title={<Typography variant="body2">Active Categories</Typography>}
              action={<CategoryIcon color="action" />}
            />
            <CardContent>
              <Typography variant="h5" fontWeight="bold">12</Typography>
              <Typography variant="caption" color="text.secondary">+2 new categories</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={3}>
          <Card>
            <CardHeader
              sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", pb: 0 }}
              title={<Typography variant="body2">Customers</Typography>}
              action={<PeopleIcon color="action" />}
            />
            <CardContent>
              <Typography variant="h5" fontWeight="bold">573</Typography>
              <Typography variant="caption" color="text.secondary">+201 since last month</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={12} md={7}>
          <Card>
            <CardHeader title={<Typography variant="h6">Overview</Typography>} />
            <CardContent sx={{ pl: 2 }}>
              <Overview />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Card>
            <CardHeader
              title={<Typography variant="h6">Recent Sales</Typography>}
              subheader="You made 265 sales this month."
            />
            <CardContent>
              <RecentSales />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard