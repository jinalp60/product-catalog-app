import React from 'react';
import { useNavigate} from 'react-router-dom';
// import PropTypes from 'prop-types';
import logo from '../../assets/images/react-logo.png';
import styles from './ResponsiveAppBar.module.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Avatar from '@mui/material/Avatar';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import AdbIcon from '@mui/icons-material/Adb';

const pages = ['Products', 'Add product', 'Update product', 'Remove product'];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {
  const navigate = useNavigate();
  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavPage = (event) => {
    const pageToBeRouted = event.currentTarget.getAttribute("id").replace(/\s/g, "").toLowerCase()
    console.log("handleOpenNavMenu", pageToBeRouted);
    navigate(pageToBeRouted);
  };
  // const handleOpenUserMenu = (event) => {
  //   console.log("handleOpenUserMenu", event.currentTarget);
  //   setAnchorElUser(event.currentTarget);
  // };

  // const handleCloseNavMenu = () => {
  //   console.log("handleCloseNavMenu");
  //   setAnchorElNav(null);
  // };

  // const handleCloseUserMenu = () => {
  //   console.log("handleCloseUserMenu");
  //   setAnchorElUser(null);
  // };

  return (
    <div className={styles.ResponsiveAppBar} data-testid="ResponsiveAppBar">
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <img src={logo} width={50} height={50} alt="react-logo" />

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button
                  id={page}
                  key={page}
                  onClick={handleOpenNavPage}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            {/* <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box> */}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );

}
// ResponsiveAppBar.propTypes = {};

// ResponsiveAppBar.defaultProps = {};

export default ResponsiveAppBar;
