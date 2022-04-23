import React, { useState, useEffect } from 'react'
import style from './Category.module.css'
import FeedCard from '../FeedCard/FeedCard'
import { useParams } from 'react-router-dom'
import { useGetPostsQuery } from '../../app/services/posts'

export default function Category () {
  //importar la data
  const { id } = useParams()
  console.log(id)
  const {
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    refetch
  } = useGetPostsQuery()
  const [posts, setPosts] = useState([])

  console.log(data)

  useEffect(() => {
    if (data) {
      setPosts([])
      for (let index = 0; index < data.length; index++) {
        if (data[index].category === id)
          setPosts(prev => [data[index], ...prev])
      }
    }
  }, [data]) // eslint-disable-line

  console.log(posts)

  useEffect(() => {
    refetch()
  }, []) // eslint-disable-line

  return (
    <div className={style.container}>
      <div>
        {isLoading && 'cargando...'}

        {isError && error.message}

        {posts.length === 0 && (
          <div className={style.noPosts}>No hay posts</div>
        )}

        {isSuccess &&
          posts &&
          posts.map(post => (
            <div className={style.containerItems} key={post.id}>
              <FeedCard post={post} />
            </div>
          ))}
      </div>
    </div>
  )
}
