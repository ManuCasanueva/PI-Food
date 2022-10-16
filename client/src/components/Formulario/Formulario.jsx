import React from "react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getAllDiets, postRecipes } from "../../redux/actions"
import { useHistory } from "react-router-dom"


// function validate(input) {
//     let errors = {};

//     if (!input.name.trim()) {
//         errors.name = "Enter a correct name";
//     } else if (
//         allRecipes.find(
//             (e) =>
//                 e.name.toLowerCase().trim() === input.name.toLocaleLowerCase().trim()
//         )
//     ) {
//         errors.name = `The ${input.name} already exists`;
//     } else if (
//         input.summary.length < 40 ||
//         input.summary.trim() === ""
//     ) {
//         errors.summary = "Enter a correct summary";
//     } else if (input.healthScore === "" || input.healthScore < 1 || input.healthScore > 100) {
//         errors.healthScore = "Enter a healthScore";
//     } else if (input.steps.length === 0) {
//         errors.steps = "Enter a correct steps"
//     } else if (!input.image || !validateUrl.test(input.image)) {
//         errors.image = "This is not a valid URL";
//     }
//     else if (input.diets.length === 0) {
//         errors.diets = "Select one or more diets";
//     }
//     return errors;
// }





export default function Formulario() {


    let dishTypes = [
        "side dish",
        "lunch",
        "main course",
        "main dish",
        "dinner",
        "morning meal",
        "brunch",
        "breakfast"
    ]

    const dispatch = useDispatch()
    const history = useHistory()
    const allDiets = useSelector(state => state.diets)


    const [errors, setError] = useState({})

    const [input, setInput] = useState({
        name: "",
        summary: "",
        healthScore: 0,
        image: "",
        steps: [],
        dishTypes: [],
        diets: [],
    })


    useEffect(() => {
        dispatch(getAllDiets())
    }, [dispatch])

    const handlerSubmit = (event) => {
        event.preventDefault()
        dispatch(postRecipes(input))

        setInput({
            name: "",
            summary: "",
            healthScore: 0,
            image: "",
            steps: [],
            dishTypes: [],
            diets: [],
        })
        history.push("/home")
    }

    const handlerChange = (event) => {
        setInput({
            ...input,
            [event.target.name]: event.target.value
        })
        setError(validate({
            ...errors,
            [event.target.name]: event.target.value
        }))
        if (event.target.name === "steps") {
            setInput({
                ...input,
                steps: [{ step: event.target.value }]
            })
        }

    }

    const handlerDeleteDish = (event) => {
        setInput({
            ...input,
            dishTypes: input.dishTypes.filter(dish => dish !== event.target.value)
        })
    }

    const handlerDeleteDiets = (event) => {
        setInput({
            ...input,
            diets: input.diets.filter(diet => diet !== event.target.value)
        })
    }

    const handlerDishType = (event) => {
        setInput({
            ...input,
            dishTypes: [...input.dishTypes, event.target.value]
        })
    }


    const handlerDiets = (event) => {
        setInput({
            ...input,
            diets: [...input.diets, event.target.value]
        })
    }
    const validate = (input) => {
        const errors = {}
        if (/[^a-zA-Z, ]/g.test(input.name)) {
            errors.name = "The name can not have symbols!"
        } else if (input.summary?.length < 2) {
            errors.summary = "You need to add info to the summary"
        }
        if (input.healthScore < 0 || input.healthScore > 100) {
            errors.healthScore = "Score can't exceed 100, or be a negative number"
        }

        return errors


    }

    return (
        <div>
            <form onSubmit={(e) => handlerSubmit(e)} >
                <div >
                    <h1>CREATE RECIPE</h1>
                    <label>Name: </label>
                    <input type="text" name="name" placeholder="Write Recipe name..." value={input.name} onChange={(e) => handlerChange(e)} />
                    {errors.name && <p>{errors.name}</p>}
                </div>
                <div>
                    <label>Summary: </label>
                    <input type="text" name="summary" placeholder="Detail your Recipe..." value={input.summary} onChange={(e) => handlerChange(e)} />
                    {errors.summary && <p>{errors.summary}</p>}
                </div>
                <div>
                    <label>HealthScore: </label>
                    <input type="range"
                        min="0"
                        max="100"
                        step="1"
                        name="healthScore" placeholder="Put HealthScore..." value={input.healthScore} onChange={(e) => handlerChange(e)} />
                    {errors.healthScore && <p>{errors.healthScore}</p>}
                </div>
                <div>
                    <label>Image: </label>
                    <input type="text" name="image" placeholder="Put Image..." value={input.image} onChange={(e) => handlerChange(e)} />

                </div>
                <div>
                    <label>Steps: </label>
                    <input type="text" name="steps" placeholder="Put yours steps..." value={input.steps.step} onChange={(e) => handlerChange(e)} />

                </div>
                <div>
                    <label>dishTypes: </label>
                    <select name="dishTypes" onChange={(e) => handlerDishType(e)} >
                        <option disabled selected >Choose...</option>
                        {dishTypes.map(dish => (
                            <option key={dish} >{dish}</option>
                        ))
                        }

                    </select>
                    {input.dishTypes.map(e => (
                        <div>
                            {e}
                            <button key={e} value={e} onClick={handlerDeleteDish} >X</button>
                        </div>
                    ))}
                </div>
                <div>
                    <label>Diets:</label>
                    <select name="diets" onChange={(e) => handlerDiets(e)} >
                        <option disabled selected >Choose...</option>
                        {allDiets?.map(diet => (
                            <option key={diet.id} value={diet.name}>{diet.name}</option>
                        ))}
                    </select>
                    {input.diets.map(e => (
                        <div>
                            {e}
                            <button key={e} value={e} onClick={handlerDeleteDiets} >X</button>
                        </div>
                    ))
                    }

                </div>
                <button disabled={errors.name || errors.summary || errors.healthScore} type="submit">Create Recipe</button>




            </form>

        </div>

    )

}

