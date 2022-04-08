import React from 'react';
import posts from '../postsData';
import OtherUsersCard from '../OtherUsersCard/OtherUsersCard';

export default function OtherUsers(){
    return(
        <div className='sugestedUsers'>
        <h2>Usuarios recomendados para ti</h2>  
        {/* <OtherUsersCard /> */}

        <div>
        {
            posts ? 
            posts?.map(post => (
                <div item xs={12} sm={6} md={4} xl={3} >
                    <OtherUsersCard key={post.id} post={post} />
                </div>
            )) : <p>searching</p>
            }
        </div>

        </div>
    )
}