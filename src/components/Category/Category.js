import React from 'react'
import './Category.css'
import CategoryItem from './CategoryItem'

function Category () {
  let categories

  return (
    <div>
      {categories.map(item => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </div>
  )
}

export default Category
