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
    },
    typography:{
        h1: {fontSize:'5vmax'},
        h2: {fontSize:'3vmax'},
        h3: {fontSize:'2vmax'},
        h4: {fontSize:'1.5vmax'},
        h5: {fontSize: '1.25vmax'},
        h6: {fontSize: '1.1vmax'},
        body1: {fontSize: '1vmax'},
        body2: {fontSize: '0.8vmax'},
        subtitle1: {fontSize: '0.5vmax'},
        subtitle2: {fontSize: '0.35vmax'},
    }
})