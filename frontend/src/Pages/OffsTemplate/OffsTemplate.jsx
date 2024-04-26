import React, {useState, useEffect} from 'react'
import AddNewOff from '../../Components/AddNewOff/AddNewOff'
import Offs from '../../Components/Offs/Offs'

export default function OffsTemplate() {

    const [getOffs, setGetOffs] = useState([])

    useEffect(() => {
        getAllOffs()
    }, [])

    const getAllOffs = () => {
        fetch(`http://localhost:8000/api/offs`)
            .then(res => res.json())
            .then(result => setGetOffs(result))
    }

    return (
        <div>
            <AddNewOff  getAllOffs={getAllOffs}/>
            <Offs getOffs={getOffs} getAllOffs={getAllOffs} />
        </div>
    )
}
