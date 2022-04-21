import React from 'react'
import style from './Category.module.css'
import { useLocation } from 'react-router-dom'

function Category ({ id, name }) {
  const history = useLocation()
  function handleDetail (id) {
    history.push(`/category/${id}`)
  }

  return (
    <div className={style.containerFondo}>
      <div onClick={() => handleDetail(id)} className={style.container}>
        <div className={style.containerName}>
          <h4 className={style.title}>{name}</h4>
        </div>
        {/* <div className={style.containerImagen}>
          <img className={style.imagen} src={image[0]} alt={category} />
        </div> */}
      </div>
    </div>
  )
}

export default Category
