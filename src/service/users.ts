
export const getUser= async()=>{

    const res =await fetch("/api/user");
    const data= res.json()
    return data
}