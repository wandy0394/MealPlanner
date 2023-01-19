import { Box, ListItem, Typography } from "@mui/material";
import { strawTheme } from "../components/utility/StrawTheme";



export default function SidePane({children}) {
    return (
        <Box sx={{width: '12vw', 
                minWidth:240, 
                display:{xs:'none', sm:'none', md:'none', lg:'none', xl: 'flex'}, 
                height:{xs:'auto', md:'100%'}, 
                flexDirection:'column', 
                overflowY:'scroll',
                overflowX:'hidden',
                backgroundColor:strawTheme.palette.common.white,
                //scrollbarWidth:'thin',
                paddingBottom:'10rem',
            }}
        >
            {children}
        </Box>
    )
}