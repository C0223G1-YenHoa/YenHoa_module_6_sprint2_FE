import axios from "axios";


export async function getParkingSlot(idFloor){
    const slots= await axios.get("http://localhost:8080/parking_slot/"+idFloor)
    console.log(slots.data);
    return slots.data
 }
export async function getSlot(id){
    const slot= await axios.get("http://localhost:8080/parking_slot/slot/"+id)
    console.log(slot.data);
    return slot.data
 }


