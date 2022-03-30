import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import FeedCard from '../feedCard/FeedCard';
import Footer from '../footer/Footer';

//importar la data

export default function Feed(){
    return(
        <>
            <Grid className='containePosts' container spacing={3}>
                {
                posts.map(post => (
                    <Grid item xs={12} sm={6} md={4} xl={3} >
                        <FeedCard key={post.id} product={post} />
                    </Grid>
                ))
            }
            </Grid>
           <Footer />
            
        </>
    )
}