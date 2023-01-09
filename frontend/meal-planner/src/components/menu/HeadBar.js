import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import SearchBar from "./SearchBar"
import MenuIcon from "@mui/icons-material/Menu"




export default function HeadBar({toggleMenu}) {


    return (
        <AppBar sx ={{position:'fixed'}}>
            <Toolbar sx={{display:'flex', alignContent:'center', justifyContent:'space-between'}}>
                <Box sx = {{alignContent:'center', gap:'2rem', display:{xs:'flex', md:'none'}}}>
                    <IconButton onClick={toggleMenu}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant='h5'>Meal Manager</Typography>
                </Box>
                {/* <SearchBar />                     */}
            </Toolbar>
        </AppBar>
    )
}