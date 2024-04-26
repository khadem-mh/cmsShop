import persianToEnglishNumber from "./persianToEnglishNumber"

const getAllOrders = (setGetOrders, setOrdersTotalPrice) => {
    fetch(`http://localhost:8000/api/orders`)
        .then(res => res.json())
        .then(result => {
            setGetOrders(result)
            let totlaPrice = 0
            let dateShamsy = new Date().toLocaleDateString()
            result.map(order => {
                if (order.isActive) {

                    if (persianToEnglishNumber(dateShamsy).slice(0, 7).trim() === order.date.slice(0, 7).trim()) {
                        if (order.off > 0) {
                            totlaPrice += (order.price - (order.price * order.off / 100)) * order.count
                        } else {
                            totlaPrice += order.price * order.count
                        }
                        setOrdersTotalPrice(totlaPrice)
                    }

                }
            })
        })
}

export default getAllOrders