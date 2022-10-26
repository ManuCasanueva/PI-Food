import {
    GET_ALL_RECIPES,
    GET_RECIPES_DETAIL,
    LOADING,
    GET_ALL_DIETS,
    POST_RECIPES,
    GET_RECIPES_BY_NAME,
    FILTER_DIETS,
    ALPHABETIC,
    ORDER_HEALTH_SCORE,
    DELETE_RECIPE,
    RECIPE_CREATED,
    SET_PAGE,

} from "../actions/index.js"

const initialState = {
    recipes: [],
    allRecipes: [], //estado aux
    diets: [],
    recipeDetail: [],
    loading: false,
    currentPage: 1,
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_RECIPES:
            return {
                ...state,
                loading: false,
                recipes: action.payload,
                allRecipes: action.payload
            }

        case GET_RECIPES_DETAIL:
            return {
                ...state,
                recipeDetail: action.payload,
            }

        case GET_ALL_DIETS:
            return {
                ...state,
                diets: action.payload,
            }

        case POST_RECIPES:
            return {
                ...state
            }

        case GET_RECIPES_BY_NAME:
            return {
                ...state,
                loading: false,
                recipes: action.payload
            }

        case FILTER_DIETS:
            const allRecipes = state.allRecipes
            const filterDiets = allRecipes.filter(r => {
                return r.diets?.includes(action.payload)
            })
            return {
                ...state,
                recipes: filterDiets
            }

        case ALPHABETIC:
            const allRecipes2 = [...state.recipes]
            const orderBy =
                action.payload === "A-Z"
                    ? allRecipes2.sort((a, b) => {
                        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                        return 0
                    })

                    : allRecipes2.sort((a, b) => {
                        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
                        if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
                        return 0
                    })

            return {
                ...state,

                recipes: orderBy
            }

        case ORDER_HEALTH_SCORE:
            const allRecipes3 = [...state.recipes]
            const orderByHs =
                action.payload === "highest"
                    ? allRecipes3.sort((a, b) => {
                        if (a.healthScore < b.healthScore) return 1;
                        if (a.healthScore > b.healthScore) return -1;
                        return 0
                    })

                    : allRecipes3.sort((a, b) => {
                        if (a.healthScore > b.healthScore) return 1;
                        if (a.healthScore < b.healthScore) return -1;
                        return 0
                    })

            return {
                ...state,

                recipes: orderByHs
            }

        case LOADING:
            return {
                loading: true
            }

        case DELETE_RECIPE:
            const allRecipes4 = state.allRecipes
            const deleteRecipe = allRecipes4.filter(r => r.id !== action.payload)
            return {
                ...state,
                recipes: deleteRecipe
            }

        case RECIPE_CREATED:
            const allRecipes5 = state.allRecipes
            const recipesCreate = allRecipes5.filter(recipe => recipe.createdInDb === true)
            return {
                ...state,
                recipes: recipesCreate
            }

        case SET_PAGE:

            return {
                ...state,
                currentPage: action.payload
            }




        default:
            return { ...state }
    }
}

export default rootReducer;