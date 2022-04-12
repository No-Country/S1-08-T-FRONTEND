import * as React from 'react';
import './Navbar.css';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import avatarDefault from '../../Assets/images/avatar-chef.jpg';
import { red } from '@mui/material/colors';


import Logo2 from './logo2.png';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from '../../app/slices/users/authUsersSlice';
import CreatePost from '../CreatePost/CreatePost';


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

  const { user, isAuthenticated } = useSelector((state) => state.authUsers);


  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className='navbar'>
      <Box sx={{
        flexGrow: 1,
      }}
      >
        <AppBar position="fixed">
          <Toolbar className='toolBar'>
            <div className='menuLeft'>
              <Link to='/' >
                <IconButton >
                  <img alt='' className='logo' src={Logo2} />
                </IconButton>
              </Link>
            </div>

            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase sx={{ fontSize: '.9rem', fontWeight: 400 }}
                placeholder="Buscar…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>


            <div className='menuRight'>
              <CreatePost />
              {
                isAuthenticated &&
                <>
                  <Avatar src={user?.avatar ? user?.avatar : avatarDefault} aria-label="recipe" />
                  {/* <Typography
                    variant="h6"
                    color="#fff"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' }, marginLeft: 2 }}
                  >
                    {user?.username}
                  </Typography> */}
                </>
              }
              {!isAuthenticated ?
                <>
                  <Link to='/login'>
                    <div>
                      <button className='loginButton'> Iniciar Sesion</button>
                    </div>
                  </Link>
                  <Link to='/register'>
                    <div>
                      <button className='registerButton'> Registrarse </button>
                    </div>
                  </Link>
                </>
                :
                ""
                // <Link to='/'>
                //   <div>
                //     <button onClick={() => handleLogout()} className='loginButton'> Cerrar sesion <svg width="25" height="25" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill='#fff' d="M160 48C160 21.49 181.5 0 208 0C234.5 0 256 21.49 256 48C256 74.51 234.5 96 208 96C181.5 96 160 74.51 160 48V48zM112.7 205.4C97.41 212.2 85.42 224.6 79.22 240.1L77.71 243.9C71.15 260.3 52.53 268.3 36.12 261.7C19.71 255.1 11.73 236.5 18.29 220.1L19.8 216.3C32.19 185.4 56.18 160.5 86.66 146.9L97.66 142C118.5 132.8 140.1 128 163.7 128C208.3 128 248.5 154.8 265.6 195.9L280.1 232.7L302.3 243.4C318.1 251.3 324.5 270.5 316.6 286.3C308.7 302.1 289.5 308.5 273.7 300.6L247 287.3C236.7 282.1 228.6 273.4 224.2 262.8L214.6 239.8L195.3 305.3L244.8 359.4C250.2 365.3 254.1 372.4 256 380.2L279 472.2C283.3 489.4 272.9 506.8 255.8 511C238.6 515.3 221.2 504.9 216.1 487.8L194.9 399.6L124.3 322.5C109.5 306.4 103.1 283.9 109.6 262.8L126.5 199.3C125.6 199.7 124.6 200.1 123.7 200.5L112.7 205.4zM100.7 344.2L141.4 388.6L126.9 424.8C124.5 430.9 120.9 436.4 116.3 440.9L54.63 502.6C42.13 515.1 21.87 515.1 9.372 502.6C-3.124 490.1-3.124 469.9 9.372 457.4L68.73 398L93.69 335.6C95.84 338.6 98.17 341.4 100.7 344.2H100.7zM361.4 374.6C348.9 362.1 348.9 341.9 361.4 329.4L441.4 249.4C453.9 236.9 474.1 236.9 486.6 249.4C499.1 261.9 499.1 282.1 486.6 294.6L461.3 320H480C533 320 576 277 576 224C576 170.1 533 128 480 128H352C334.3 128 319.1 113.7 319.1 96C319.1 78.33 334.3 64 352 64H480C568.4 64 640 135.6 640 224C640 312.4 568.4 384 480 384H461.3L486.6 409.4C499.1 421.9 499.1 442.1 486.6 454.6C474.1 467.1 453.9 467.1 441.4 454.6L361.4 374.6z" /></svg></button>
                //   </div>
                // </Link>
              }



            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

