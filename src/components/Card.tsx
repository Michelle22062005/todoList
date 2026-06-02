import { useContext, useEffect,useState } from "react"
import { DarkMode } from "./DarkMode";
import { ContextGlobal } from "@/context/Context";
interface totoListProps{
  title:string,
  starDate?: number | undefined,
  endDate?: number | undefined;
  status: "pending" | "inProgress" | "done"
  id:string
  duration?: number
  onStart: (id:string)=>void
  onFinish: (id:string)=>void
  onDelete: (id:string)=>void
  onEdit: (id:string, newTitle:string)=>void
}
export const Card1 = ({title, starDate, endDate, status, id, duration, onStart,onFinish,onDelete, onEdit}:totoListProps)=>{
  const [elapsed, setElapsed] = useState<string>("00:00:00")
  const [editing, setEditing] = useState(false)  
  const [newTitle, setNewTitle] = useState(title)
 const { isSelected, setIsSelected } = 
   useContext(ContextGlobal);
  const formatTime = (ms: number) => {
    const hours = Math.floor(ms / 3600000)
    const minutes = Math.floor((ms % 3600000) / 60000)
    const seconds = Math.floor((ms % 60000) / 1000)
    const format = (n: number) => String(n).padStart(2, "0")
    return `${format(hours)}:${format(minutes)}:${format(seconds)}`
  }
   
  useEffect(() => {
    if (!starDate || status === "done") return
    const interval = setInterval(() => {
      const deltaTime = Date.now() - new Date(starDate).getTime()
      if (deltaTime < 0) return
      setElapsed(formatTime(deltaTime))
    }, 1000)
    return () => clearInterval(interval)
  }, [starDate, status])
    
 

const totalTimeFormated = starDate && endDate
    ? formatTime(new Date(endDate).getTime() - new Date(starDate).getTime())
    : "00:00:00"
    console.log("starDate:", starDate, "endDate:", endDate)


          return(
             <div>
      <div className={`card ${status == "pending" ? "card-pe" : ""} ${status == "inProgress" ? "card-ip" : ""} ${status == "done" ? "card-d" : ""} ${isSelected ? "bg-violet-800" : ""} `}>

        {/* Timer */}
        <div className="card-timer">
        <DarkMode/>
          {status == "pending" && "Tarea sin iniciar"}
          {status == "inProgress" && `Tiempo: ${elapsed}`}
          {status == "done" && `Duración: ${totalTimeFormated}`}
        </div>

        {/*Título o input de edición */}
        {editing ? (
          <div>
            <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} type="text" />
            <button onClick={() => { onEdit(id, newTitle); setEditing(false) }}>Guardar</button>
            <button onClick={() => setEditing(false)}>Cancelar</button>
          </div>
        ) : (
          <div className="title">{title}</div>
        )}

        <div>{status}</div>

        {/* Botones */}
        {status == "pending" && <button  onClick={() => onStart(id)}>Iniciar tarea</button>}
        {status == "pending" && <button style={{ backgroundColor: "#a3e" }} onClick={() => setEditing(true)}>Editar tarea</button>}
        {status == "inProgress" && <button onClick={() => onFinish(id)}>Finalizar tarea</button>}
        {status == "done" && <button onClick={() => onDelete(id)}>Eliminar tarea</button>}
      </div>
    </div>
  )
}
