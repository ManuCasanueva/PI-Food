import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/actions';
import style from "../Paginado/Paginado.module.css"




export default function Paginado({ activated, paginadoActivated, numLength, allRecipes, recipesPerPage }) {

  const dispatch = useDispatch()
  const currentPage = useSelector((state) => state.currentPage)

  const handleNext = () => {

    if (numLength !== currentPage) {
      dispatch(setCurrentPage(currentPage + 1))
      paginadoActivated(currentPage + 1)
    }
  }
  const handlePrev = () => {

    if (currentPage !== 1) {
      dispatch(setCurrentPage(currentPage - 1))
      paginadoActivated(currentPage - 1)
    }
  }


  const handlerClick = (event, number) => {
    const clicked = event.target.name;
    event.preventDefault()
    dispatch(setCurrentPage(number))
    paginadoActivated(clicked)
    // handlePage(number);

  };

  const pageNumbers = [];


  for (let i = 1; i <= Math.ceil(allRecipes / recipesPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <ul>
      <> <button className={style.botonPrev} onClick={handlePrev} >Previous</button> </>
      {
        pageNumbers?.map(n => {
          return (

            <button key={n} name={n} className={
              activated[n] ? style.pagActual : style.pagOther
            } onClick={(event) => handlerClick(event, n)} > {n} </button>

          )
        })
      }
      <> <button className={style.botonNext} onClick={handleNext} >Next</button> </>
    </ul>
  )
}

