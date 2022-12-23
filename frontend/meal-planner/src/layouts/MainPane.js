import { Box, Stack, Typography } from "@mui/material";
import { ContentBox } from "../components/utility/ContentBox";
import SidePane from "./SidePane";

export default function MainPane({title, buttons, sideContent, mainContent, children}) {
    return (
        <Box sx={{height:'100%'}}>
            <Stack direction='row' sx={{height:'100%'}}>
                <ContentBox>
                    <Box sx={{height:'15vh', display:'flex', flexDirection:'column', justifyContent:'center'}}>
                        <Typography variant='h3' sx={{textAlign:'left'}}>
                            {title}       
                            {buttons}
                        </Typography>
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