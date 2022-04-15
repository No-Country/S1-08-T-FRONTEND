import React from 'react'
import { styled, alpha} from '@mui/material/styles';
import { makeStyles } from "@material-ui/styles";

import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, useTheme, useMediaQuery} from '@mui/material';

import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';


const useStyles = makeStyles(theme => ({
  customButtonSearch: {
    color: '#fff',
    "&:hover, &.Mui-focusVisible": { backgroundColor: "" },
    margin: '0 2px',
    padding: "5px",
    alignItems: "center",
  }
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '30%',
  [theme.breakpoints.up('sx')]: {
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
      width: 'auto',
      '&:focus': {
        width: 'auto',
      },
    },
  },
}));
export default function InputSearch() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {isMobile ? (
        <IconButton
          classes={{
            root: classes.customButtonSearch
          }}
        >
          <SearchIcon />
        </IconButton>
      ) : (

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase sx={{ fontSize: '.9rem', fontWeight: 400 }}
            placeholder="Buscar…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
      )}
        </>
  )
}
