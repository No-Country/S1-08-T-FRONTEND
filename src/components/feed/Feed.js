import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import Footer from '../Footer/Footer';
import FeedCard from '../FeedCard/FeedCard';
import { useGetPostsQuery } from '../../app/services/posts';

import './Feed.css';
import posts from '../postsData';


export default function Feed(){

    //const {data, isLoading} = useGetPostsQuery();
    //const [posts, setPosts] = useState(data);
    

    return(
        <div className='feedContainer'>
            <Grid className='containerPosts' container spacing={3}>
               {/* {isLoading && 'cargando'} */}
                {
                posts ? 
                posts?.map(post => (
                    <Grid item xs={12} sm={6} md={4} xl={3} >
                        <FeedCard key={post.id} post={post} />
                    </Grid>
                )) : <p>searching</p>
            }
            </Grid>
           <Footer />
            
        </div>
    )
}