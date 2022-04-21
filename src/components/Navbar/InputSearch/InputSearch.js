import React, { useEffect, useState } from 'react'
import { styled, alpha } from '@mui/material/styles';

import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { IconButton, useMediaQuery } from '@mui/material';
import { addSearchTerm } from '../../../app/slices/searcher/searcherSlice';
import { useDispatch } from 'react-redux';
import UsersFound from '../UsersFound/UsersFound';
import { handleUserFoundModaClose } from '../UsersFound/UsersFoundModal/UsersFoundModal';





const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
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
  color: '#fff',
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
  const isMobile = useMediaQuery('(max-width:820px)');

  const dispatch = useDispatch()


  const [searchTerm, setSearchTerm] = useState("");

  const handleDeleteSearchTerm = () => {
    setSearchTerm("");
    handleUserFoundModaClose()
  }

  useEffect(() => {
    dispatch(addSearchTerm({ searchTerm }));
  }, [dispatch, searchTerm]);

  return (
    <>
      {isMobile ? (
        ""
      ) : (
        <div className="search">
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ color: '#fff' }} />
            </SearchIconWrapper>
            <StyledInputBase 
              placeholder="Buscar…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            {
              searchTerm.length > 0 ? (
                <IconButton 
                onClick={handleDeleteSearchTerm}
                >
                  <HighlightOffIcon sx={{ color: '#fff'}} />
                </IconButton>
              ) : (
                ""
              )
            }
          </Search>
          <UsersFound />
        </div>
      )}
    </>
  )
}
