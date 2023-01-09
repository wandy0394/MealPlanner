import { Box } from "@mui/material"
import {styled} from "@mui/material";

export const ContentBox = styled(Box)({
    height:'100%',
    flexGrow:1,
    overflowY:'scroll',
    overflowX:'hidden',
    width:'76vw',
    padding: '0 5vw',
    paddingBottom:'10vh',
    scrollbarWidth:"thin"
})

