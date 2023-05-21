import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';
import style from './index.module.css'
import { Container } from '@mui/material';
const Navbar = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }} >
        <AppBar position="static">
          <Container maxWidth="xl">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Fullstack Book-Author App
            </Typography>
            <Button color="inherit"><NavLink activeclassname="active" className={style.links} to=''>Home</NavLink></Button>
            <Button color="inherit"><NavLink activeclassname="active" className={style.links} to='/authors'>Authors</NavLink></Button>
            <Button color="inherit"><NavLink activeclassname="active" className={style.links} to='/add-author'>Add Author</NavLink></Button>
          </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </>
  )
}

export default Navbar