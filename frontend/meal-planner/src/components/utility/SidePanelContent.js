import { Box } from "@mui/material";

export default function SidePanelContent(props) {
    const {children, value, index, ...other} = props;
    return (
            <>
                {(value === index) ? (
                    <Box hidden={value !== index} sx={{ flexGrow:'1'}}>
                        {children}
                    </Box>
                ) : ('')}    
            </>
    )
}