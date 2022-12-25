import { Box, Stack, Typography } from "@mui/material";
import { ContentBox } from "../components/utility/ContentBox";
import SidePane from "./SidePane";

export default function MainPane({title, buttons, sideContent, mainContent, headerContent, children}) {
    return (
        <Box sx={{height:'100%'}}>
            <Stack direction='row' sx={{height:'100%'}}>
                <ContentBox>
                    <Box sx={{height:'15vh', display:'grid', gridTemplateColumns:'2fr 1fr', alignItems:'center'}}>
                        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column', justifyContent:'center'}}>
                            <Typography variant='h3' sx={{textAlign:'left', height:'100%', display:'flex', alignItems:"center"}}>
                                {title}       
                                {buttons}
                            </Typography>
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