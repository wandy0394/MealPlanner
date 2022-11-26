const units = {
    g:'g',
    ml:'ml',
    cup: 'cup',
    tbsp: 'tbsp',
    tsp: 'tsp'
}


export class UnitConverter {

    convert = {
        ml: function mlToG(input) {
            return input
        },

        tbsp: function tbspToG(input) {
            return 21.25*input
        },
        

        tspn: function tspnToG(input) {
            return input*4.92892
        },
        cup: function cupToG(input) {
            return 250*input
        },
        g: function gToG(input) {
            return input
        }
    }

    // convert = {
    //     g: this.gToG,
    //     ml: this.mlToG,
    //     tspn: this.tspnToG,
    //     tbsp: this.tbspToG,
    //     cup: this.cupToG
    // }
}

export default units