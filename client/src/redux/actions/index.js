import axios from "axios";

export const GET_ALL_RECIPES = "GET_ALL_RECIPES"
export const GET_RECIPES_DETAIL = "GET_RECIPES_DETAIL"
export const LOADING = "LOADING"
export const POST_RECIPES = "POST_RECIPES"
export const GET_ALL_DIETS = "GET_ALL_DIETS"
export const GET_RECIPES_BY_NAME = "GET_RECIPES_BY_NAME"
export const FILTER_DIETS = "FILTER_DIETS"
export const ALPHABETIC = "ALPHABETIC"
export const ORDER_HEALTH_SCORE = "ORDER_HEALTH_SCORE"
export const DELETE_RECIPE = "DELETE_RECIPE"
export const RECIPE_CREATED = "RECIPE_CREATED"

export const loading = () => {
    return {
        type: LOADING,
    }
}

export const getRecipes = () => {
    return async function (dispatch) {
        dispatch(loading())
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
        try {
            dispatch(loading())
            const allRecipesByName = await axios.get(`http://localhost:3001/recipes?name=${name}`)
            return dispatch(
                { type: GET_RECIPES_BY_NAME, payload: allRecipesByName.data })
        } catch (error) {
            return dispatch({
                type: GET_RECIPES_BY_NAME,
                payload: [],
            })
        }
    }
}

export const filterDiets = (value) => {
    return {
        type: FILTER_DIETS,
        payload: value,
    }
}

export const orderAlphabetic = (value) => {
    return {
        type: ALPHABETIC,
        payload: value
    }
}

export const orderHealthScore = (value) => {
    return {
        type: ORDER_HEALTH_SCORE,
        payload: value
    }
}

export const deleteRecipe = (id) => {
    return async function (dispatch) {
        try {
            const recipeDelete = await axios.delete(
                `http://localhost:3001/recipes/${id}`
            );
            return dispatch({
                type: DELETE_RECIPE,
                payload: recipeDelete.data.id,
            });
        } catch (error) {
            console.log(error);
        }
    };
}

export const recipesCreated = () => {
    return {
        type: RECIPE_CREATED,
    }
}


