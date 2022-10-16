import React from 'react'

export default function Opciones() {
  return (
    <div>
 <div>
            <select>
                <option value = "asc">Ascendente</option>
                <option value = "desc">Descendente</option>
            </select>
            </div>
                <div>
                <select>
                    <option value = "max SH">Max ScoreHealth</option>
                    <option value = "min SH">Min ScoreHealth</option>
                </select>
                </div>
                <div>
                <select> 
                    <option value = "Gluten Free">Gluten Free</option>
                    <option value = "Ketogenic">Ketogenic</option>
                    <option value = "Vegetarian">Vegetarian</option>
                    <option value = "Lacto vegetarian">Lacto vegetarian</option>
                    <option value = "Ovo vegetarian">Ovo vegetarian</option>
                    <option value = "Lacto ovo vegetarian">Lacto ovo vegetarian</option>
                    <option value = "Vegan">Vegan</option>
                    <option value = "Pescatarian">Pescatarian</option>
                    <option value = "Paleolithic">Paleolithic</option>
                    <option value = "Primal">Primal</option>
                    <option value = "Fodmap friendly">Fodmap friendly</option>
                    <option value = "Whole 30">Whole 30</option>
                    <option value = "Dayri free">Dairy Free</option>
                </select>
                </div>

    </div>
  )
}
