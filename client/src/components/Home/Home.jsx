import React from "react"
import Recipes from "../Recipes/Recipes"
import Filters from "../Filters/Filters"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import Paginado from "../Paginado/Paginado"
import { getAllDiets, getRecipes, setCurrentPage } from "../../redux/actions"
import style from "../Home/Home.module.css"
import NavBar from "../NavBar/NavBar"

export default function Home() {
    const dispatch = useDispatch()
    const allRecipes = useSelector((state) => state.recipes)
    const currentPage = useSelector((state) => state.currentPage)

    const loading = useSelector((state) => state.loading)
    // const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);
    const indexLast = currentPage * recipesPerPage;
    const indexFirst = indexLast - recipesPerPage;
    const currentRecipes = allRecipes?.slice(indexFirst, indexLast);
    const numLength = Math.ceil(allRecipes?.length / recipesPerPage)
    const [activated, setActivated] = useState({
        [currentPage]: true
    })

    const paginadoActivated = (value = 1) => {
        //Hover pagina
        const clicked = value;
        setActivated({
            [clicked]: true,
        });
    };


    useEffect(() => {
        dispatch(getAllDiets())
        dispatch(getRecipes())
        dispatch(setCurrentPage(currentPage))
    }, [dispatch])


    return (
        <>
            <div className={style.mainContainer}>
                <div>
                    <NavBar
                        setCurrentPage={setCurrentPage}
                        paginadoActivated={paginadoActivated}
                    />
                </div>


                <div>
                    <Filters
                        setCurrentPage={setCurrentPage}
                        paginadoActivated={paginadoActivated}
                    />
                </div>

                {loading ? null : (
                    <div className={style.paginado}>
                        <Paginado
                            activated={activated}
                            paginadoActivated={paginadoActivated}
                            numLength={numLength}
                            // setCurrentPage={setCurrentPage}
                            // currentPage={currentPage}
                            recipesPerPage={recipesPerPage}
                            allRecipes={allRecipes?.length}
                        // handlePage={handlePage}

                        />
                    </div>
                )}


                <div>

                    <Recipes
                        currentRecipes={currentRecipes}
                    />
                </div>

            </div>

        </>
    )

} 