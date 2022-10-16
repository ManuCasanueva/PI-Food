import React from "react";
import { Link } from "react-router-dom"
import Recipe from "../Recipe/Recipe";
import Loading from "../Loading/Loading"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRecipes } from "../../redux/actions";
import style from "./Recipes.module.css"





export default function Recipes({ currentRecipes }) {
    const dispatch = useDispatch()
    const allRecipes = useSelector(state => state.recipes)
    const loading = useSelector(state => state.loading)


    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch])

    return (
        <div>
            <div className={style.recipeContainer}>
                {loading ?
                    <Loading /> :
                    currentRecipes?.map(recipe => {
                        return <Recipe
                            id={recipe.id}
                            key={recipe.id}
                            name={recipe.name}
                            image={recipe.image}
                            diets={recipe.diets}
                        />

                    })
                }

            </div>
        </div>
    )

}