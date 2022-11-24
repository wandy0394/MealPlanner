import AddBox from "@mui/icons-material/AddBox";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from '@mui/icons-material/Refresh'
import { Paper, Stack, Box, Typography, IconButton, Tabs, Tab, Button } from "@mui/material";
import { ContentBox } from "../components/ContentBox";
import { useEffect, useState } from "react";
import CreateRecipeForm from "../components/CreateRecipeForm";

function TabPanel(props) {
    const {children, value, index, ...other} = props;
    return (
        <div hidden={value !== index}>
            {(value === index) ? (
                <Box>
                    {children}
                </Box>

            ) : ('')}
        </div>
    )
}

export default function Recipes() {
    const [open, setOpen] = useState(false)
    const [recipes, setRecipes] = useState([])
    const [tabValue, setTabValue] = useState(0)

    function handleClickOpen() {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    function handleTabChange(e, newValue) {
        setTabValue(newValue)
    }

    async function refresh() {
        try {
            console.log('Refreshing Recipes')
            //const result = await DataService.getRecipes()
            //setRecipes(result)
        }
        catch (e) {
            console.error(e)
        }
    }
    useEffect(()=> {
        //refresh()
    }, [])
    

    return (
        <ContentBox sx={{height:'100%'}}>
            <Stack sx={{height:'100%'}}>
                <Box>
                    <Paper elevation={3}>
                        <Typography variant='h2' sx={{margin:'1rem auto', textAlign:'center', border:'none'}}>
                            What would you like to make?
                            <IconButton onClick={refresh}><RefreshIcon/></IconButton>
                        </Typography>
                    </Paper>
                </Box>
                <Box sx={{width:'100%'}}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        variant='scrollable'
                        scrollButtons='auto'
                    >
                        <Tab label='Recipe 1'></Tab>
                        <Tab label='Recipe 2'></Tab>
                        <Tab label='Recipe 3'></Tab>
                        <Tab icon={<AddIcon/>} iconPosition='start' label='Create'></Tab>
                    </Tabs>
                </Box>
                <Box sx={{flexGrow:1}}>
                    <TabPanel value={tabValue} index={0}>
                        Stuff goes here0
                    </TabPanel>
                    <TabPanel value={tabValue} index={1}>
                        Stuff goes here1
                    </TabPanel>
                    <TabPanel value={tabValue} index={2}>
                        Stuff goes here2
                    </TabPanel>

                    <TabPanel value={tabValue} index={3}>
                        <CreateRecipeForm/>
                    </TabPanel>
                </Box>
            </Stack>
        </ContentBox>
    )
}