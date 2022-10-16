import React from 'react'
import style from "../Paginado/Paginado.module.css"




export default function Paginado({ currentPage, nextP, prevP, allRecipes, recipesPerPage }) {
  const pageNumbers = [];


  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i)
  }
  console.log(pageNumbers)
  return (
    <ul>
      <a> <button className={style.botonPrev} onClick={() => prevP()} >Previous</button> </a>
      {
        pageNumbers?.map(n => {
          return (
            <a className={style.botonIn} key={n}>
              <button onClick={() => currentPage(n)} > {n} </button>
            </a>
          )
        })
      }
      <a> <button className={style.botonNext} onClick={() => nextP()} >Next</button> </a>
    </ul>
  )
}

