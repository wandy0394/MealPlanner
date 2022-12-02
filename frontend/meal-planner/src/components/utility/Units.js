const units = {
    g:'g',
    ml:'ml',
    cup: 'cup',
    tbsp: 'tbsp',
    tsp: 'tsp'
}
const FACTOR = 0.01

export class UnitConverter {
    
    convert = {
        ml: function mlToG(input) {
            return input
        },

        tbsp: function tbspToG(input) {
            return 21.25*input
        },
        

        tsp: function tspnToG(input) {
            return input*4.92892
        },
        cup: function cupToG(input) {
            return 250*input
        },
        g: function gToG(input) {
            return input
        }
    }

    calculateCarbs(foods) {
        return (Object.entries(foods).reduce((prev, [key, data]) => {
            //console.log(data.unit)
            return this.convert[data.unit](parseFloat(data.qty))*parseFloat(data.carbs) + prev
        },0)) * FACTOR
    }

    calculateProtein(foods) {
        return (Object.entries(foods).reduce((prev, [key, data]) => {
            //console.log(data.unit)
            return this.convert[data.unit](parseFloat(data.qty))*parseFloat(data.protein) + prev
        },0)) * FACTOR
    }

    calculateFat(foods) {
        return (Object.entries(foods).reduce((prev, [key, data]) => {
            //console.log(data.unit)
            return this.convert[data.unit](parseFloat(data.qty))*parseFloat(data.fat) + prev
        },0)) * FACTOR
    }


    calculateCalories(foods) {
        return (Object.entries(foods).reduce((prev, [key, data]) => {
            //console.log(data.unit)
            return this.convert[data.unit](parseFloat(data.qty))*parseFloat(data.calories) + prev
        },0)) * FACTOR
    }

}

export default units