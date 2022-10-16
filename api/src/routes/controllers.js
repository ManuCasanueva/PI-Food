const { Router } = require("express");

const axios = require("axios");
const { Recipe } = require("../db.js");
const { Diets } = require("../db.js");
const { API_KEY } = process.env;

const getApiInfo = async () => {

    // const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true`);
    const apiUrl = await axios.get("https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5")
    const apiInfo = await apiUrl.data.results.map((recipes) => {
        // let aux = "";
        // recipes.analyzedInstructions[0]?.steps.forEach((e) => {
        //     aux += `Step ${e.number}: ${e.step}`;
        // });
        return {
            id: recipes.id,
            name: recipes.title,
            summary: recipes.summary.replace(/<[^>]+>/g, ""),
            healthScore: recipes.healthScore,
            steps: recipes.analyzedInstructions[0]?.steps.map((e) => {
                return {
                    number: e.number,
                    step: e.step,
                };
            }),

            diets: `${recipes.diets},`,
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
    var dato = JSON.parse(JSON.stringify(dbInfo, null, 2));
    dato.forEach((el) => (el.diets = el.diets.map((el) => el.name)));

    return dato;
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
        const { name, summary, healthScore, steps, image, dishTypes, diets } = objRecipe;
        // if (!name || !summary) throw new Error("Data Missing")
        // if (healthScore < 0 || healthScore > 100) throw new Error("HealtScore need to be a number between 0 and 100")
        const recipe = {
            name,
            summary,
            healthScore,
            steps,
            image,
            dishTypes,
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

