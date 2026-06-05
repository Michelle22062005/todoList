import { useContext, useEffect,useState } from "react"
import { DarkMode } from "./DarkMode";
import { ContextGlobal } from "@/context/Context";
import { Button, Card, CloseButton } from "@heroui/react";
import { useRouter } from "next/navigation";
interface totoListProps{
  title:string,
  starDate?: number | undefined,
  endDate?: number | undefined;
  status: "pending" | "inProgress" | "done"
  _id:string
  duration?: number
  onStart: (_id:string)=>void
  onFinish: (_id:string)=>void
  onDelete: (_id:string)=>void
  onEdit: (_id:string, newTitle:string)=>void
}
export const Card1 = ({title, starDate, endDate, status, _id, duration, onStart,onFinish,onDelete, onEdit}:totoListProps)=>{
  const [elapsed, setElapsed] = useState<string>("00:00:00")
  const [editing, setEditing] = useState(false)  
  const [newTitle, setNewTitle] = useState(title)
  const router=useRouter()
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

    const ver=()=>{
      router.push(`/todolist/${_id}`)
    }

          return(
             <div>
      
         <Card className={`w-full items-stretch md:flex-row  ${status == "pending" ? "card-pe" : ""} ${status == "inProgress" ? "card-ip" : ""} ${status == "done" ? "card-d" : ""} ${!isSelected ? "bg-violet-800" : ""}`}>

      {/* <div className="relative h-[140px] w-full shrink-0 overflow-hidden rounded-2xl sm:h-[120px] sm:w-[120px]">
        <img
          alt="Cherries"
          className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover select-none"
          loading="lazy"
          src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/cherries.jpeg"
        />
      </div> */}
      <div className="flex flex-1 flex-col gap-3">
        <Card.Header className="gap-1">
           <DarkMode/>
           {/*Título o input de edición */}
        {editing ? (
          <div>
            <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} type="text" />
            <Button onPress={() => { onEdit(_id, newTitle); setEditing(false) }}>Guardar</Button>
            <Button onPress={() => setEditing(false)}>Cancelar</Button>
          </div>
        ) : (
          <Card.Title className="title text-black pr-8">{title}</Card.Title>
          
        )}
 
          <Card.Description>
             <div className="card-timer">
          {status == "pending" && "Tarea sin iniciar"}
          {status == "inProgress" && `Tiempo: ${elapsed}`}
          {status == "done" && `Duración: ${totalTimeFormated}`}
        </div>
          <div>{status}</div>
          </Card.Description>
          
        </Card.Header>
        <Card.Footer className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">

        {/* Botones */}
        {status == "pending" && <Button  onPress={() => onStart(_id)}>Iniciar tarea</Button>}
        {status == "pending" && <Button style={{ backgroundColor: "#a3e" }} onPress={() => setEditing(true)}>Editar tarea</Button>}
        {status == "inProgress" && <Button onPress={() => onFinish(_id)}>Finalizar tarea</Button>}
        {status == "done" && <Button onPress={() => onDelete(_id)}>Eliminar tarea</Button>}
      <Button onPress={ver} className="bg-[#542]">Ver mas</Button>
      
        </Card.Footer>
      </div>
    </Card>

    </div>
  )
}
