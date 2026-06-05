"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, CloseButton } from "@heroui/react";
import { createComments } from "@/service/todoList";

interface todo {
  title: string;
  starDate?: number | undefined;
  endDate?: number | undefined;
  status: "pending" | "inProgress" | "done";
  //_id:string
  //id:string
  duration?: number;
  comments: string[];
  onStart: (_id: string) => void;
  onFinish: (_id: string) => void;
  onDelete: (_id: string) => void;
  onEdit: (_id: string, newTitle: string) => void;
}
// eslint-disable-next-line @next/next/no-async-client-component
const DetailsTodoList = () => {
  const [todo, setTodo] = useState<todo | null>(null);
  const [comment, setComment] = useState("");
  const { _id } = useParams();
  const router=useRouter()
  //const { dato } = useParams();

  const fetchData = async () => {
    const res = await fetch(`/api/todolist/${_id}`);
    console.log("status", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.log("error", errorText);
      return;
    }
    const data = await res.json();

    console.log("data", data.data);

    setTodo(data.data);
  };
  const backTo=()=>{
    router.push("/")
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!_id) return;
    fetchData();
  }, [_id]);

  console.log("muestra", todo);

  const addComments = async () => {
    if(comment.trim()=== "")return
    try {
      await createComments(_id as string, comment);
      setComment("")
      fetchData()
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-5 m-5">
      <h1 className="text-5xl">TodoList Details</h1>
      <Button onPress={backTo}>Volver</Button>
      <Card className="w-full items-stretch md:flex-row bg-[#61b7c1]">
        <div className="relative h-[140px] w-full shrink-0 overflow-hidden rounded-2xl sm:h-[120px] sm:w-[120px]">
          <img
            alt="Cherries"
            className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover select-none"
            loading="lazy"
            src="https://d1lzasi9aszbz8.cloudfront.net/n_53_1721074300_Portada.jpg"
          />
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <Card.Header className="gap-1">
            <Card.Title className="pr-8 text-4xl text-black uppercase"></Card.Title>
            <p className="text-3xl uppercase">{todo?.title}</p>
            <span className="text-blue-200">ID: {_id}</span>
            <p className="text-black">{todo?.status}</p>
            <p>Inicio: {todo?.starDate}</p>
            <p>Fin: {todo?.endDate}</p>
            {/* <p>Duracion: {todo?.duration}</p> */}
            {/* <CloseButton aria-label="Close banner" className="absolute top-3 right-3" /> */}
          </Card.Header>
          <Card.Description>
           <h3 className="text-black">
            Escriba un Comentario: 
           </h3>
            <input type="text" value={comment} onChange={(e) =>setComment(e.target.value)} placeholder="Escriba un comentario" className="border border-2 p-3"/>

            <p>Comentarios:</p>
            {todo?.comments && todo.comments.length >0
            ? todo.comments.map((c,i) =>(
              <p key={i}>
             {c}
            </p>
            )) : <p>Sin comentarios</p>}
            
          </Card.Description>
          <Card.Footer className="mt-auto flex w-full flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
      
            <Button onPress={addComments} className="w-full sm:w-auto">Guardar</Button>
          </Card.Footer>
        </div>
      </Card>
    </div>
  );
};

export default DetailsTodoList;
