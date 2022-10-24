import React from "react"
import Recipes from "../Recipes/Recipes"
import Filters from "../Filters/Filters"
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import Paginado from "../Paginado/Paginado"
import { getAllDiets, getRecipes } from "../../redux/actions"
import style from "../Home/Home.module.css"
import NavBar from "../NavBar/NavBar"

export default function Home() {
    const dispatch = useDispatch()
    const allRecipes = useSelector((state) => state.recipes)
    const loading = useSelector((state) => state.loading)
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);
    const indexLast = currentPage * recipesPerPage;
    const indexFirst = indexLast - recipesPerPage;
    const currentRecipes = allRecipes?.slice(indexFirst, indexLast);
    const numLength = Math.ceil(allRecipes?.length / recipesPerPage)


    const handlePage = (num) => setCurrentPage(num)

    const handleNext = () => {
        if (numLength !== currentPage) {
            setCurrentPage(currentPage + 1)
        }
    }
    const handlePrev = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }


    useEffect(() => {
        dispatch(getAllDiets())

    }, [dispatch])







    return (
        <>
            <div className={style.mainContainer}>
                {/* {loading ? null : (
                    // <div className={style.searchBar}>
                    //     <SearchBar
                    //         setCurrentPage={setCurrentPage}
                    //     />
                    //     </div>
                    // )} */}
                <div>
                    <NavBar
                        setCurrentPage={setCurrentPage}

                    />
                </div>

                <div>
                    <Filters />
                </div>

                {loading ? null : (
                    <div className={style.paginado}>
                        <Paginado
                            recipesPerPage={recipesPerPage}
                            allRecipes={allRecipes?.length}
                            handlePage={handlePage}
                            currentPage={handlePage}
                            nextP={handleNext}
                            prevP={handlePrev}
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