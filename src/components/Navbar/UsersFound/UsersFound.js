import React, { useEffect, useState } from 'react'
import './UsersFound.css';

import { useSelector } from 'react-redux';
import { useGetUsersQuery } from '../../../app/services/users';
import Spinner from '../../Spinner/Spinner';
import UserFoundCard from './UserFoundCard/UserFoundCard';
import UsersFoundModal, { handleUserFoundModaClose } from './UsersFoundModal/UsersFoundModal';
import { Link } from 'react-router-dom';
import { deleteSearchTerm } from '../../../app/slices/searcher/searcherSlice';

export default function UsersFound() {
  const [userFound, setUserFound] = useState([])


  const searchTerm = useSelector((state) => state.searcher.searchTerm);

  console.log(searchTerm)

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

    <UsersFoundModal dataOpenResult={userFound}>
      <div className='_9z-- _9z-_'></div>
      <div className='usersFound-content'>

        {isLoading && <Spinner />}
        {isError && <p>{error}</p>}
        {userFound.length === 0 && !isLoading && !isError && <p className='noResults'>No hay resultados</p>}

        {
          isSuccess && userFound && userFound.map((user) => {
            return (
              <>
                {
                  <Link to={`/profile/${user.id}`} 
                  onClick={()=>{
                    deleteSearchTerm()
                    handleUserFoundModaClose()
                  }
                  }>
                    <UserFoundCard
                      key={user.id}
                      user={user}
                      captionSize="small"
                      nickNameSize="small"
                      AvatarSize={50}
                    />
                  </Link>
                }
              </>
            )
          })
        }
      </div>
    </UsersFoundModal>
  )
}
