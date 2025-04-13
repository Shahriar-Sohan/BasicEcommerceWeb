import { Link, useLocation } from "react-router-dom"
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import DashboardIcon from "@mui/icons-material/Dashboard"
import Inventory2Icon from "@mui/icons-material/Inventory2"
import CategoryIcon from "@mui/icons-material/Category"
import LocalOfferIcon from "@mui/icons-material/LocalOffer"
import StoreIcon from "@mui/icons-material/Store"
import PeopleIcon from "@mui/icons-material/People"

const routes = [
  {
    label: "Dashboard",
    icon: <DashboardIcon color="primary" />,
    href: "/dashboard",
  },
  {
    label: "Products",
    icon: <Inventory2Icon color="secondary" />,
    href: "/dashboard/products",
  },
  {
    label: "Categories",
    icon: <CategoryIcon color="error" />,
    href: "/dashboard/categories",
  },
  {
    label: "Tags",
    icon: <LocalOfferIcon color="warning" />,
    href: "/dashboard/tags",
  },
  {
    label: "Brands",
    icon: <StoreIcon color="success" />,
    href: "/dashboard/brands",
  },
  {
    label: "Customers",
    icon: <PeopleIcon color="info" />,
    href: "/dashboard/customers",
  },
]

function Sidebar() {
  const location = useLocation()

  return (
    <Box
      sx={{
        height: "100%",
        overflowY: "auto",
        borderRight: 1,
        borderColor: "divider",
        pt: 8,
      }}
    >
      <List>
        {routes.map((route) => (
          <ListItemButton
            key={route.href}
            component={Link}
            to={route.href}
            selected={location.pathname === route.href}
          >
            <ListItemIcon>{route.icon}</ListItemIcon>
            <ListItemText primary={route.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  )
}

export default Sidebar
