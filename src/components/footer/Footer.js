import React from 'react'


import OtherUsersCard from '../OtherUsersCard/OtherUsersCard';
import  chefs from './chefs.jpg';

import './footer.css';

export default function Footer(){
    return(
        <section className='footerSection'>
            <div className='sugestedUsers'>
                <h2>Usuarios recomendados para ti</h2>  
                <OtherUsersCard />
              
               {/* <div>
                {
                posts.map(user => (
                    <div>
                        <OtherUsersCard key={user.id} user={user} />
                    </div>
                ))
            }
        </div> */}

            </div>
            <img className='footerImg' src={chefs} alt="Cooking cartoon vector created by katemangostar - www.freepik.com" />
            <small>© 2022 goût</small>
        </section>

    )
}