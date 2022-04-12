import React, { useState, useEffect } from 'react';
import './Feed.css';
import FeedCard from '../FeedCard/FeedCard';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import CreatePost from '../CreatePost/CreatePost';

import { useGetPostsQuery } from '../../app/services/posts';

export default function Feed() {
    //importar la data
    const { data, error, isLoading, isSuccess, isError, refetch } = useGetPostsQuery();
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
            <div className='containerPosts'>
   
                {isLoading && "cargando..."}

                {isError && error.message}

                {
                    isSuccess && posts && posts.map(post => (
                        <div>
                            <FeedCard key={post.id} post={post} />
                        </div>
                    ))
                }
            </div>

        </div>
    )
}


