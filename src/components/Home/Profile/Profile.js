import React from 'react'
import { useSelector } from 'react-redux';
import UserProfileCard from '../../UserProfileCard/UserProfileCard'

export default function Profile() {
    const { user, isAuthenticated } = useSelector((state) => state.authUsers);

    return (
        <>
            {
                isAuthenticated &&
                <div className='profile'>
                    <UserProfileCard
                        user={user}
                        captionSize="medium"
                        nickNameSize="medium"
                        AvatarSize={100}
                    />
                </div>
            }
        </>
    )
}
