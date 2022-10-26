import React from "react";
import { Link } from "react-router-dom"
import style from "./Recipe.module.css"
import { useDispatch } from "react-redux";
import { deleteRecipe } from "../../redux/actions";




export default function Recipe({ id, name, image, diets, healthScore, dishTypes, createdInDb }) {

    const dispatch = useDispatch()



    const handlerClick = (event) => {
        event.preventDefault()
        dispatch(deleteRecipe(id))
    }


    return (
        <>

            {
                createdInDb ?
                    <div>
                        <div className={style.mainContainer}>
                            <div className={style.titleContainer}>
                                <button className={style.botonDelete} onClick={(e) => handlerClick(e)} >X</button>
                                <Link className={style.link} to={`/home/recipes/${id}`}>
                                    <p className={style.title} >{name}</p>
                                </Link>
                            </div>
                            <img className={style.imageRecipe} src={image} alt="aca va la imagen" />
                            <div  >
                                <label className={style.dietInfo} >
                                    Dietas:
                                </label> <br></br>
                            </div>
                            <p className={style.p} >{diets}</p>
                            <div className={style.healthScoretitle}>
                                HealthScore:
                                <span className={style.healthScore} > {healthScore}/100</span>
                            </div>

                        </div>
                    </div>
                    : <div>
                        <div className={style.mainContainer}>
                            <div className={style.titleContainer}>
                                <Link className={style.link} to={`/home/recipes/${id}`}>
                                    <p className={style.title} >{name}</p>
                                </Link>
                            </div>
                            <img className={style.imageRecipe} src={image} alt="aca va la imagen" />
                            <div  >
                                <label className={style.dietInfo} >
                                    Dietas:
                                </label> <br></br>
                                <p className={style.p} >{diets}</p>
                            </div>
                            <div className={style.healthScoretitle}>
                                HealthScore:
                                <span className={style.healthScore} > {healthScore}/100</span>
                            </div>

                        </div>
                    </div>
            }
        </>
    )



}