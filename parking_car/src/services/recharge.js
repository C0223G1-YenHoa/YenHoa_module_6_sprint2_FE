import axios from "axios";

export async function recharge(money) {
    const res = await axios.post("http://localhost:8080/vnpay/create/"+ money)
        return res.data;

    }



