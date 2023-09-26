import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import { update } from "../services/customer";
import "../return/return.css"
import { useNavigate } from "react-router";



export default function Done() {
    const navigate = useNavigate();
    const [responseCode, setResponseCode] = useState()
    const [money, setMoney] = useState(0)
    const [name, setName] = useState("")
    const user = localStorage.getItem("user")
    const getURL = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const responseCode = urlParams.get('vnp_ResponseCode');
        const amount = urlParams.get('vnp_Amount');
        console.log(responseCode);
        setResponseCode(responseCode)
        setMoney(amount)
    }

    const check = () => {
        if (user != null) {
            const account = JSON.parse(user);
            setName(account.name)
        }

    }

    const done = async () => {
        if (responseCode) {
            if (responseCode == "00" && money != 0) {
                await update(money, name)
                Swal.fire({
                    icon: 'success',
                    title: 'Nạp tiền thành công.',
                    showConfirmButton: false,
                    timer: 2000
                })
            } else {
                navigate('/')
                Swal.fire({
                    icon: 'error',
                    title: 'Nạp tiền thất bại.',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }
    }

    setTimeout(() => {
        navigate('/')
    }, 5000)


    useEffect(() => {
        done()
    }, [responseCode])
    useEffect(() => {
        getURL()
    }, [])

    useEffect(() => {
        check()
    }, [])

    return (
        <>
            <div className="wrap">
                <div className="wallet" id="wallet">
                    <div className="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlSpace="preserve" width={24} height={24} viewBox="0 0 458.5 458.5" fill="currentColor">
                            <path d="M336.7 344c-22 0-39.9-18-39.9-39.9V238c0-22 18-39.8 39.9-39.8h105.7v-65.9c0-17-13.8-30.7-30.7-30.7h-381c-17 0-30.7 13.7-30.7 30.7v277.6c0 17 13.8 30.8 30.7 30.8h381c17 0 30.7-13.8 30.7-30.8V344H336.7z" />
                            <path d="M440.5 220H336.7c-10 0-18 8-18 18V304c0 10 8 18 18 18h103.8c10 0 18-8 18-18V238c0-10-8-18-18-18zm-68 77a26 26 0 1 1 0-52 26 26 0 0 1 0 52zM358.2 45.2A39.7 39.7 0 0 0 308 20L152 71.6h214.9l-8.7-26.4z" />
                        </svg>
                    </div>
                    <div className="coin coin--animated" id="w1" />
                    <div className="coin coin--animated" id="w2" />
                    <div className="coin coin--animated" id="w3" />
                    <div className="coin coin--animated" id="w4" />
                    <div className="coin coin--animated" id="w5" />
                    <div className="coin coin--animated" id="w6" />
                    <div className="coin coin--animated" id="w7" />
                </div>
            </div>


        </>
    )
}