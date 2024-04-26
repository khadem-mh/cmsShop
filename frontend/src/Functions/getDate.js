function getDateShamsy() {
    let date = new Date()
    let dateShamsy = date.toLocaleDateString()
    return dateShamsy
}

function getDateStartMonth() {
    let dateMonthStart
    if (new Date().toLocaleDateString().toString().length === 8) dateMonthStart = new Date().toLocaleDateString().slice(0, 7).concat('۰۱')
    else dateMonthStart = new Date().toLocaleDateString().slice(0, 8).concat('۰۱')

    return dateMonthStart
}

export {
    getDateShamsy,
    getDateStartMonth
} 