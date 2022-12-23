import { Box } from "@mui/material";

export default function TabPanel(props) {
    const {children, value, index, ...other} = props;
    return (
        <>
            {(value === index) ? (
                <Box hidden={value !== index} sx={{marginTop:'2rem'}}>
                    {children}
                </Box>
            ) : ('')}
        </>
    )
}