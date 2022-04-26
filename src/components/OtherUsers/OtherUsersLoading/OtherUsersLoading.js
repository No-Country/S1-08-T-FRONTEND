import React from 'react'
import Avatar from '@mui/material/Avatar';

import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";
export default function OtherUsersLoading() {

    const dataSuggestedUser = [1, 2, 3, 4, 5, 6]

    return (
        dataSuggestedUser.map(user => (
            
            <div key={user} className="otherUsers">
                <div className="profile">
                    <Avatar
                        sx={{ width: 50, height: 50, border: '1px solid #b1b1b5' }}
                        src={<Skeleton />}
                        aria-label="recipe" />

                    <div className="textContainer">
                        <span className={`nickName nickName-small`}><Skeleton /></span>
                        <span className={`caption caption-small`}><Skeleton /></span>
                    </div>
                </div>
                <div className="otherUsers__folloButton">
                    <Skeleton />
                </div>
            </div>
        )
        )
    )
}
