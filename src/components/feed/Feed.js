import React, { useState, useEffect } from 'react';
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
//importar la data
    const { data, error, isLoading, isSuccess, isError,refetch } = useGetPostsQuery();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (data) {
            setPosts([]);
            data.forEach((post) => {
                setPosts((prev) => [post, ...prev]);
            });
        }
    }, [data]); // eslint-disable-line
    useEffect(() => {
        refetch();
    }, []); // eslint-disable-line

    console.log(data)

    return (

        <div className='feedContainer'>
            <Grid className='containerPosts' container spacing={3}>

                {isLoading && "cargando..."}

                {isError && error.message}

                {
                    isSuccess && posts && posts.map(post => (
                        <Grid item xs={12} sm={6} md={4} xl={3} >
                            <FeedCard key={post.id} post={post} />
                        </Grid>
                    ))
                }
            </Grid>
            <Footer />
        </div>
    )
}


{/* era mi return
return(
        <div className='feedContainer'>
            <Grid className='containerPosts' container spacing={3}>
                {isLoading && 'cargando'} */}
              {/*  {
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

*/}
