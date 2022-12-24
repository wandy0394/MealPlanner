import { Box, Typography } from "@mui/material"

function Row({title, total,target, unit}) {
    return (
        <>
            <Typography variant="body1" sx={{display:'flex', alignItems:'center', justifyContent:'flex-end', paddingRight:'2rem'}}>{title}</Typography>
            <Box sx={{display:'flex', alignItems:'center', justifyContent:'flex-start'}}>
                <Typography variant="h4" display='inline' sx={{color:'goldenrod'}}>{total}</Typography>
                <Typography variant="body1" display='inline'>/{target}{unit}</Typography>
            </Box>
        </>
    )
}

export default function MealInfo(props) {
    const {totalCalories, totalProtein, totalCarbs, totalFat, targetCalories, targetProtein, targetFat, targetCarbs} = props

    return (
        <Box sx={{display:'grid', gridTemplateColumns:'1fr 1fr', gridTemplateRows:'repeat(5, 1fr)', color:'white', justifyContent:'center', alignContent:'center'}}>

            <Row
                title=''
                total='Total'
                target='Target'
            />

            <Row
                title='Calories'
                total={totalCalories}
                target={targetCalories}
                unit='kcal'
            />

<           Row
                title='Carbs'
                total={totalCarbs}
                target={targetCarbs}
                unit='g'
            />
            <Row
                title='Fat'
                total={totalFat}
                target={targetFat}
                unit='g'
            />
            <Row
                title='Protein'
                total={totalProtein}
                target={targetProtein}
                unit='g'
            />

        </Box>
    )
}