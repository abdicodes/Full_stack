import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logOut } from '../reducers/userReducer'
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
} from '@mui/material/'
import MenuIcon from '@mui/icons-material/Menu'
import { useState } from 'react'

const NavBar = ({ user }) => {
  const dispatch = useDispatch()

  const logout = () => {
    setAnchorElNav(null)
    dispatch(logOut())
  }

  const [anchorElNav, setAnchorElNav] = useState(null)
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            {user.name} has logged in
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  {' '}
                  <Link to={'/'}>home </Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  {' '}
                  <Link to={'/blogs'}>blogs </Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  {' '}
                  <Link to={'/users'}>users </Link>
                </Typography>
              </MenuItem>
              <MenuItem onClick={logout}>
                <Typography textAlign="center"> logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            {user.name} is logged in
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
              component={Link}
              to="/"
            >
              Home
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
              component={Link}
              to="/blogs"
            >
              blogs
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: 'white', display: 'block' }}
              component={Link}
              to="/users"
            >
              users
            </Button>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button
              onClick={logout}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              logout
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
  // return (
  //   <div>
  //     <Link to={'/blogs'}>blogs </Link>
  //     <Link to={'/users'}>users </Link>
  //     {user.name} logged in
  //     <button onClick={logout}>logout</button>
  //   </div>
  // )
}

export default NavBar
