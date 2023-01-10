import { Box } from "@mui/material";

export default function SideMenuHeader({children}) {
    return (
        <Box sx={{
                minHeight:'15vh', 
                display:'flex', 
                flexDirection:'column', 
                alignItems:'center', 
                justifyContent:'center', 
                padding:'0rem 2rem', 
                margin:'0', 
            }}
        >
            {children}
        </Box>

    )
}