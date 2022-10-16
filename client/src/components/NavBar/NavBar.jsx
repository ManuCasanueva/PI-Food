import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from "../NavBar/NavBar.module.css"

export default function NavBar(name) {
    return (
        <div className={style.navContainer}>




            <Link to="/home" >
                <button>Home</button>
            </Link>
            <Link to="/home/newrecipe" >
                <button>New Recipe</button>
            </Link>


        </div>
    )
}