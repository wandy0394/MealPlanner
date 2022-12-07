import { Box, ListItem, Typography } from "@mui/material";
import MenuLink from "../components/menu/MenuLink";

function Splash() {
    return (
        <Box sx={{height:'15vh', display:'flex', justifyContent:'center', border:'solid'}}>
            Space
        </Box>

    )
}


export default function SidePane({children}) {
    return (
        <Box sx={{width: '12vw', 
                minWidth:120, 
                display:{xs:'none', md:'flex'}, 
                height:{xs:'auto', md:'100%'}, 
                flexDirection:'column', 
                borderLeft: '2px solid #9e9e9e',
                overflow:'scroll',
            }}
        >
    
            {children}
          
        </Box>
    )
}