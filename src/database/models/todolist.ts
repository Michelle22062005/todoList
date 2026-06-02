import { Schema, model, Model } from "mongoose";

const todoListSchema = new Schema({
    id:{
        type:String,
        require:[true, "The id is require"]
    },
    title: {
        type:String,
        require:[true, "The title is require"],
    },
    status:{
        type:String,
        require:[true, "The title is require"],
    },
    starDate:{
        type:Date
    },
    endDate:{
        type:Date
    },
    duration:{
        type:Number
    }
});

export let Todolist:Model<any>;
try{
    Todolist=model("todolists")

}catch(error){
    Todolist=model("todolists", todoListSchema)
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
