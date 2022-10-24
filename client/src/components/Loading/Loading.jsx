import React from "react";
import hamburguer from "../Images/hamburguer.gif"
import style from "../Loading/Loading.module.css"


export default function Loading() {
    return (

        <div className={style.mainContainer}>
            <img className={style.gif} src={hamburguer} alt="gif" />
            <div>
                <div className={style.ldsellipsis}><div></div><div></div><div></div><div></div></div>

            </div>

        </div>

    )
}