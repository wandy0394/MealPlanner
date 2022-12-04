import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';

const filter = createFilterOptions();

export default function IngredientAutoComplete({ingredients, dispatch}) {
    const [value, setValue] = useState(null);
    const [foodId, setFoodId] = useState(null)

    useEffect(()=> {
        dispatch(value, foodId)
    },[foodId, value])

    return (
    <Autocomplete
        value={value}
        onChange={(event, newValue) => {
            if (typeof newValue === 'string') {
                setValue({
                    name: newValue,
                });
            } else if (newValue && newValue.inputValue) {
                // Create a new value from the user input
                setValue({
                    name: newValue.inputValue,
                });
            } else {
                console.log(event.target.id)
                setValue(newValue);
                setFoodId(event.target.id)
            }
        }}
        filterOptions={(options, params) => {
            const filtered = filter(options, params);

            const { inputValue } = params;
            // Suggest the creation of a new value
            const isExisting = options.some((option) => inputValue === option.name);
            if (inputValue !== '' && !isExisting) {
                filtered.push({
                    inputValue,
                    name: `Add "${inputValue}"`,
                });
            }
            return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id="ingredients-autocomplete"
        options={ingredients}
        getOptionLabel={(option) => {
            // Value selected with enter, right from the input
            if (typeof option === 'string') {
                return option;
            }
            // Add "xxx" option created dynamically
            if (option.inputValue) {
                return option.inputValue;
            }
            // Regular option
            return option.name;
        }}
        renderOption={(props, option) => <li {...props} id={option.id}>{option.name}</li>}
        //sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
            <TextField {...params} variant='standard' label="Ingredient name" required/>
        )}
    />
    );
}