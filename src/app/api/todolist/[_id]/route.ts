import {Todolist} from "@/database/models/todolist";
import {conectionDB }from "@/lib/database";
import { Comments } from "@gravity-ui/icons";


export async function GET(
    request: Request,
    { params }: { params: Promise<{ _id: string }> },
) {
    
    await conectionDB();

  const { _id } = await params;
    console.log("Buscando id:", _id)
console.log("dato:", _id)
console.log("largo:", _id.length)
//   const datos = await Todolist.find({ _id: dato });
const datos = await Todolist.findById(_id).lean();
console.log("Resultado mongo:", datos)

  return Response.json({
    // data: datos,
     data: {
        ...datos,
        _id: datos?._id.toString()  // ✅ sin errores
    },
    code: 200,
    message: "el servicio contesto",
  });
}

export async function POST(request: Request,
  {params}:{ params:Promise<{_id:string}>}
){
  await conectionDB();
  const {_id}= await params
    const body = await request.json();

    const updated = await Todolist.findByIdAndUpdate(
       _id,
       {$push: { comments: body.comment}},
       {new: true}
    )
    if(!updated){
      return Response.json({ data: null, code: 404, message: "Tarea no encontrada" })
    }

   
    return Response.json({
        data:updated,
        code:200,
        message:"Comentario creado exitosamente"
    })
}