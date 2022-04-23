import React, { useEffect, useState } from 'react'
import './Searcher.css'
import { useGetUsersQuery } from '../../app/services/users';
import { Link } from 'react-router-dom';

import { styled, alpha } from '@mui/material/styles';
import Spinner from '../Spinner/Spinner';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { IconButton } from '@mui/material';
import UserFoundCard from '../Navbar/UsersFound/UserFoundCard/UserFoundCard';



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
    color: '#8f8d8d',
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

export default function Searcher() {
    const [searchTerm, setSearchTerm] = useState("");

    const handleDeleteSearchTerm = () => {
        setSearchTerm("");
    }

    const [userFound, setUserFound] = useState([])

    const { data: users, error, isLoading, isSuccess, isError } = useGetUsersQuery()

    console.log(users)

    useEffect(() => {

        // if (searchTerm !== "") {
        if (!isLoading) {

            // eslint-disable-next-line array-callback-return
            const searchUsers = users.filter((val) => {
                if (searchTerm === "") {
                    return ""
                } else if (val.username.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                    return val
                } else if (val.email.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                    return val
                } else if (val.nickname?.toLowerCase().includes(searchTerm.toLocaleLowerCase())) {
                    return val
                }
            }

            )


            setUserFound(searchUsers)
        }
        // }

    }, [users, searchTerm, isLoading])




    return (
        <div className='searcher-container'>
            <div className='searcher-container__search'>
                <div className='searcher-container__search__input'>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon sx={{ color: '#8f8d8d' }} />
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
                                    <HighlightOffIcon sx={{ color: '#8f8d8d', float: "right" }} />
                                </IconButton>
                            ) : (
                                ""
                            )
                        }
                    </Search>
                </div>
            </div>
            <div className='searcher-container__results'>

                {isLoading && <Spinner />}
                {isError && <p>{error}</p>}
                {userFound.length === 0 && !isLoading && !isError && <p className='noResults'>No hay resultados</p>}

                {
                    isSuccess && userFound && userFound.map((user) => {
                        return (
                            <div className='searcher-container__results__item'>
                                {
                                    <Link to={`/profile/${user.id}`}>
                                        <UserFoundCard
                                            key={user.id}
                                            user={user}
                                            captionSize="small"
                                            nickNameSize="small"
                                            AvatarSize={50}
                                        />
                                    </Link>
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
