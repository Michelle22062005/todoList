'use client'
import { useState, useEffect} from "react"
import { Card1 } from "@/components/Card"
import { getTodoList } from "@/service/todoList"
import { useTranslation } from "@/context/i18nContext"
import { LanguageSelector } from "@/components/LanguagesSelector";

import { useRouter } from "next/navigation"


interface totoListProps{
   _id:string,
  title:string,
  starDate: number,
  endDate?:number
  comments: string[];
  status: "pending" | "inProgress" | "done"
}

export default function Home (){
  const [title, setTitle] = useState("")
 const [todoList, setTodoList] =useState<totoListProps[]>([])
  const {t}=useTranslation()
   const router = useRouter()



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // const info1=await getTodoList()
  setTitle(e.target.value);
    };
//  console.log(todoList)

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
//   useEffect(()=>{
//   const saveData =localStorage.getItem("user")
//   if(saveData)
//     setTodoList(JSON.parse(saveData))
//  },[])


 const addList= async()=>{
  //Validar que no este vacio
   if(title.trim() === ""){return }
  

   try{
    //const _id= crypto.randomUUID();
    const status = "pending"
    const res = await fetch("/api/todolist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
    },
      body: JSON.stringify({
        //id: _id,
        title: title,
        status: status,
        starDate: Date.now(),
        endDate: Date.now(),
      })
    })
    const data = await res.json();
  //  window.location.reload();
  setTitle("")
  router.refresh()
  fetchData()
    console.log("Guardamos en DB:", data);
   }catch(error){
    console.error("Error al guardar en DB:", error)
   }
  // console.log("ver",newDatos)
  // //setTodoList([...todoList, task])
 }


 const startTask = async(_id:string)=>{
  // setTodoList(prev => prev.map(task => 
  //   task.id === id 
  //     ? { ...task, status: "inProgress" as const, starDate: Date.now() } 
  //     : task
  // ));
  // console.log(`el id es ${id}`)
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
  // setTodoList(prev =>{
  //   const update = prev.map(task => {
  //     if(task.id === id && task.starDate){
  //       const endDate= Date.now() 
  //       const duracion= endDate - task.starDate
  //       return{ ...task, status: "done" as const, endDate, duracion}
  //     }
  //       return task 
  //        }
  //       )    
  //       console.log(setTodoList)
  //   localStorage.setItem("user", JSON.stringify(update))
    
  //   return update
  //       });
  // console.log(`el id es ${id}`)
 //localStorage.setItem("user", JSON.stringify(update))
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

 console.log(todoList)

 return(

    <div className="task">
      <h1 className="title-1">{t.title}</h1>
      <div className="addTask">
      <input className="bg-[#2d2e44] p-2 rounded-xl w-80 border " onChange={handleChange} type="text" value={title} placeholder={t.placeholder}/>
      <button className="rounded-xl bg-[#29a1d1] w-20" onClick={addList}>{t.addButton}</button>
      </div>
       <LanguageSelector />
        <div className="container" >
          
          {todoList.map((task)=>{
          return(
             <Card1 key={task._id}
             _id={task._id}  
             title={task.title} 
             starDate={task.starDate} 
             endDate={task.endDate}
             status={task.status} 
             comments={task.comments}
             onStart={startTask}
             onEdit={editTask}
             onFinish={doneTask} onDelete={deleteTask}/>
          )
        }
      )}
      </div>
      </div>
    )}

