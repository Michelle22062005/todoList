import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"

interface totoListProps{
   _id:string,
  title:string,
  starDate: number,
  endDate?:number
  comments: string[];
  status: "pending" | "inProgress" | "done"
}

export const useHome=()=>{
      const [title, setTitle] = useState("")
     const [todoList, setTodoList] =useState<totoListProps[]>([])
     const router = useRouter()

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setTitle(e.target.value);
    };

 const fetchData= async()=>{
  const res =await fetch("/api/todolist")
  const info= await res.json()
  console.log(info.data)
  setTodoList(info.data)
}

useEffect(()=>{
  fetchData()
  console.log("Cargo la carta")
},[])


 const addList= async()=>{
  //Validar que no este vacio
   if(title.trim() === ""){return }
  

   try{
    const status = "pending"
    const res = await fetch("/api/todolist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
    },
      body: JSON.stringify({
        title: title,
        status: status,
        starDate: Date.now(),
        endDate: Date.now(),
      })
    })
    const data = await res.json();
  setTitle("")
  router.refresh()
  fetchData()
    console.log("Guardamos en DB:", data);
   }catch(error){
    console.error("Error al guardar en DB:", error)
   }

 }


 const startTask = async(_id:string)=>{
 
  try{
    await fetch("/api/todolist",{
      method:"PUT",
      headers:{ "Content-Type": "application/json"},
      body: JSON.stringify({_id, status: "inProgress", starDate:Date.now()})
    })
    fetchData()
  }catch(error){
    console.error(error)
  }
 }

const doneTask =async (_id:string)=>{
  
  try{
    
    await fetch("/api/todolist",{
      method:"PUT",
      headers:{ "Content-Type": "application/json"},
      body: JSON.stringify({_id, status: "done", endDate:Date.now()})
    })
    fetchData()
  }catch(error){
    console.error(error)
  }
}
const editTask=async (_id:string, newTitle:string)=>{
  try{
    await fetch("/api/todolist",{
      method:"PUT",
      headers: {"Content-Type": "application/json"},
      body:JSON.stringify({_id, title: newTitle})
    })
    fetchData()
  }catch(error){
    console.error(error)
  }
}

const deleteTask =async(_id:string)=>{

 try{
   await fetch("/api/todolist", {
  method: "DELETE",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ _id })
})
fetchData()
// window.location.reload();
 }catch(error){
  console.error(error)
 }
}
    return{
        handleChange,addList,startTask,doneTask,editTask,deleteTask,todoList,
    }
}