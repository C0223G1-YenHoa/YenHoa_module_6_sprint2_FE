import axios from "axios";

export async function login(account) {
    await axios.post("http://localhost:8080/account/login", account).then((res) => {
        if (res.data.token) {
            console.log(res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data));
        }
        return res.data;
    })
}

export async function getAccount(email){
    const acc= await axios.get("http://localhost:8080/account/"+email)
    return acc.data
 }

export function logout() {
    localStorage.removeItem("user");
    
}