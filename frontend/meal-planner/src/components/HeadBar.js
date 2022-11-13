import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import SearchBar from "./SearchBar"
import DropDown from "./DropDown"
import AccountMenu from "./AccountMenu"
import NavMenu from "./NavMenu"
import MenuIcon from "@mui/icons-material/Menu"




export default function HeadBar() {


    return (
        <AppBar sx ={{position:'fixed', padding:0, margin:0, height:'5vh'}}>
            <Toolbar sx={{display:'flex', alignContent:'center', justifyContent:'space-between'}}>
                <Box sx = {{display:'flex', alignContent:'center', gap:'2rem'}}>
                    <IconButton>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant='h5'>Meal Manager</Typography>
                </Box>
                <SearchBar />                    
            </Toolbar>
        </AppBar>
    )
}