import React from 'react';
import  chefs from './chefs.jpg';

import './Footer.css';

export default function Footer(){
    return(
        <section className='footerSection'>
           
            <img className='footerImg' src={chefs} alt="Cooking cartoon vector created by katemangostar - www.freepik.com" />
            <small>© 2022 goût</small>
        </section>

    )
}