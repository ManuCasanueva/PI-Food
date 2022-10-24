import React from "react";
import Recipe from "../Recipe/Recipe";
import Loading from "../Loading/Loading"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllDiets, getRecipes } from "../../redux/actions";
import NotFound from "../NotFound/NotFound";
import style from "./Recipes.module.css"





export default function Recipes({ currentRecipes }) {
    const dispatch = useDispatch()
    // const allRecipes = useSelector(state => state.recipes)
    const loading = useSelector(state => state.loading)


    useEffect(() => {
        dispatch(getRecipes())
        dispatch(getAllDiets())
    }, [dispatch])

    return (
        <>
            <div className={style.mainContainer} >
                <div className={style.recipeContainer}>
                    {loading ?
                        <Loading /> : currentRecipes.length ? (

                            currentRecipes?.map(recipe => {
                                return <Recipe
                                    id={recipe.id}
                                    key={recipe.id}
                                    name={recipe.name}
                                    image={recipe.image}
                                    diets={recipe.diets}
                                    healthScore={recipe.healthScore}
                                    createdInDb={recipe.createdInDb}
                                />

                            })) : <NotFound />
                    }
                </div>
            </div>
        </>
    )

}