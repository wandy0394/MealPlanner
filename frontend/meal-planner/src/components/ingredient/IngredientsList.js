import { useEffect, useState } from "react"
import DataService from "../../service/data-service";
import EnhancedTable from "../utility/EnhancedTable";

const headCells = [
    {
      id: 'name',
      alignment: 'left',
      disablePadding: true,
      label: 'Food (100g serving)',
      allowSort:true
    },
    {
      id: 'calories',
      alignment: 'right',
      disablePadding: true,
      label: 'Calories (kcal)',
      allowSort:true

    },
    {
      id: 'carbs',
      alignment: 'right',
      disablePadding: true,
      label: 'Carbs (g)',
      allowSort:true

    },
    {
      id: 'protein',
      alignment: 'right',
      disablePadding: true,
      label: 'Protein (g)',
      allowSort:true

    },
    {
      id: 'fat',
      alignment: 'right',
      disablePadding: true,
      label: 'Fat (g)',
      allowSort:true

    },
];

export default function IngredientsList() {

    const [ingredients, setIngredients] = useState([])
    async function refresh() {
        try {
            console.log('Refreshing')
            const result = await DataService.getIngredients()
            setIngredients(result)
        }
        catch (e) {
            console.error(e)
        }
    }
    useEffect(()=> {
        refresh()
        console.log(ingredients)
    }, [])


    return (
        <EnhancedTable
            headCells={headCells}
            rows={ingredients}
            title="Ingredients"
        />
    )
}