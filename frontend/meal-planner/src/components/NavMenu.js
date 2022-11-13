import { Box, ListItem, ListItemText, ListItemIcon, MenuItem, Typography } from "@mui/material"
import { styled } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import EggIcon from "@mui/icons-material/Egg"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { NavLink } from "react-router-dom"

export default function NavMenu() {
    return (
        // <Box sx={{width:'12vw'}}>
           
        <Box sx={{width: '12vw', minWidth:180, display:{xs:'none', md:'flex'}, height:{xs:'auto', md:'100%'}, flexDirection:'column', gap:'0.5vh'}}>
            
            <ListItem sx={{height:'15vh'}}>
                Something could go here
            </ListItem>            
            <NavLink to='/search'>
                <MenuItem>
                    <ListItemIcon><SearchIcon fontSize='large'/></ListItemIcon>

                    <ListItemText><Typography variant="h6">Search...</Typography></ListItemText>
                </MenuItem>
            </NavLink>
            <NavLink to='/ingredients'>
                <MenuItem>
                    <ListItemIcon><EggIcon fontSize='large'/></ListItemIcon>
                    <ListItemText><Typography variant="h6">Ingredients</Typography></ListItemText>
                </MenuItem>
            </NavLink>
            <NavLink to='/recipes'>
                <MenuItem>
                    <ListItemIcon><MenuBookIcon fontSize='large'/></ListItemIcon>
                    <ListItemText><Typography variant="h6">Recipes</Typography></ListItemText>
                </MenuItem>
            </NavLink>
            <NavLink to='/meal-plans'>
                <MenuItem>
                    <ListItemIcon><CalendarMonthIcon fontSize='large'/></ListItemIcon>
                    <ListItemText><Typography variant="h6">Meal Plans</Typography></ListItemText>
                </MenuItem>
            </NavLink>
            <NavLink to='/shopping-list'>
                <MenuItem>
                    <ListItemIcon><ShoppingCartIcon fontSize='large'/></ListItemIcon>
                    <ListItemText>                    
                            <Typography variant="h6">Shopping List</Typography>                    
                    </ListItemText>
                </MenuItem>
            </NavLink>
        </Box>

    )
}