import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { verify } from "../services/customer";
import Home from "./Home";
import Swal from "sweetalert2";

export default function ConfirmEmail() {
    const navigate = useNavigate()
    const [flag, setFlag] = useState(false);
    const code = useParams();
    console.log(code.code);

    // const flagFunction = async (item) => {
    //     setFlag(item)
    // }

    const verifyCode = async () => {

        try {
            await verify(code.code)
            navigate("/")
            Swal.fire({
                icon: 'success',
                title: 'Xác nhận thành công.',
                showConfirmButton: false,
                timer: 3000
            })

        } catch (error) {
            // navigate("/")
            // Swal.fire({
            //     icon: 'info',
            //     title: 'Email đã được xác nhận hoặc thời gian xác nhận đã hết.',
            //     showConfirmButton: false,
            //     timer: 3000
            // })

        }

    }

    useEffect(() => {

        verifyCode()


    }, [])

    return (
        <>
            <Home />
        </>
    )
}