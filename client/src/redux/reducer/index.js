import { GET_ALL_RECIPES, GET_RECIPES_DETAIL, LOADING, GET_ALL_DIETS, POST_RECIPES, GET_RECIPES_BY_NAME } from "../actions/index.js"

const initialState = {
    recipes: [],
    diets: [],
    recipeDetail: [],
    loading: false,
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {

        case GET_ALL_RECIPES:
            return {
                ...state,
                recipes: action.payload,

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
                recipes: action.payload
            }


        // case LOADING:
        //     return {
        //         loading: true
        //     }


        default:
            return { ...state }
    }
}

export default rootReducer;