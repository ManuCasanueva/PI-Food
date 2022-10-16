import axios from "axios";

export const GET_ALL_RECIPES = "GET_ALL_RECIPES"
export const GET_RECIPES_DETAIL = "GET_RECIPES_DETAIL"
export const LOADING = "LOADING"
export const POST_RECIPES = "POST_RECIPES"
export const GET_ALL_DIETS = "GET_ALL_DIETS"
export const GET_RECIPES_BY_NAME = "GET_RECIPES_BY_NAME"


// export const loading = () => {
//     return {
//         type: LOADING,
//     }
// }

export const getRecipes = () => {
    return async function (dispatch) {
        // dispatch(loading())
        const allRecipes = await axios.get("http://localhost:3001/recipes")
        return dispatch(
            { type: GET_ALL_RECIPES, payload: allRecipes.data })
    }
}


export const getRecipesDetail = (id) => {
    return async function (dispatch) {
        try {
            const recipeDetail = await axios.get(
                `http://localhost:3001/recipes/${id}`
            );
            return dispatch({
                type: GET_RECIPES_DETAIL,
                payload: recipeDetail.data,
            });
        } catch (error) {
            console.log(error);
        }
    };
}
export const getAllDiets = () => {
    return async function (dispatch) {

        const allDiets = await axios.get("http://localhost:3001/diets")
        return dispatch(
            { type: GET_ALL_DIETS, payload: allDiets.data })
    }
}


export const postRecipes = (payload) => {
    return async function () {

        const postRecipe = await axios.post("http://localhost:3001/recipes", payload)
        return postRecipe

    }
}

export const getRecipesByName = (name) => {
    return async function (dispatch) {
        const allRecipesByName = await axios.get(`http://localhost:3001/recipes?name=${name}`)
        return dispatch(
            { type: GET_RECIPES_BY_NAME, payload: allRecipesByName.data })
    }
}