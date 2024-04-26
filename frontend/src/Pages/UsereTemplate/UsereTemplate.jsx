import React, { useEffect, useState } from 'react'
import Users from '../../Components/Users/Users'
import AddNewUser from '../../Components/AddNewUser/AddNewUser'

export default function UsereTemplate() {

    const [allUsers, setAllUsere] = useState([])

    useEffect(() => {
        getAllUsers()
    }, [])

    const getAllUsers = () => {
        fetch('http://localhost:8000/api/users')
            .then(res => res.json())
            .then(result => {
                setAllUsere(result)
            })
    }


    return (
        <div>
            <AddNewUser getAllUsers={getAllUsers}/>
            <Users allUsers={allUsers} getAllUsers={getAllUsers}/>
        </div>
    )
}
