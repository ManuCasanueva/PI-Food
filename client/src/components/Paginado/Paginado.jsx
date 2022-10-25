import React, { useState } from 'react'
import style from "../Paginado/Paginado.module.css"




export default function Paginado({ activated, paginadoActivated, currentPage, handlePage, nextP, prevP, allRecipes, recipesPerPage }) {



  const handlerClick = (event, number) => {
    const clicked = event.target.name;
    paginadoActivated(clicked)
    handlePage(number);

  };

  const pageNumbers = [];


  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <ul>
      <> <button className={style.botonPrev} onClick={() => prevP()} >Previous</button> </>
      {
        pageNumbers?.map(n => {
          return (

            <button key={n} name={n} className={
              activated[n] ? style.pagActual : style.pagOther
            } onClick={(event) => handlerClick(event, n)} > {n} </button>

          )
        })
      }
      <> <button className={style.botonNext} onClick={() => nextP()} >Next</button> </>
    </ul>
  )
}

