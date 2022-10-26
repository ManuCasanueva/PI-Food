import React from "react";
import Loading from "../Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getRecipesDetail } from "../../redux/actions";
import style from "../RecipesDetails/RecipeDetails.module.css"
import NavBar from "../NavBar/NavBar";






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

            <NavBar />
            {loading ?
                <Loading /> :
                recipeDetail ?


                    <div className={style.mainContainer}>
                        <p className={style.name} >{recipeDetail.name} </p>

                        <img className={style.image} src={recipeDetail.image} alt="imagen" />
                        <span className={style.summary} >
                            Summary:
                        </span>
                        <p className={style.summaryDetail} >
                            {recipeDetail.summary}
                        </p>

                        <span className={style.healthScore}>
                            HealthScore
                        </span>
                        <p className={style.healthScoreNum} > {recipeDetail.healthScore}/100</p>

                        {recipeDetail.createdInDb

                            ? <div className={style.stepsContainer} > <>Steps: {recipeDetail.steps?.map((e) => (
                                <div>
                                    <div key={e} className={style.steps}> {e.step} </div>

                                </div>
                            ))}</>
                            </div>
                            :
                            <div className={style.stepsContainer}>
                                <span>

                                </span>
                                <>Steps: {recipeDetail.steps?.map((e) => (
                                    <div  >
                                        <div key={e} className={style.steps} >  Step {e.number}: {e.step} </div>

                                    </div>
                                ))}</>
                            </div>
                        }

                        <span className={style.diets}>
                            Diets:
                        </span>
                        <p className={style.dietsNames} > {recipeDetail.diets} </p>

                        <span className={style.dishType} >
                            DishTypes:
                        </span>
                        <p className={style.dishTypeNames} > {recipeDetail.dishTypes}</p>
                    </div> : <Loading />




            }

        </div>

    )

}
