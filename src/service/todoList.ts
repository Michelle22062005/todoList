import { useParams } from "next/navigation";

export const getTodoList= async()=>{
    try{
        const res =await fetch("/api/todolist");
        const data= await res.json()
    
        return data
    }catch(error){
        console.error(error)
    }
    
}

export const getTodoListById =async(_id: string)=>{
  try{
    const res = await fetch(`/api/todolist/${_id}`);
    const data = await res.json();


    console.log("json completo:", data)       // { data: {...}, code: 200 }
    console.log("json.data:", data.data)      // aquí están los datos
    console.log("json.data._id:", data.data?._id)
    console.log("data", data)
    return data;
  }catch(error){
    console.error(error)
  }
}

export const createTodo = async (title: string, status: string, starDate: Date, endDate: Date, duration:number) => {
  try {
    const res = await fetch("/api/todolist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, status, starDate, endDate, duration })
    });

    const data = await res.json(); //  await
    return data;

  } catch (error) {
    console.error(error);
  }
};

export const createComments = async (_id:string, comment:string) => {
  try {
   // const { _id } = useParams();
    const res = await fetch(`/api/todolist/${_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ comment})
    });

    const data = await res.json(); //  await
    return data;

  } catch (error) {
    console.error(error);
  }
};