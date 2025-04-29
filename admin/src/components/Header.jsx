import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useState } from 'react';

function Header() {
  const theme = useTheme(); // Access the current theme (light/dark)
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <header
      style={{
        backgroundColor: theme.palette.background.paper, // Background based on theme
        color: theme.palette.text.primary, // Text color based on theme
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1201, // Higher than other content to keep it on top
        borderBottom: `1px solid ${theme.palette.divider}`, // Divider color based on theme
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', height: '64px', padding: '0 16px', justifyContent: 'space-between' }}>
        {/* Left side: Title */}
        <Typography variant="h6" component="h1" style={{ fontWeight: 'bold' }}>
          RivalRay Admin
        </Typography>

        {/* Right side: Notifications and Account */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircle />
          </IconButton>

          {/* Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                backgroundColor: theme.palette.background.paper, // Match the menu to theme
                color: theme.palette.text.primary, // Match the menu text to theme
                minWidth: '180px',
              },
            }}
          >
            <MenuItem disabled>My Account</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleMenuClose}>Support</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  );
}

export default Header;