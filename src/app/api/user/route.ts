export function GET(){
    console.log("se llamo la funcion de Get")
    return Response.json({
        name:"Maria",
        code:200,
        message:" el servidor contesto"
    })
}