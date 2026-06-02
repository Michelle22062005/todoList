export const getTodoList= async()=>{
    try{
        const res =await fetch("/api/todolist");
        const data= res.json()
    
        return data
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