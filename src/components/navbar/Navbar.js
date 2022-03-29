import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import { purple, lightBlue } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

import './navbar.css';
import { Badge, Button } from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';


let theme = createTheme();

const deepPurple = purple[500];
const deepBlue = lightBlue[500];
const softBlue = lightBlue[200];
const lightPurple = purple[150];



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Navbar() {
  
/*  const navigate = useNavigate();
const handleAuth = ()=>{
  if (user){
    auth.signOut();
    dispatch({
      type: actionTypes.EMPTY_BASKET,
      basket: [],
    });
    dispatch({
      type: actionTypes.SET_USER,
      user: null,
    });
    navigate("/")
  }
}*/
   /* const classes = useStyles;*/
  return (
    <div className='navbar'> 
    <Box sx={{ flexGrow: 1, 
                }}
                >
      <AppBar position="fixed">
        <Toolbar className='toolBar'>
          <div className='menuLeft'>
          <IconButton className='buttonBurguer'
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          
          <Link  to='/' >
              <IconButton>
                  Logo
              </IconButton>
            </Link>
          </div>

          <div className='menuRight'>
          <Typography
            variant="h6" 
            color= "#000"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Bienvenid@  {/* {user ? user.email : ""}! */}
          </Typography>
          <Link to='/signin'>
          <div>
              <button className='loginButton'>Login</button> {/* aca va: onClick={handleAuth} y { {/* user ? "Desconectate" : "Logueate"}*/  } 
          </div>
          </Link>
        <Link to="/checkout-page">
         
        </Link>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
    </div>
  );
}

