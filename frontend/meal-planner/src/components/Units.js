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

    // convert(input) {
    //     switch(input) {
    //         case 'ml':
    //             return function mlToG(data) {
    //                 return data
    //             }
    //             break;
    //         case 'tbsp':
    //             return function tbspToG(data) {
    //                 return 21.25*data
    //             }
    //             break;
    //         case 'tsp':
    //             function tspToG(data) {
    //                 return data*4.92892
    //             }
    //             break;
    //         case 'cup':
    //             return function cupToG(data) {
    //                 return 250*data
    //             }
    //             break;
    //         case 'g':
    //             return function gToG(data) {
    //                 return data
    //             }
    //             break;
    //         default:
    //             return function doNothing(data) {
    //                 return 0
    //             }
    //     }
    // }

    // convert = {
    //     g: this.gToG,
    //     ml: this.mlToG,
    //     tspn: this.tspnToG,
    //     tbsp: this.tbspToG,
    //     cup: this.cupToG
    // }
}

export default units