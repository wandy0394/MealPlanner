import { styled } from "@mui/material"
import { NavLink } from "react-router-dom"

const MenuLink = styled(NavLink)(({theme})=> ({
    textDecoration:'none',
    color:theme.palette.common.black,
    '&:hover': {
        color:theme.palette.secondary.main
    }
}))

export default MenuLink