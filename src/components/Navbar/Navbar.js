import * as React from "react";
import "./Navbar.css";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
// import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import avatarDefault from '../../Assets/images/avatar-chef.jpg';
import Logo2 from './logo2.png';
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from '../../app/slices/users/authUsersSlice';
import CreatePost from '../CreatePost/CreatePost';
import Notifications from '../Notifications/Notifications';
import InputSearch from './InputSearch/InputSearch';
import { IconButton, useMediaQuery } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useLocation } from "react-router-dom";

export default function Navbar() {
  let location = useLocation();
  const searchLocation = location.pathname === "/search"? true : false;

  const isMobile = useMediaQuery("(max-width:820px)");

  const { user, isAuthenticated } = useSelector((state) => state.authUsers);

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="navbar">
      <Box
        sx={{
          flexGrow: 1,
        }}
      >
        <AppBar position="fixed">
          <Toolbar className="toolBar">
            <div className="menuLeft">
              <Link to="/">
                <IconButton
                  style={{ backgroundColor: "transparent" }}
                  tooltip="Inicio"
                  flow="down"
                >
                  <img alt="" className="logo" src={Logo2} />
                </IconButton>
              </Link>
            </div>

            <InputSearch />

            <div className="menuRight">
              {isAuthenticated && (
                <>
                  {isMobile && !searchLocation ? (
                  <Link to='/search' >
                    <IconButton
                      tooltip="Buscar"
                      flow="down"
                      sx={{ color: "#fff !important" }}
                    >
                      <SearchIcon />
                    </IconButton>
                  </Link>
                  ) : (
                    ""
                  )}
                  <CreatePost />
                  <Notifications />
                  <Link to={`/profile/${user.id}`}>
                    <IconButton tooltip="Perfil" flow="down">
                      <Avatar
                        sx={{
                          width: 24,
                          height: 24,
                          border: "1px solid #b1b1b5",
                        }}
                        src={user?.avatar ? user?.avatar : avatarDefault}
                        aria-label="recipe"
                      />
                    </IconButton>
                  </Link>

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
              )}
              {!isAuthenticated ? (
                <>
                  <Link to="/login">
                    <div>
                      <button className="loginButton"> Iniciar Sesion</button>
                    </div>
                  </Link>
                  <Link to="/register">
                    <div>
                      <button className="registerButton"> Registrarse </button>
                    </div>
                  </Link>
                </>
              ) : (
                // ""
                <Link to="/">
                  <div>
                    <IconButton
                      tooltip="Cerrar Sesion"
                      flow="down"
                      sx={{ color: "#fff" }}
                      onClick={handleLogout}
                      className="logoutButton"
                    >
                      <svg
                        width="24"
                        height="24"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 640 512"
                      >
                        <path
                          fill="#fff"
                          d="M160 48C160 21.49 181.5 0 208 0C234.5 0 256 21.49 256 48C256 74.51 234.5 96 208 96C181.5 96 160 74.51 160 48V48zM112.7 205.4C97.41 212.2 85.42 224.6 79.22 240.1L77.71 243.9C71.15 260.3 52.53 268.3 36.12 261.7C19.71 255.1 11.73 236.5 18.29 220.1L19.8 216.3C32.19 185.4 56.18 160.5 86.66 146.9L97.66 142C118.5 132.8 140.1 128 163.7 128C208.3 128 248.5 154.8 265.6 195.9L280.1 232.7L302.3 243.4C318.1 251.3 324.5 270.5 316.6 286.3C308.7 302.1 289.5 308.5 273.7 300.6L247 287.3C236.7 282.1 228.6 273.4 224.2 262.8L214.6 239.8L195.3 305.3L244.8 359.4C250.2 365.3 254.1 372.4 256 380.2L279 472.2C283.3 489.4 272.9 506.8 255.8 511C238.6 515.3 221.2 504.9 216.1 487.8L194.9 399.6L124.3 322.5C109.5 306.4 103.1 283.9 109.6 262.8L126.5 199.3C125.6 199.7 124.6 200.1 123.7 200.5L112.7 205.4zM100.7 344.2L141.4 388.6L126.9 424.8C124.5 430.9 120.9 436.4 116.3 440.9L54.63 502.6C42.13 515.1 21.87 515.1 9.372 502.6C-3.124 490.1-3.124 469.9 9.372 457.4L68.73 398L93.69 335.6C95.84 338.6 98.17 341.4 100.7 344.2H100.7zM361.4 374.6C348.9 362.1 348.9 341.9 361.4 329.4L441.4 249.4C453.9 236.9 474.1 236.9 486.6 249.4C499.1 261.9 499.1 282.1 486.6 294.6L461.3 320H480C533 320 576 277 576 224C576 170.1 533 128 480 128H352C334.3 128 319.1 113.7 319.1 96C319.1 78.33 334.3 64 352 64H480C568.4 64 640 135.6 640 224C640 312.4 568.4 384 480 384H461.3L486.6 409.4C499.1 421.9 499.1 442.1 486.6 454.6C474.1 467.1 453.9 467.1 441.4 454.6L361.4 374.6z"
                        />
                      </svg>
                    </IconButton>
                  </div>
                </Link>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}
