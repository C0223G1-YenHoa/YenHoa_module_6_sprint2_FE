import { useEffect, useState } from "react";
import QrReader from 'react-qr-scanner'
import { confirmQR } from "../services/reservation";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router";


export default function Scanner() {
  const [result, setResult] = useState([])
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const headers = {
    "Authorization": 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
  }


  let handleScan = (data) => {
    console.log(data);
    if (data != null) {
      setResult(JSON.parse(data.text));
    }
  }

  const confirm = async () => {
    try {
      await confirmQR(result.endTime, result.startTime, result.numberPlate, result.totalPrice, result.parkingSlotId
        , result.idCard, result.floor, headers)
    } catch (error) {
      navigate("/error")
      Swal.fire({
        icon: 'error',
        title: 'Mã QR không chính xác.',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  console.log(result);
  let handleError = (err) => {
    setError(err)

  }
  console.log(error);

  useEffect(() => {
    if (result.length) {
      confirm()
    }
  }, [result])
  return (
    <div>
      <QrReader
        delay={10000}
        onError={handleError}
        onScan={handleScan}
        style={{ height: "20%", width: "20%", marginTop: '9%', marginLeft: '20%' }}
        facingMode="environment"
      />
      <p></p>
    </div>
  );
}