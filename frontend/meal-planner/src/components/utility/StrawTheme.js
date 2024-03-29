import { createTheme, responsiveFontSizes } from "@mui/material/styles"

const theme = createTheme({
    palette: {
        mode:'light',
        common: {
            black:'#111111',
            white:'#FEFEF0',
            darkgrey:'#BDBDBD',
            grey:'#DFDFDF',
            lightgrey:'#EEEEEE',
            lightgrey2:'#F0F0F0'
        },
        primary: {
            main:'#d9a441',
            light: '#f5f6c9'
        },
        secondary: {
            main: '#822a2a'
        },
        background: {
            paper: '#FEFEF0',
            default: '#FAFAF0',
            menuItem: '#d9a441'
        }
    },
    shape: {
        borderRadius:8
    },
    typography:{
        // h1: {fontSize:'5vmax'},
        // h2: {fontSize:'3vmax'},
        // h3: {fontSize:'2vmax'},
        // h4: {fontSize:{xs:'5vmax', md:'1.5vmax'}},
        // h5: {fontSize: '1.25vmax'},
        // h6: {fontSize: '1.1vmax'},
        // body1: {fontSize: '1vmax'},
        // body2: {fontSize: '0.8vmax'},
        // subtitle1: {fontSize: '0.5vmax'},
        // subtitle2: {fontSize: '0.35vmax'},
    },
})

export const strawTheme = responsiveFontSizes(theme)