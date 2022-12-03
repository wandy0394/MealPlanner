import { createTheme } from "@mui/material/styles"

export const strawTheme = createTheme({
    palette: {
        mode:'light',
        common: {
            black:'#3e3e3e',
            white:'#FFFBD0',
            grey:'#8c8173'
        },
        primary: {
            main:'#d9a441'
        },
        secondary: {
            main: '#5b391e'
        },
        background: {
            paper: '#fbee9e',
            default: '#FFFFEA',
            menuItem: '#d9a441'
        }
    },

})