import React from "react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllDiets, postRecipes } from "../../redux/actions"
import { useHistory } from "react-router-dom"
import style from "../Formulario/Formulario.module.css"
import NavBar from "../NavBar/NavBar.jsx"


export default function Formulario() {

    let validateUrl = /(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png)/;
    const validate = (input) => {

        const errors = {}
        if (input.name === "" || /[^a-zA-Z, ]/g.test(input.name)) {
            errors.name = "The name can not have symbols!"
        } else if (input.summary?.length < 10) {
            errors.summary = "You need to add info to the summary"
        } else if (input.healthScore === "" || input.healthScore < 10 || input.healthScore > 100) {
            errors.healthScore = "Score can't be less than 10, or be higher than 100"
        } else if (!validateUrl.test(input.image)) {
            errors.image = "This is not a valid URL";
        } else if (input.steps.length === 0) {
            errors.steps = "You need to add a step"
        } else if (input.dishTypes.length === 0) {
            errors.dishTypes = "You need to add a dishType"
        } else if (input.diets.length === 0) {
            errors.diets = "You need to add a diet"
        }
        return errors

    }


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
        healthScore: "",
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
            healthScore: "",
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
            ...input,
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

        setError(validate({
            ...input,
            [event.target.name]: event.target.value
        }))
        setInput({
            ...input,
            dishTypes: [...new Set([...input.dishTypes, event.target.value])]
        })
    }


    const handlerDiets = (event) => {
        setError(validate({
            ...input,
            [event.target.name]: event.target.value
        }))
        setInput({
            ...input,
            diets: [...new Set([...input.diets, event.target.value])]
        })
    }


    return (
        <div>
            <NavBar />

            <div className={style.divForm} >
                <form className={style.mainContainer} onSubmit={(e) => handlerSubmit(e)} >
                    <h1 className={style.label} >CREATE RECIPE</h1>
                    <div >
                        <label className={style.label} >Name: </label>
                        <input className={style.nameInput} type="text" name="name" placeholder="Write Recipe name..." value={input.name} onChange={(e) => handlerChange(e)} />
                        {errors.name && <p className={style.danger} >{errors.name}</p>}
                    </div>
                    <div>
                        <label className={style.label} >Summary: </label>
                        <input className={style.summaryInput}
                            type="text"
                            name="summary"
                            placeholder="Detail your Recipe..."
                            value={input.summary}
                            onChange={(e) => handlerChange(e)} />
                        {errors.summary && <p className={style.danger}>{errors.summary}</p>}
                    </div>
                    <div>
                        <label className={style.label} >HealthScore: </label>
                        <input className={style.healthScoreInput}
                            type="number"
                            name="healthScore"
                            placeholder="Put HealthScore..."
                            value={input.healthScore}
                            onChange={(e) => handlerChange(e)} />
                        {errors.healthScore && <p className={style.danger}>{errors.healthScore}</p>}
                    </div>
                    <div>
                        <label className={style.label} >Image: </label>
                        <input className={style.imageInput}
                            type="text"
                            name="image"
                            placeholder="Put Image..."
                            value={input.image}
                            onChange={(e) => handlerChange(e)} />
                        {errors.image && <p className={style.danger}>{errors.image}</p>}
                    </div>
                    <div className={style.steps} >
                        <label className={style.steps1} >Steps: </label>
                        <textarea className={style.stepsInput}
                            type="text"
                            name="steps"
                            placeholder="Put yours steps..."
                            value={input.steps.step}
                            onChange={(e) => handlerChange(e)} />

                    </div>
                    {errors.steps && <p className={style.danger}>{errors.steps}</p>}
                    <div  >
                        <label className={style.label} >DishTypes: </label>
                        <select defaultValue="default" className={style.dishTypesInput}
                            name="dishTypes"
                            onChange={(e) => handlerDishType(e)} >

                            <option disabled value="default" >Choose...</option>

                            {dishTypes.map(dish => (
                                <option key={dish}  >{dish}</option>
                            ))
                            }
                        </select>
                        {errors.dishTypes && <p className={style.danger} >{errors.dishTypes}</p>}
                        {input.dishTypes.map(dishTypes => (
                            <div key={dishTypes} className={style.divDishes}>

                                {dishTypes.charAt(0).toUpperCase() + dishTypes.slice(1)}


                                <button className={style.buttonDelete} key={dishTypes} value={dishTypes} onClick={handlerDeleteDish} > X </button>
                            </div>
                        ))}

                    </div>

                    <div>
                        <label className={style.label} >Diets:</label>
                        <select
                            defaultValue="default"
                            className={style.dietsInput}
                            name="diets"
                            onChange={(e) => handlerDiets(e)} >
                            <option disabled value="default" >Choose...</option>
                            {allDiets?.map(diet => (
                                <option key={diet.id} value={diet.name}>
                                    {diet.name}
                                </option>
                            ))}
                        </select>
                        {input.diets.map(e => (
                            <div key={e} className={style.divDishes} >

                                {e.charAt(0).toUpperCase() + e.slice(1)}

                                <button
                                    className={style.buttonDelete} key={e} value={e} onClick={handlerDeleteDiets} >X</button>
                            </div>
                        ))
                        }
                        {errors.diets && <p className={style.danger} >{errors.diets}</p>}
                    </div>
                    <div className={style.divButton} >
                        <button

                            className={style.button}
                            disabled={errors.name || errors.summary || errors.healthScore || errors.image || errors.steps || errors.dishTypes || errors.diets}
                            type="submit">Create Recipe</button>
                    </div>


                </form>

            </div>
        </div>
    )

}

