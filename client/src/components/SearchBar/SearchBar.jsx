import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { getRecipesByName } from "../../redux/actions";
import style from "./SearchBar.module.css"

export default function SearchBar({ setCurrentPage }) {

    const [input, setInput] = useState("")
    const dispatch = useDispatch()

    const inputHandlerChange = (evento) => {

        evento.preventDefault()
        setInput(evento.target.value)
    }

    const submitHandlerChanger = (evento) => {
        evento.preventDefault()
        dispatch(getRecipesByName(input))
        setCurrentPage(1)

    }


    return (
        <div >

            <input className={style.barra} type="text" placeholder="Find your Recipe..." onChange={inputHandlerChange} />

            <button className={style.search} type="submit" onClick={submitHandlerChanger} > Search </button>


        </div>
    )
}