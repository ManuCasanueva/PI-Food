import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterDiets, orderAlphabetic, orderHealthScore, getRecipes, recipesCreated, setCurrentPage } from '../../redux/actions'

import style from "../Filters/Filters.module.css"

export default function Filters({ paginadoActivated }) {

  const dispatch = useDispatch()
  const loading = useSelector((state) => state.loading)




  const handlerDiet = (event) => {
    event.preventDefault()
    dispatch(filterDiets(event.target.value))
    paginadoActivated()
    dispatch(setCurrentPage(1))
  }

  const handlerAlphabetic = (event) => {
    event.preventDefault()
    dispatch(orderAlphabetic(event.target.value))
    paginadoActivated()
    dispatch(setCurrentPage(1))
  }

  const handlerOrderHs = (event) => {
    event.preventDefault()
    dispatch(orderHealthScore(event.target.value))
    paginadoActivated()
    dispatch(setCurrentPage(1))
  }

  const handleClear = (event) => {
    event.preventDefault()
    dispatch(getRecipes())
    dispatch(setCurrentPage(1))
  }

  const recipeCreate = (event) => {
    event.preventDefault()
    dispatch(recipesCreated())
  }






  return (
    <>
      {loading ? null : (
        <div className={style.mainContainer} >

          <div >

            <button className={style.button} onClick={(e) => recipeCreate(e)}  >Recipes Created</button>

            <select className={style.alphabetic} onChange={handlerAlphabetic} >
              <option value="none" >Order by:</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
            </select>
          </div>
          <div className={style.select} >
            <select className={style.healthScore} onChange={handlerOrderHs}>
              <option value="none" >Health Score:</option>
              <option className={style.option} value="highest">Max ScoreHealth</option>
              <option value="lowest">Min ScoreHealth</option>
            </select>
          </div>
          <div>
            <select className={style.filterDiet} onChange={handlerDiet} >
              <option value="none" >Filter by diet:</option>
              <option value="gluten free">Gluten Free</option>
              <option value="ketogenic">Ketogenic</option>
              <option value="vegetarian">Vegetarian</option>
              <option value="lacto vegetarian">Lacto vegetarian</option>
              <option value="ovo vegetarian">Ovo vegetarian</option>
              <option value="lacto ovo vegetarian">Lacto ovo vegetarian</option>
              <option value="vegan">Vegan</option>
              <option value="pescatarian">Pescatarian</option>
              <option value="paleolithic">Paleolithic</option>
              <option value="primal">Primal</option>
              <option value="fodmap friendly">Fodmap friendly</option>
              <option value="whole 30">Whole 30</option>
              <option value="dairy free">Dairy Free</option>
            </select>
          </div>


          {loading ? null : (
            <div className={style.clearFilter}>
              <button className={style.button} onClick={(e) => handleClear(e)} >Clear Filters</button>
            </div>
          )}

        </div>
      )}
    </>
  )
}
