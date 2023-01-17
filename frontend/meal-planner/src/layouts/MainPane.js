import { Box, Stack, Typography } from "@mui/material";
import { ContentBox } from "../components/utility/ContentBox";
import SidePane from "./SidePane";

const titleStyle = {
    '@media only screen and (max-width:600px)':{
        fontSize:'1.2rem'
    }, 
    textAlign:'left', 
    height:'100%', 
    display:'flex', 
    alignItems:"center"
}

const headerStyle = {
    height:'15vh', 
    display:'grid', 
    '@media only screen and (min-width:600px)':{
        gridTemplateColumns: '2fr 1fr', 
    },
    '@media only screen and (max-width:600px)':{
        gridTemplateRows:'1fr 1fr',
        paddingTop:'5vh',
    },
    alignItems:'center',
    border:'solid'
}

export default function MainPane({title, buttons, sideContent, mainContent, headerContent, children}) {
    return (
        <Box sx={{height:'100%'}}>
            <Stack direction='row' sx={{height:'100%'}}>
                <ContentBox>
                    <Box sx={headerStyle}>
                        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'row', alignItems:'center', border:'solid'}}>
                            <Typography variant='h4' sx={titleStyle}>
                                {title}       
                            </Typography>
                            <Box sx={{height:'100%', display:'flex', alignItems:'center'}}>
                                {buttons}
                            </Box>
                        </Box>
                        {headerContent}
                    </Box>
                    {mainContent}
                </ContentBox>
                <SidePane>
                    {sideContent}
                </SidePane>
            </Stack>
            {children}
        </Box>
    )
}