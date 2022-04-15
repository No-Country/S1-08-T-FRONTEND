import React from 'react'
import style from './Category.module.css'

function Category () {
  return (
    <div className={style.container}>
      <select
        //onChange={handleFilter}
        defaultValue='default'
        className={style.containerSelect}
      >
        <option value='All' className={style.containerSelectOp1}>
          Elige una categoría
        </option>
        <option
          value='Desayunos y meriendas'
          className={style.containerSelectOp}
        >
          Desayunos y meriendas
        </option>
        <option value='Almuerzos' className={style.containerSelectOp}>
          Almuerzos
        </option>
        <option value='Cenas' className={style.containerSelectOp}>
          Cenas
        </option>
        <option
          value='Restaurantes recomendados'
          className={style.containerSelectOp}
        >
          Restaurantes recomendados
        </option>
        <option value='Postres' className={style.containerSelectOp}>
          Postres
        </option>
        <option value='Comidas regionales' className={style.containerSelectOp}>
          Comidas regionales
        </option>
        <option
          value='Vegetarianas y veganas'
          className={style.containerSelectOp}
        >
          Vegetarianas y veganas
        </option>
        <option value='Aptas para celíacos' className={style.containerSelectOp}>
          Aptas para celíacos
        </option>
      </select>
    </div>
  )
}

export default Category
