import React from "react";
import { Link, Route } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import style from "../NavBar/NavBar.module.css"


export default function NavBar({ setCurrentPage }) {
    return (
        <div className={style.navContainer}>
            <Link to="/home" >
                <button className={style.home} >Home</button>
            </Link>
            {/* <div>
                <SearchBar
                    setCurrentPage={setCurrentPage}
                />
            </div> */}
            <Route
                path={"/home"} component={() => <SearchBar setCurrentPage={setCurrentPage} />} />


            <Link to="/home/newrecipe" >
                <button className={style.newRecipe} >New Recipe</button>
            </Link>


        </div>
    )
}