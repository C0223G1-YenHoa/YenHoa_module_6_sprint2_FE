import axios from "axios";

export async function getFloors(){
    const floor= await axios.get("http://localhost:8080/floor")
    return floor.data
 }

