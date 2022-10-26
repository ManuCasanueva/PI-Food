import React from "react";
import { Link, Route } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from "../NavBar/NavBar.module.css"


export default function NavBar({ paginadoActivated }) {
    return (
        <div className={style.navContainer}>
            <Link to="/home" >
                <button className={style.home} >Home</button>
            </Link>



            <Route
                exact path={"/home"} component={() => <SearchBar
                    paginadoActivated={paginadoActivated}
                />} />


            <Link to="/home/newrecipe" >
                <button className={style.newRecipe} >New Recipe</button>
            </Link>


        </div>
    )
}