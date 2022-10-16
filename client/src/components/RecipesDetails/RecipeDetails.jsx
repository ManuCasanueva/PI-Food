import React from "react";
import { Link } from "react-router-dom"
import Loading from "../Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRecipesDetail } from "../../redux/actions";






export default function RecipeDetail(props) {

    const dispatch = useDispatch()
    const id = props.match.params.id
    const recipeDetail = useSelector(state => state.recipeDetail)
    const loading = useSelector(state => state.loading)

    useEffect(() => {
        dispatch(getRecipesDetail(id))
    }, [dispatch, id])

    return (
        <div>

            {
                recipeDetail ?
                    <div>
                        <img src={recipeDetail.image} alt="imagen" />
                        <p>Name: {recipeDetail.name} </p>
                        <p>Summary: {recipeDetail.summary}</p>
                        <p>HealthScore: {recipeDetail.healthScore}</p>

                        {
                            <>Steps: {recipeDetail.steps?.map((e) => (
                                <div>
                                    <div>  Step {e.number}: {e.step} </div>
                                    <br></br>
                                </div>
                            ))}<br></br></>
                        }

                        <p>Diets: {recipeDetail.diets} </p>
                        <p>DishTypes: {recipeDetail.dishTypes}</p>
                    </div> : <Loading />




            }
        </div>

    )

}
