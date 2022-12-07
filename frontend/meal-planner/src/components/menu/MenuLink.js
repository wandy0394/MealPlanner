import { styled } from "@mui/material"
import { useState } from "react"
import { NavLink } from "react-router-dom"

const MenuLink = styled(NavLink)(({theme})=> ({
    textDecoration:'none',
    color:theme.palette.common.black,
    '&:hover': {
        color:theme.palette.secondary.main,
        marginRight:'0',
        borderTopRightRadius:'0',
        borderBottomRightRadius:'0',
    },
    borderRadius:theme.shape.borderRadius,
    marginLeft:'1rem',
    marginRight:'1rem',
}))


export default MenuLink