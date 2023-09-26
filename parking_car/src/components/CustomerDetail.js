import { useEffect, useState } from "react"
import { getCustomer } from "../services/customer";
import { json } from "react-router";


export default function CustomerDetail() {
    const [customer, setCustomer] = useState({})
    const account =JSON.parse(localStorage.getItem('user')) ;

    const Customer = async () => {
        console.log(account.name);
        const cus = await getCustomer(account.name)
        console.log(cus);
    }

    useEffect(() => {
    Customer()
    },[])


    return (
        <>

        </>
    )
}