'use client'
import { getUser } from "@/service/users";
import { useEffect, useState } from "react";
interface personProps{
    name:string,
    code: number,
    message:string
}
const User=()=>{
    const [person, setPerson] = useState<personProps>()

    const fetchData= async ()=>{
        const result = await getUser()
        setPerson(result)
        console.log(result)
    }

    useEffect(()=>{
        fetchData()
    },[])

    console.log(person)
    return(
        <>
        <h1>vista user</h1>
        <div>
            <p>La persona es: {person?.name}</p>
            <p>{person && person.message}</p>
            <p>{person && person.code}</p>
        </div>

        </>
    )
}
export default User