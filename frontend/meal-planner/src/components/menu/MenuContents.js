import { ListItemText, ListItemIcon, MenuItem, Typography, Box } from "@mui/material"

import SearchIcon from "@mui/icons-material/Search"
import EggIcon from "@mui/icons-material/Egg"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AssessmentIcon from '@mui/icons-material/Assessment'
import MenuLink from "./MenuLink"

import {styled} from "@mui/material";
import { strawTheme } from "../utility/StrawTheme"


const StyledMenuItem = styled(MenuItem)(({theme}) => ({
    display:'flex',     
    gap:'1rem',
    alignItems: 'center',
    borderRadius:theme.shape.borderRadius,
    borderTopRightRadius:'0',
    borderBottomRightRadius:'0',
}))



export default function MenuContents() {
    const activeStyle= {
        color:strawTheme.palette.common.black,
        //backgroundColor:strawTheme.palette.background.menuItem,
        backgroundColor:strawTheme.palette.background.default,
        marginRight:'0',
        borderTopRightRadius:'0',
        borderBottomRightRadius:'0',
    }

    return (
        <>
            <MenuLink id={0} to='/dashboard' style={({isActive})=> isActive ? activeStyle:undefined}>
                <StyledMenuItem>
                    <AssessmentIcon fontSize='large'/>
                    <Typography variant="h6">Dashboard</Typography>
                </StyledMenuItem>
            </MenuLink>
            <MenuLink id={1} to='/search' style={({isActive})=> isActive ? activeStyle:undefined}>
                <StyledMenuItem>
                    <SearchIcon fontSize='large'/>
                    <Typography variant="h6">Search...</Typography>
                </StyledMenuItem>
            </MenuLink>
            <MenuLink id={2} to='/ingredients' style={({isActive})=> isActive ? activeStyle:undefined}>
                <StyledMenuItem>
                    <EggIcon fontSize='large'/>
                    <Typography variant="h6">Ingredients</Typography>
                </StyledMenuItem>
            </MenuLink>
            <MenuLink id={3} to='/recipes' style={({isActive})=> isActive ? activeStyle:undefined}>
                <StyledMenuItem>
                    <MenuBookIcon fontSize='large'/>
                    <Typography variant="h6">Recipes</Typography>
                </StyledMenuItem>
            </MenuLink>
            <MenuLink id={4} to='/meal-plans' style={({isActive})=> isActive ? activeStyle:undefined}>
                <StyledMenuItem>
                    <CalendarMonthIcon fontSize='large'/>
                    <Typography variant="h6">Meal Plans</Typography>
                </StyledMenuItem>
            </MenuLink>
            {/* <MenuLink id={5} to='/shopping-list' style={({isActive})=> isActive ? activeStyle:undefined}>
                <StyledMenuItem>
                    <ShoppingCartIcon fontSize='large'/>
                    <Typography variant="h6">Shopping List</Typography>                    
                </StyledMenuItem>
            </MenuLink> */}
        </>
    )
}