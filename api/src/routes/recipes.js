const { Router } = require("express");
const { Recipe } = require("../db.js");

const { API_KEY } = process.env;
const { getAllInfo, postRecipe } = require("../routes/controllers.js")

const router = Router()





router.get("/", async (req, res) => {
    try {
        const { name } = req.query;
        const totalRecipes = await getAllInfo()
        if (name) {
            const filterRecipe = totalRecipes.filter((r) => r.name.toLowerCase().includes(name.toLowerCase()))
            filterRecipe.length ? res.status(200).send(filterRecipe) : res.status(404).send("Recipe not Found")
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
            const filteredId = totalInfo.find((r) => r.id == id)
            filteredId ? res.status(200).send(filteredId) : res.status(404).send("ID not found")
        } else {
            throw new Error("Doesn't work")
        }
    }
    catch (error) {
        res.status(404).send(error)
    }

})

router.post("/", async (req, res) => {

    try {
        const objRecipe = req.body;
        if (!objRecipe) res.status(404).send("Missing info")
        const newRecipe = await postRecipe(objRecipe)

        res.status(201).send(newRecipe)

    } catch (error) {
        res.status(404).send(error);
    }
})

router.delete("/:id", async (req, res) => {

    try {

        const { id } = req.params;
        const deletedValue = await Recipe.findByPk(id)
        await Recipe.destroy({
            where: {
                id: id
            }
        })
        res.status(202).send(deletedValue)

    } catch (error) {
        res.status(404).send(error)
    }

})

module.exports = router;

