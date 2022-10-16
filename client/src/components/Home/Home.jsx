import React from "react"
import Recipes from "../Recipes/Recipes"
import NavBar from "../NavBar/NavBar"
import Opciones from "../Opciones/Opciones"
import { useSelector } from "react-redux"
import { useState, useEffect } from "react"
import Paginado from "../Paginado/Paginado"
import SearchBar from "../SearchBar/SearchBar"

export default function Home() {
    const allRecipes = useSelector((state) => state.recipes)
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);
    const indexLast = currentPage * recipesPerPage;
    const indexFirst = indexLast - recipesPerPage;
    const currentRecipes = allRecipes.slice(indexFirst, indexLast);
    const numLength = Math.ceil(allRecipes.length / recipesPerPage)


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
        if (currentPage === 1)
            setRecipesPerPage(9)
    }, [currentPage])





    return (
        <div>
            <SearchBar />
            <div>
                <Opciones />
            </div>
            <div>
                <Paginado
                    recipesPerPage={recipesPerPage}
                    allRecipes={allRecipes.length}
                    currentPage={handlePage}
                    nextP={handleNext}
                    prevP={handlePrev}
                />
            </div>


            <h1>
                <Recipes
                    currentRecipes={currentRecipes}
                />
            </h1>

        </div>
    )

} 