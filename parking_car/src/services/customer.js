import axios from "axios";

export async function createCustomer(customer,port){
     await axios.post("http://localhost:8080/customers/" + port,customer)
}

export async function verify(code){
     await axios.get("http://localhost:8080/customers/verify/"+code)
}
export async function update(money,email){
     await axios.put("http://localhost:8080/customers/"+money+"/"+email)
}
export async function getCustomer(email){
   const customer= await axios.get("http://localhost:8080/customers/"+email)
   return customer.data
}

