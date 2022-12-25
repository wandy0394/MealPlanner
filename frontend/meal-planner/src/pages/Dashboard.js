import { Typography } from "@mui/material";
import SideMenuHeader from "../components/menu/SideMenuHeader";
import MainPane from "../layouts/MainPane";

export default function Dashboard() {
    return (
        <MainPane
            title='Summary'
            mainContent={
                <>
                    Hello
                </>
            }
            sideContent={
                <>
                    <SideMenuHeader>
                        <Typography variant='h4'>Macro Summary</Typography>

                    </SideMenuHeader>
                </>
            }

        
        />
    )
}