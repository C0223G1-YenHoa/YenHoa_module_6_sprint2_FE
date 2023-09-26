import axios from "axios";


export async function getTypes(){
    const types= await axios.get("http://localhost:8080/type")
    return types.data
 }
export async function getType(id){
    const type= await axios.get("http://localhost:8080/type/"+id)
    return type.data
 }