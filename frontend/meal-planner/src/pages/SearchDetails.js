import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

export default function SearchDetails(props) {
    const params = useParams()
    return (
        <Box>
            Hello
            {
                params.id
            }

        </Box>
    )
}