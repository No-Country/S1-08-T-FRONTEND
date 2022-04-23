import React, { useEffect, useState } from 'react'
import { useGetAllCategoriesQuery } from '../../app/services/categories'
import style from './CategoryList.module.css'
import { Link } from 'react-router-dom'

function CategoryList () {
  const {
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    refetch
  } = useGetAllCategoriesQuery()

  const [categories, setcategories] = useState([])

  useEffect(() => {
    if (data) {
      setcategories([])
      data.filter(category => setcategories(prev => [category, ...prev]))
    }
  }, [data]) // eslint-disable-line

  useEffect(() => {
    refetch()
  }, []) // eslint-disable-line

  return (
    <div className={style.categoryList}>
      <div className={style.containerList}>
        <div className={style.titleList}>Lista de Categorias</div>

        <div>
          {isLoading && 'cargando...'}

          {isError && error.message}

          {isSuccess &&
            categories &&
            categories.map(category => (
              <div className={style.categoryItem} key={category.id}>
                <Link to={`/category/${category.name}`}>{category.name}</Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryList
