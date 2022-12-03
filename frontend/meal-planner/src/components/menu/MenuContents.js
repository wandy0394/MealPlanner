import { ListItemText, ListItemIcon, MenuItem, Typography } from "@mui/material"

import SearchIcon from "@mui/icons-material/Search"
import EggIcon from "@mui/icons-material/Egg"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import MenuLink from "./MenuLink"

import {styled} from "@mui/material";


const StyledMenuItem = styled(MenuItem)({
    display:'flex',     
    gap:'1rem',
    alignItems: 'center',
})



export default function MenuContents() {
    return (
        <>
            <MenuLink to='/search'>
                <StyledMenuItem>
                    <SearchIcon fontSize='large'/>
                    <Typography variant="h6">Search...</Typography>
                </StyledMenuItem>
            </MenuLink>
            <MenuLink to='/ingredients'>
                <StyledMenuItem>
                    <EggIcon fontSize='large'/>
                    <Typography variant="h6">Ingredients</Typography>
                </StyledMenuItem>
            </MenuLink>
            <MenuLink to='/recipes'>
                <StyledMenuItem>
                    <MenuBookIcon fontSize='large'/>
                    <Typography variant="h6">Recipes</Typography>
                </StyledMenuItem>
            </MenuLink>
            <MenuLink to='/meal-plans'>
                <StyledMenuItem>
                    <CalendarMonthIcon fontSize='large'/>
                    <Typography variant="h6">Meal Plans</Typography>
                </StyledMenuItem>
            </MenuLink>
            <MenuLink to='/shopping-list'>
                <StyledMenuItem>
                    <ShoppingCartIcon fontSize='large'/>
                    <Typography variant="h6">Shopping List</Typography>                    
                </StyledMenuItem>
            </MenuLink>
        </>
    )
}