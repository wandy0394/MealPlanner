import { Box } from "@mui/material"
import {styled} from "@mui/material";
import { Container } from "@mui/system";

export const ContentBox = styled(Box)({
    height:'100%',
    flexGrow:1,
    overflowY:'scroll',
    overflowX:'hidden',
    width:'100%',
    padding: '0 5vw',
})

