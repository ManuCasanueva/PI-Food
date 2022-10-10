const { Router } = require("express");

const axios = require("axios");
const { Recipe } = require("../db.js");
const { Diets } = require("../db.js");
const { API_KEY } = process.env;

const getApiInfo = async () => {

    // const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);
    const apiUrl = await axios.get("https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5")
    const apiInfo = await apiUrl.data.results.map((recipes) => {
        return {
            id: recipes.id,
            name: recipes.title,
            summary: recipes.summary.replace(/<[^>]+>/g, ""),
            healthScore: recipes.healthScore,
            steps: recipes.analyzedInstructions[0]?.steps.map((s) => {
                return {
                    number: s.number,
                    step: s.step
                }
            }),
            diets: recipes.diets,
            image: recipes.image,
            dishTypes: recipes.dishTypes
        }
    })
    return apiInfo;

}

const getDbInfo = async () => {
    const dbInfo = await Recipe.findAll({
        include: {
            model: Diets,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
    return dbInfo;
}

const getAllInfo = async () => {
    const infoApi = await getApiInfo();
    const infoDb = await getDbInfo();
    const infoTotal = infoApi.concat(infoDb);
    return infoTotal;
}

const putDietInfo = async () => {
    const dietTypes = [
        "gluten free",
        "ketogenic",
        "vegetarian",
        "lacto vegetarian",
        "ovo vegetarian",
        "lacto ovo vegetarian",
        "vegan",
        "pescatarian",
        "paleolithic",
        "primal",
        "fodmap friendly",
        "whole 30",
        "dairy free",
    ];
    dietTypes.forEach((d) => {
        Diets.findOrCreate({
            where: {
                name: d,
            }
        })
    })
    return Diets.findAll()

}

const postRecipe = async (objRecipe) => {


    try {
        const { name, summary, healthScore, steps, image, dishesType, diets } = objRecipe;
        const recipe = {
            name,
            summary,
            healthScore,
            steps,
            image,
            dishesType,
        }

        const dietInfo = await Diets.findAll({
            where: {
                name: diets,
            }
        })
        const createRecipe = await Recipe.create(recipe)

        createRecipe.addDiets(dietInfo)

        return Recipe.findAll()

    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    getAllInfo,
    putDietInfo,
    postRecipe,
}

