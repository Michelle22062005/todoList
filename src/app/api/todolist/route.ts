import { conectionDB } from "@/lib/database"
import { Todolist } from "@/database/models/todolist"


conectionDB();

export async function GET(){ 
  
     const data=await Todolist.find();

    console.log(data)
    //console.log("la base de datos",db)
    return Response.json({
       data:data,
       code:200,
       message:"el servicio contesto"
    })
}
export async function POST(request: Request){
    const body = await request.json();

    const newTodoList = await Todolist.create({
        id: body.id,
        title: body.title,
        status: body.status ||  "pending" || "inProgress" || "done",
        starDate: body.starDate,
        endDate: body.endDate,
        duration:body.duration
    })

   
    return Response.json({
        data:newTodoList,
        code:200,
        message:"Tarea creada exitosamente"
    })
}
export async function PUT(request:Request){
    try{
        const body=await request.json()
        const update=await Todolist.findOneAndUpdate(
            { id: body.id },
            { title:body.title,status: body.status, starDate: body.starDate, endDate: body.endDate },
        )
        return Response.json({data: update, code:200})
    }catch(error){
        console.error(error)
    }
}
export async function DELETE(request: Request){
    try{
        const {id}=await request.json()
        const deleted = await Todolist.findOneAndDelete({id})
        console.log("Tarea eliminada", deleted)
        return Response.json({ code: 200, message: "Tarea eliminada" })

    }catch(error){
        console.error(error)
    }

}
