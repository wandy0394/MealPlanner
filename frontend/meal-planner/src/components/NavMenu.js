import { Box, ListItem, ListItemText, ListItemIcon, MenuItem, Typography } from "@mui/material"
import { styled } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import EggIcon from "@mui/icons-material/Egg"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { NavLink } from "react-router-dom"
import MenuLink from "./MenuLink"
import MenuContents from "./MenuContents"
// const MenuLink = styled(NavLink)({
//     textDecoration:'none'
// })

export default function NavMenu() {
    return (
        <Box sx={{width: '12vw', minWidth:180, display:{xs:'none', md:'flex'}, height:{xs:'auto', md:'100%'}, flexDirection:'column', gap:'0.5vh'}}>
            <ListItem sx={{height:'15vh', display:'flex', justifyContent:'center'}}>
                <MenuLink to='/' style={{textDecoration:'none'}}>
                    <Typography variant='h4'>Meal Manager</Typography>
                </MenuLink>
            </ListItem>            
            <MenuContents/>
        </Box>

    )
}