import axios from "axios";

export async function doneBill(reservation) {
    await axios.post("http://localhost:8080/reservation",reservation).then((result)=>{
        return result.data;
    })
}

export async function confirmQR(idCard, slotId, total, numberPlate, start, end,floor,headers) {
    await axios.post("http://localhost:8080/reservation/qr/"+idCard +"/"+slotId+"/"+total+"/"+numberPlate+"/"+start+"/"+end+"/"+floor,{headers}).then((result)=>{
        return result.data;
    })
}

export async function getHistory(page,id,headers){
const res=await axios.get(`http://localhost:8080/reservation/history?page=${page}&&id=${id}`,{headers})
return res.data;
}

export async function getReservation(id){
const res=await axios.get(`http://localhost:8080/reservation/qr/`+id)
return res.data;
}