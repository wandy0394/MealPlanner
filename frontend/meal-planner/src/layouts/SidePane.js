import { Box, ListItem, Typography } from "@mui/material";



export default function SidePane({children}) {
    return (
        <Box sx={{width: '12vw', 
                minWidth:120, 
                display:{xs:'none', md:'flex'}, 
                height:{xs:'auto', md:'100%'}, 
                flexDirection:'column', 
                borderLeft: '2px solid #9e9e9e',
                overflowY:'scroll',
                overflowX:'hidden',
                //scrollbarWidth:'thin',
                paddingBottom:'10rem'
            }}
        >
    
            {children}
          
        </Box>
    )
}