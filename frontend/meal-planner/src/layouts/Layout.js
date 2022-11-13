import HeadBar from "../components/HeadBar"
import NavMenu from "../components/NavMenu"
import SearchBar from "../components/SearchBar"
import { Outlet } from "react-router-dom"
import { Box } from "@mui/material"


export default function Layout() {
    return (
        <>
            <HeadBar/>
            <Box sx={{display:'flex', height:'100vh', alignItems:'center', alignContent:'center'}}>
                <NavMenu/>
                <Outlet/>
            </Box>
        </>
    )
}