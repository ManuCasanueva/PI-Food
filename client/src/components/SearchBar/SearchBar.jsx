import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom";
import { getRecipesByName } from "../../redux/actions";
import styles from "./SearchBar.module.css"

export default function SearchBar() {

    const [input, setInput] = useState("")
    const dispatch = useDispatch()

    const inputHandlerChange = (evento) => {
        evento.preventDefault()
        setInput(evento.target.value)
    }

    const submitHandlerChanger = (evento) => {
        evento.preventDefault()
        dispatch(getRecipesByName(input))

    }


    return (
        <div >

            <input type="text" placeholder="Find your Recipe" onChange={inputHandlerChange} />

            <button type="submit" onClick={submitHandlerChanger} > Search </button>


        </div>
    )
}