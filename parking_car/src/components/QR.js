import { useEffect, useRef, useState } from "react";
import "../scanner/scanner.css"
import QRCode from 'qrcode.react';
import logo from '../login/YH.png'

let data = {};

export default function QR(info) {
    console.log(info);
    useEffect(() => {
        if (info.data != undefined) {
            data = { ...info }
        }
    }, [info])

    const [qr, setQr] = useState('')

  


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
    };


    useEffect(() => {
        const qrCodeValue = JSON.stringify(data.data);
        console.log(qrCodeValue);
        setQr(qrCodeValue)
    }, [data])

    return (
        <>
            <div className="ab">

                <div style={{ marginTop: '8%' }}>
                    <div className="row">
                        <p style={{ paddingLeft: '10px', textAlign: 'center', fontSize: '18px', color: 'white' }}>Cảm ơn quý khách đã sử dụng dịch vụ của
                            chúng tôi! <br /> Quý khách vui lòng sử dụng mã QR này để xác nhận khi đến bãi đỗ xe <span style={{ fontSize: '20px', fontFamily: '"Open Sans", sans-serif' }}>
                                YANHUA<span style={{ color: '#ffc451' }}>.</span></span></p></div>
                    <div className="row" style={{ width: '350px', margin: '5px auto', boxShadow: '0 20px 40px -14px rgba(0, 0, 0, 0.75)', borderRadius: '25px', border: '1px solid rgba(0, 0, 0, 0.75)' }}>
                        <div style={{ background: '#000000', width: '350px', padding: '20px 30px', borderRadius: '25px 25px 0 0', display: 'flex' }}>
                            <img style={{ borderRadius: '100%', width: '70px', height: '70px' }} src={logo} />
                            <div style={{ width: '100%' }}><p style={{ textAlign: 'center', color: 'white', paddingTop: '15px', paddingLeft: '7px', fontSize: '40px', margin: 0, fontFamily: '"Open Sans", sans-serif' }}>
                                YANHUA<span style={{ color: '#ffc451' }}>.</span></p></div>
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
                            <a style={{ color: 'white', paddingLeft: '130px' }} onClick={() => { downloadQR() }}> Tải mã QR </a>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}