import HeadBar from "../components/HeadBar"
import NavMenu from "../components/NavMenu"
import SearchBar from "../components/SearchBar"
import { Outlet } from "react-router-dom"
import { Box, List } from "@mui/material"


export default function Layout() {
    return (
        <div style={{height:'100vh'}}>
            <HeadBar/>
            <div style={{height:'100%', display:'flex'}}>
                <div style={{height:{xs:'auto', md:'100%'}}}>
                    <NavMenu/>
                </div>
                <div style={{height:'100%', flexGrow:1}}>
                    <div style={{display:'flex', height:'100%'}}>
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    )
}