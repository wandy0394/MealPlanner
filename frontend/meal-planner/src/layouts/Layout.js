import HeadBar from "../components/HeadBar"
import NavMenu from "../components/NavMenu"
import SearchBar from "../components/SearchBar"
import { Outlet } from "react-router-dom"
import { AppBar, Box, Drawer, List, ListItem, Toolbar, Typography } from "@mui/material"
import { useState } from "react"
import MenuContents from "../components/MenuContents"
import MenuLink from "../components/MenuLink"


export default function Layout() {
    const [menuOpen, setMenuOpen] = useState(false)
    function toggleMenu() {
        const value = menuOpen
        setMenuOpen(!value)
    }
    return (
        <div>
            <div style={{height:'100vh', display:'flex', flexDirection:'column'}}>
                <HeadBar toggleMenu={toggleMenu}/>
                <div style={{height:'90vh', display:'flex'}}>
                    <div style={{height:{xs:'auto', md:'100%'}}}>
                        <NavMenu/>
                    </div>
                    <div style={{height:'100%', flexGrow:1}}>
                        <div style={{display:'flex', height:'90vh', flexDirection:'column'}}>
                            <Outlet/>
                        </div>
                    </div>
                </div>
                <Drawer anchor='left' open={menuOpen} onClose={toggleMenu}>
                    <ListItem sx={{height:'15vh', display:'flex', justifyContent:'center'}}>
                        <MenuLink to='/' style={{textDecoration:'none'}}>
                            <Typography variant='h4'>Meal Manager</Typography>
                        </MenuLink>
                    </ListItem>   
                    <MenuContents/>
                </Drawer>
                <div style={{height:'5vh', border:'solid'}}>Some foooter goes here</div>            
                
            </div>

        </div>
    )
}