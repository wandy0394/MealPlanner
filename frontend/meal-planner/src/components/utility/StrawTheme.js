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
            main: '#d08131'
        },
        background: {
            paper: '#f5f6c9',
            default: '#FFFFEE ',
            menuItem: '#d9a441'
        }
    },
})