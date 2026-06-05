import { Schema, model, Model } from "mongoose";
interface ITodoList extends Document {
  _id: string
  title: string
  status: "pending" | "inProgress" | "done"
  starDate?: Date
  endDate?: Date
  duration?: number
  comments:string[]
}

const todoListSchema = new Schema<ITodoList>({
  
    title: {
        type:String,
        required:[true, "The title is required"],
    },
    status:{
        type:String,
        required:[true, "The title is required"],
    },
    starDate:{
        type:Date
    },
    endDate:{
        type:Date
    },
    duration:{
        type:Number
    },
    comments:[
        {
            type:String
        }
    ]
});

export let Todolist:Model<ITodoList>;
try{
    Todolist=model<ITodoList>("todolists")

}catch(error){
    Todolist=model<ITodoList>("todolists", todoListSchema)
}


// const Shemma=mongoose.Schema;

// const ObjectIs= Shemma.ObjectId;
// const TodoListShemma = new Shemma({
//     title:String,
//     status:String,
//     starDate:Date,
//     endDate:Date
// })
export default todoListSchema;
