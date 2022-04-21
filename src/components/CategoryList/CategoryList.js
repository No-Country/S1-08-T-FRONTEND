import React, { useEffect, useState } from 'react'
import { useGetAllCategoriesQuery } from '../../app/services/categories'
import style from './CategoryList.module.css'
import Category from './Category'

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
      setcategories(data)
    }
  }, [data]) // eslint-disable-line

  useEffect(() => {
    refetch()
  }, []) // eslint-disable-line

  return (
    <div className={style.categoryList}>
      <div className={style.containerList}>
        <div>CategoryList</div>

        <div>
          {isLoading && 'cargando...'}

          {isError && error.message}

          {isSuccess &&
            categories &&
            categories.map((el, i) => (
              // <div key={category.id}>{category.name}</div>
              <Category key={i} id={el.id} category={el.name} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryList
