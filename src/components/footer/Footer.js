import React from 'react';
import posts from '../postsData';


import OtherUsersCard from '../OtherUsersCard/OtherUsersCard';
import  chefs from './chefs.jpg';

import './Footer.css';

export default function Footer(){
    return(
        <section className='footerSection'>
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
            <img className='footerImg' src={chefs} alt="Cooking cartoon vector created by katemangostar - www.freepik.com" />
            <small>© 2022 goût</small>
        </section>

    )
}