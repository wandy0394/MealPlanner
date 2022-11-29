import { ListItemText, ListItemIcon, MenuItem, Typography } from "@mui/material"

import SearchIcon from "@mui/icons-material/Search"
import EggIcon from "@mui/icons-material/Egg"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import MenuLink from "./MenuLink"


export default function MenuContents() {
    return (
        <>
            <MenuLink to='/search' style={{textDecoration:'none'}}>
                <MenuItem>
                    <ListItemIcon><SearchIcon fontSize='large'/></ListItemIcon>

                    <ListItemText><Typography variant="h6">Search...</Typography></ListItemText>
                </MenuItem>
            </MenuLink>
            <MenuLink to='/ingredients'>
                <MenuItem>
                    <ListItemIcon><EggIcon fontSize='large'/></ListItemIcon>
                    <ListItemText><Typography variant="h6">Ingredients</Typography></ListItemText>
                </MenuItem>
            </MenuLink>
            <MenuLink to='/recipes'>
                <MenuItem>
                    <ListItemIcon><MenuBookIcon fontSize='large'/></ListItemIcon>
                    <ListItemText><Typography variant="h6">Recipes</Typography></ListItemText>
                </MenuItem>
            </MenuLink>
            <MenuLink to='/meal-plans'>
                <MenuItem>
                    <ListItemIcon><CalendarMonthIcon fontSize='large'/></ListItemIcon>
                    <ListItemText><Typography variant="h6">Meal Plans</Typography></ListItemText>
                </MenuItem>
            </MenuLink>
            <MenuLink to='/shopping-list'>
                <MenuItem>
                    <ListItemIcon><ShoppingCartIcon fontSize='large'/></ListItemIcon>
                    <ListItemText>                    
                            <Typography variant="h6">Shopping List</Typography>                    
                    </ListItemText>
                </MenuItem>
            </MenuLink>
        </>
    )
}