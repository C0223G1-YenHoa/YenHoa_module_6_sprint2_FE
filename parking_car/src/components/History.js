import { useParams } from "react-router"
import "../history/history.css"
import { useEffect, useState } from "react"
import { getHistory, getReservation } from "../services/reservation"
import "../scanner/scanner.css"
import QRCode from 'qrcode.react';
import logo from '../login/YH.png';
import nothing from '../reservation/nothing.jpg'
import moment from 'moment';
import numeral from 'numeral';
import Swal from 'sweetalert2';

export default function History() {
    const param = useParams()
    const [histories, setHistories] = useState([])
    const [page, setPage] = useState(0)
    const [reservation, setReservation] = useState({})
    const [qr, setQr] = useState('')
    const [flag, setFlat] = useState(true)
    const getReser = async (id) => {
        const reser = await getReservation(id)
        console.log(reser);
        setReservation({
            endTime: reser.endTime,
            startTime: reser.startTime,
            numberPlate: reser.numberPlate,
            totalPrice: reser.totalPrice,
            parkingSlotId: reser.parkingSlot.id,
            floor: reser.parkingSlot.floorParking.id,
            idCard: reser.idCard,

        })
    }

    useEffect(() => {
        const qrCodeValue = JSON.stringify(reservation);
        setQr(qrCodeValue)
    }, [reservation])

    console.log(qr);

    const headers = {
        "Authorization": 'Bearer ' + JSON.parse(localStorage.getItem('user')).token
    }
    const getHistor = async () => {
        console.log(localStorage.getItem('user').token);
        const his = await getHistory(page, param.id,headers)
        setHistories(his)
    }
    console.log(histories);
    useEffect(() => {
        getHistor()
    }, [param.id])

    const formatDate = (time) => {

        const date = time.substring(0, 11)
        const hour = time.substring(11)

        return `${hour} ${moment(date).format('DD/MM/YYYY')}`
    }
    const previous = async () => {
        const newPage = page - 1;
        if (newPage >= 0) {
            setHistories(await getHistory(newPage, param.id))
            setPage(newPage)
        }
    }
    const nextPage = async () => {
        const newPage = page + 1;
        if (newPage < histories.totalPages) {
            setHistories(await getHistory(newPage, param.id))
            setPage(newPage)
        }
    }



    const downloadQR = () => {
        const canvas = document.getElementById('qrcode');
        const pngUrl = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
        console.log('pngUrl', pngUrl);
        let downloadLink = document.createElement('a');
        downloadLink.href = pngUrl;
        downloadLink.download = 'YanHuaParkingCarQR.png';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
    return (
        <>

            <div id="history" style={{ marginTop: '7%' }}>
                <div className="container" >
                    <h1 style={{ fontFamily: '  font-family: "Open Sans", sans-serif;', paddingTop: '15px' }}>LỊCH SỬ GIAO DỊCH</h1>
                    <table className="rwd-table">
                        <tbody>
                            <tr>
                                <th>STT</th>
                                <th>Bắt đầu</th>
                                <th>Kết thúc</th>
                                <th>Biển số xe</th>
                                <th>Vị trí</th>
                                <th>Tổng tiền (VND)</th>
                                <th>Mã QR</th>
                            </tr>
                            {histories.content &&
                                histories.content.length != 0 ?
                                histories.content.map((history, index) =>
                                    <tr key={index}>
                                        <td data-th="Supplier Code">
                                            {(page * 5) + (index + 1)}
                                        </td>
                                        <td data-th="Supplier Name">
                                            {formatDate(history.startTime)}
                                        </td>
                                        <td data-th="Invoice Number">
                                            {formatDate(history.endTime)}
                                        </td>
                                        <td data-th="Invoice Date">
                                            {history.numberPlate}
                                        </td>
                                        <td data-th="Due Date">
                                            Tầng {history.parkingSlot.floorParking.id} - YH.{history.parkingSlot.id}
                                        </td>
                                        <td data-th="Net Amount">
                                            {numeral(history.totalPrice).format('0,0')}
                                        </td>
                                        <td>

                                            {new Date() > new Date(history.endTime) ?
                                                <a></a>
                                                :
                                                <a data-bs-toggle="modal"
                                                    data-bs-target="#exampleModalDetail12" onClick={() => { getReser(history.id) }} ><i class="fa-solid fa-qrcode"></i></a>
                                            }
                                        </td>
                                    </tr>
                                ) 
                                :

                                <td>
                                    <h3>Hãy tiến hành đặt chỗ ngay nhé !</h3>
                                </td>
                            }


                        </tbody>

                    </table>
                    <div style={{ paddingLeft: '45%', height: '50px' }}>
                        {page <= 0 ?
                            <a onClick={() => { previous() }} href="#" class="btn-arrow btn-arrow-left" title="Previous" style={{
                                cursor: 'not-allowed'
                            }}></a>
                            :
                            <a onClick={() => { previous() }} href="#" class="btn-arrow btn-arrow-left" title="Previous"></a>
                        }
                        {page >= histories.totalPages - 1 ?
                            <a onClick={() => { nextPage() }} href="#" class="btn-arrow btn-arrow-right" title="Next" style={{ cursor: 'not-allowed' }}></a>
                            :
                            <a onClick={() => { nextPage() }} href="#" class="btn-arrow btn-arrow-right" title="Next" ></a>

                        }
                    </div>
                    {/* QR */}

                </div>

            </div>
            <div id="qr">

                <div className="modal fade" data-bs-keyboard="false" id="exampleModalDetail12" tabIndex={-1} aria-labelledby="exampleModalLabel12"
                    aria-hidden="true" style={{ marginTop: '7%', marginLeft: '7%' }}>
                    <div className="modal-dialog modal-fullscreen-md-down " >
                        <div className="modal-dialog" role="document" >
                            <div className="modal-content" style={{ borderRadius: '2%' }}>
                                <div className="modal-body" >
                                    <div className="row" style={{ width: '350px', margin: '5px auto', boxShadow: '0 20px 40px -14px rgba(0, 0, 0, 0.75)', borderRadius: '25px', border: '1px solid #ffc451' }}>
                                        <div style={{ background: '#ffc451', width: '350px', padding: '20px 30px', borderRadius: '25px 25px 0 0', display: 'flex' }}>
                                            <img style={{ borderRadius: '100%', width: '70px', height: '70px', border: '1px solid #000000' }} src={logo} />
                                            <div style={{ width: '100%' }}><p style={{ textAlign: 'center', color: 'white', paddingTop: '15px', paddingLeft: '7px', fontSize: '40px', margin: 0, fontFamily: '"Open Sans", sans-serif' }}>
                                                YANHUA<span style={{ color: '#ffffff' }}>.</span></p></div>
                                        </div>
                                        <div style={{ width: '250px', height: '200px', margin: '30px auto', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <QRCode
                                                id='qrcode'
                                                value={qr}
                                                size={250}
                                                level={'H'}
                                                includeMargin={true}

                                            />

                                        </div>
                                        <div className="ac">
                                            <a style={{ color: 'white', paddingLeft: '130px' }} onClick={() => {
                                                downloadQR()
                                            }}> Tải mã QR </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}