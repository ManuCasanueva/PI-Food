import React from "react";
import { Link } from "react-router-dom"
import style from "./Recipe.module.css"



export default function Recipe({ id, name, image, diets }) {



    return (
        <div>
            <div className={style.mainContainer}>
                <div className={style.titleContainer}>
                    <Link to={`/home/recipes/${id}`}>
                        <p className={style.title} >{name}</p>
                    </Link>
                </div>
                <img src={image} alt="aca va la imagen" />
                <div className={style.dietInfo} >
                    Dieta: {diets}
                    {/* {diets.map(diet=>{
                    return <p key = {diet} >
                        {diet}
                    </p>
                })} */}

                </div>
            </div>
        </div>
    )



}