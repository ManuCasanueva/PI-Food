import React from "react";
import { Link } from "react-router-dom";
import style from "../LandingPage/LandingPage.module.css"


export default function LandingPage() {

    return (
        <div className={style.mainContainer}>
            <div className={style.container} >

                <h1 className={style.titulo} >Welcome to my Food app</h1>
                <Link to="/home" >

                    <button className={style.boton} >
                        HOME
                    </button>
                </Link>
            </div>
        </div>

    )



}