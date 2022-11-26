class UnitConverter {

    mlToG(input) {
        return input
    }

    tbspToG(input) {
        return 21.25*input
    }

    tspnToG(input) {
        return input*4.92892
    }
    cupToG(input) {
        return 250*input
    }
}

export default new UnitConverter