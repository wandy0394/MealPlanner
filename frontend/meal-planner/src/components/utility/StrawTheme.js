import { createTheme } from "@mui/material/styles"

export const strawTheme = createTheme({
    palette: {
        mode:'light',
        common: {
            black:'#111111',
            white:'#FEFEF0',
            grey:'#DFDFDF',
            lightgrey:'#EEEEEE',
            lightgrey2:'#F0F0F0'
        },
        primary: {
            main:'#d9a441',
            light: '#EAEAC0'
        },
        secondary: {
            main: '#d08131'
        },
        background: {
            paper: '#f5f6c9',
            default: '#FAFAF0',
            menuItem: '#d9a441'
        }
    },
    shape: {
        borderRadius:8
    }
})