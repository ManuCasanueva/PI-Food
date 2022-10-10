const { Router } = require("express");

const axios = require("axios");
const Recipe = require("../models/Recipe");
const Diets = require("../models/Diets")

const router = Router()

const getApiInfo = async () => {

    const apiUrl = await axios.get("https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5");
    const apiInfo = await apiUrl.data.results.map((recipes) => {
        return {
            id: recipes.id,
            name: recipes.title.toLowerCase(),
            summary: recipes.summary.replace(/<[^>]+>/g, ""),
            healthScore: recipes.healthScore,
            steps: recipes.analyzedInstructions[0]?.steps.map((s) => {
                return {
                    number: s.number,
                    step: s.step
                }
            }),
            diets: recipes.diets.map((r) => r),
            image: recipes.image,
            dishTypes: recipes.dishTypes
        }
    })
    return apiInfo;

}

const getDbInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: Diets,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
}

const getAllInfo = async () => {
    const infoApi = await getApiInfo();
    const infoDb = await getDbInfo();
    const infoTotal = infoApi.concat(infoDb);
    return infoTotal;
}
console.log(getAllInfo())




router.get("/", async (req, res) => {
    try {
        const { name } = req.query;
        const totalRecipes = await getAllInfo()
        if (name) {
            const filterRecipe = totalRecipes.filter((r) => r.name.includes(name.toLowerCase()))
            filterRecipe ? res.status(200).send(filterRecipe) : res.status(404).send("Recipe not Found")
        } else {
            res.status(200).send(totalRecipes)
        }
    }
    catch (error) {
        res.status(404).send(error)
    }

});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const totalInfo = await getAllInfo();
        if (id) {
            const filteredId = totalInfo.filter((r) => r.id === parseInt(id))
            filteredId ? res.status(200).send(filteredId) : res.status(404).send("ID not found")
        } else {
            throw new Error("no funca")
        }
    }
    catch (error) {
        res.status(404).send(error)
    }

})

module.exports = router;


