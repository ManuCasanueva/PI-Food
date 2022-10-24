import React from "react";
import error404 from "../Images/404.jpg"
import style from "../NotFound/NotFound.module.css"


export default function NotFound() {
    return (
        <div className={style.mainContainer} >

            <h1 className={style.notfound} > Recipe Not Found!</h1>
            <img className={style.img} src={error404} alt="imagen" />


        </div>
    )
}