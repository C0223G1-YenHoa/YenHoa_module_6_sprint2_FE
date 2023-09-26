import { useEffect, useState } from "react"
import "../reservation/reservation.css"
import car from '../reservation/zyro-image.png'
import { getFloors } from "../services/floor"
import { getParkingSlot, getSlot } from "../services/parking_slot"
import logo from '../login/YH.png'
import { getType, getTypes } from "../services/type"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useLocation, useNavigate } from "react-router"
import Swal from 'sweetalert2';
import { getAccount } from "../services/account"
import moment from 'moment';
import numeral from 'numeral';
import { doneBill } from "../services/reservation"
import Header from "./Header"
import * as yup from "yup"
import "../scanner/scanner.css"
import QRCode from 'qrcode.react';
import { getCustomer } from "../services/customer"


export default function Reservation() {
  const [info, setInfo] = useState({})
  const [f, setF] = useState(false)
  const [fl, setFl] = useState(false)
  const [customer, setCustomer] = useState({})
  const [hourS, setHourS] = useState("")
  const [hourE, setHourE] = useState("")
  const [dateS, setDateS] = useState("")
  const [dateE, setDateE] = useState("")
  const [flag, setFlag] = useState(true)
  const [floors, setFloors] = useState([])
  const [floor, setFloor] = useState(1)
  const [slots, setSlots] = useState([])
  const [slot, setSlot] = useState({})
  const [types, setTypes] = useState([])
  const [typee, setTypee] = useState({})
  const [discount, setDiscount] = useState(1)
  const [name, setName] = useState("")
  const [account, setAccount] = useState({})
  const [diffH, setDiffH] = useState(0)
  const [total, setTotal] = useState(0)
  const location = useLocation();
  const navigate = useNavigate();
  const user = localStorage.getItem("user")
  const [reservation, setReservation] = useState({})
  const modal = "#exampleModalDetail1"
  const [qr, setQr] = useState('')
  const check = () => {
    if (user != null) {
      const account = JSON.parse(user);
      setName(account.name)
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
  };


  const getAllFloor = async () => {
    const fls = await getFloors()
    setFloors(fls)
  }

  const getParking = async () => {
    const slot = await getParkingSlot(floor)
    setSlots(slot)
  }

  const getAllType = async () => {
    const t = await getTypes()
    setTypes(t)
  }

  const getSl = async (id) => {
    const s = await getSlot(id)
    setSlot(s)
  }

  const setReser = async (re) => {
    setReservation(re)
  }
  const accountt = async () => {
    if (name != '') {
      const cus = await getAccount(name)
      const cust = await getCustomer(name)
      setCustomer(cust)
      setAccount(cus)
    } else {
      setAccount("")
    }
  }

  const handleKeyUp = () => {
    let start;
    let end;
    let s = document.getElementById("start").value
    let en = document.getElementById("end").value
    let st = document.getElementById("start_time").value
    let endt = document.getElementById("end_time").value
    let plate = document.getElementById("number_plate").value
    let cccd = document.getElementById("id_card").value

    const t = st + " " + s
    start = new Date(t)
    const e = endt + " " + en
    end = new Date(e)
    const today = new Date()
    const currentDate = new Date();
    const future =new Date(currentDate.getTime() + 5 * 24 * 60 * 60 * 1000);
    if (s != "" && en != "" && st != "" && endt != "") {
      if (start > future) {
        Swal.fire({
          icon: 'error',
          title: 'Vui lòng chọn thời gian bắt đầu trong vòng 5 ngày gần nhất.',
          showConfirmButton: false,
          timer: 2000
        })
      } else {
        if (start < today || end < today) {
          Swal.fire({
            icon: 'error',
            title: 'Vui lòng chọn thời gian bắt đầu từ hôm nay.',
            showConfirmButton: false,
            timer: 2000
          })
        } else {
          if (start > end) {
            Swal.fire({
              icon: 'error',
              title: 'Thời gian bắt đầu phải trước thời gian rời bãi.',
              showConfirmButton: false,
              timer: 2000
            })
            setFl(false)
          } else {
            const oneHour = 60 * 60 * 1000;
            let diffHour = Math.abs((end - start) / oneHour)
            if (diffHour >= 24 && diffHour / 24 < 7 && discount != 2 && discount == 1) {
              Swal.fire({
                icon: 'info',
                title: 'Bạn có thể chọn gói ngày để được nhận ưu đãi hơn.',
                showConfirmButton: false, timer: 2000
              })
            } else if (diffHour / 24 >= 7 && diffHour / 24 < 30 && discount == 2) {
              Swal.fire({
                icon: 'info',
                title: 'Bạn có thể chọn gói tuần để được nhận ưu đãi hơn.',
                showConfirmButton: false, timer: 2000
              })
            } else if (diffHour / 24 >= 30 && discount != 4) {
              Swal.fire({
                icon: 'info',
                title: 'Bạn có thể chọn gói tháng để được nhận ưu đãi hơn.',
                showConfirmButton: false, timer: 2000
              })
            }
            setFl(true)
            if (diffHour < 24 && discount != 1) {
              console.log("1");
              Swal.fire({
                icon: 'info',
                title: 'Vui lòng chọn gói giờ <small>để thích hợp với thời gian bạn chọn.<small>',
                showConfirmButton: false, timer: 2000
              })
              setFl(false)
            } else if (diffHour / 24 <= 7 && discount == 3 || discount == 4) {
              Swal.fire({
                icon: 'info',
                title: 'Vui lòng chọn gói giờ <small>để thích hợp với thời gian bạn chọn.<small>',
                showConfirmButton: false, timer: 2000
              })
              setFl(false)
              console.log("2");
            } else if (diffHour / 24 < 30 && diffHour / 24 > 7 && diffHour > 24 && discount != 3) {
              Swal.fire({
                icon: 'info',
                title: 'Vui lòng chọn gói giờ <small>để thích hợp với thời gian bạn chọn.<small>',
                showConfirmButton: false, timer: 2000
              })
              setFl(false)
              console.log("3");
            }
            setDiffH(diffHour)
            setHourS(s)
            setHourE(en)
            setDateS(st)
            setDateE(endt)
          }
        }
      }
    } else if (s == "" && en == "" && st == "" && endt == "") {

      Swal.fire({
        icon: 'info',
        title: 'Vui lòng chọn thời gian đỗ xe.',
        showConfirmButton: false, timer: 2000
      })
      setFl(false)
    }

    if (plate == "" || cccd == "") {

      setFl(false)
    }

  }




  let reser = async (typeId) => {
    const type = await getType(typeId)
    setTypee(type)

    const tota = Math.round((diffH * slot.priceSlot - (diffH * slot.priceSlot * type.discount)) * 100) / 100
    setTotal(tota)
  }

  const convert = (hour) => {
    const totalMinutes = Math.floor(hour * 60);
    const convertedHours = Math.floor(totalMinutes / 60);
    const convertedMinutes = totalMinutes % 60; // 

    return `${convertedHours} giờ ${convertedMinutes} phút`;
  }


  const done = async () => {
    let e;
    let st;
    st = dateS + " " + hourS
    e = dateE + " " + hourE
    const abc = {
      endTime: e,
      startTime: st,
      numberPlate: reservation.number_plate,
      totalPrice: total,
      account: account,
      parkingSlot: slot,
      type: typee,
      idCard: reservation.id_card
    }
    try {

      setInfo({
        endTime: e,
        startTime: st,
        numberPlate: reservation.number_plate,
        totalPrice: total,
        parkingSlotId: slot.id,
        floor: slot.floorParking.id,
        idCard: reservation.id_card
      })


      await doneBill(abc).then(() => {

        Swal.fire({
          icon: 'success',
          title: 'Đặt chỗ thành công.',
          showConfirmButton: false,
          timer: 1500

        })

      })
      setFlag(!flag)
    } catch (error) {
      Swal.fire({
        icon: 'info',
        title: 'Rất tiếc,<br> chỗ hiện tại đã được đặt bởi một khách hàng khác.<br><p style={{fontSize:10px}}> Xin vui lòng tìm một lựa chọn khác.</p>',
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          title: 'title-info'
        }
      })
      setFlag(!flag)
    }

  }




  useEffect(() => {
    const qrCodeValue = JSON.stringify(info);
    console.log(qrCodeValue);
    setQr(qrCodeValue)
  }, [info])



  useEffect(() => {
    reser(discount)
  }, [reservation])

  useEffect(() => {
    getAllFloor()
  }, [])
  useEffect(() => {
    getParking()
  }, [floor, flag])
  useEffect(() => {
    check()
  }, [])
  useEffect(() => {
    accountt()
  }, [name])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [info])

  if (user == null) {
    Swal.fire({
      icon: 'info',
      title: 'Vui lòng đăng nhập để đặt chỗ.',
      showConfirmButton: false, timer: 1500
    }).then(
      () => {
        navigate('/')
      }
    )
  }

  return (
    <>

      <div style={{ marginTop: '10%' }}>
        <div style={{ display: 'none' }}>
          <Header value={flag} />
        </div>
        <div style={{ paddingLeft: '500px', display: 'flex' }} className="form-group">
          <span style={{ paddingTop: '8px', paddingRight: '6px', fontWeight: 'bold' }} className="form-label">Chọn tầng đỗ xe: </span>

          <select style={{ width: '150px' }} className="form-control" onChange={(e) => { setFloor(e.target.value) }}>
            {floors && floors.map((floor, index) =>

              <option style={{ textAlign: 'center' }} key={index} value={floor.id} >-- Tầng {index + 1} --</option>
            )
            }
          </select>
        </div>
        <div className="car-park">
          <div className="exit">  </div>

          <div className="row" >
            {slots && slots.map((slot) =>
              <div className="col col-3">

                <div className="park col-12">
                  {slot.availability ?
                    <>
                      <input data-bs-toggle="modal" disabled
                        data-bs-target="#exampleModalDetail" type="radio" id={slot.id} value={slot.id}
                        onClick={() => {
                          getAllType()
                          getSl(slot.id)
                        }} />
                      <label style={{ background: '#b3aa97' }} htmlFor={slot.id} className="disabled"><img style={{ width: '130px', height: '70px', paddingTop: '7px', paddingBottom: '7px', padding: '7px 7px' }} src={car} />
                      </label>
                    </>
                    :
                    <>
                      <input onClick={() => {
                        getAllType()
                        getSl(slot.id)
                      }} data-bs-toggle="modal"
                        data-bs-target="#exampleModalDetail" type="radio" id={slot.id} value={slot.id}
                      />
                      <label onClick={() => {
                        getAllType()
                        getSl(slot.id)

                      }} htmlFor={slot.id}>
                      </label>
                    </>
                  }
                  <div className="w" >YH.<span>{slot.id}</span></div>
                </div>
              </div>

            )}

          </div>

        </div>
        {/* modal */}
        <div id="slotDetail">
          <div className="modal fade" id="exampleModalDetail" tabIndex={-1} aria-labelledby="exampleModalLabel"
            aria-hidden="true" >
            <Formik initialValues={{ number_plate: '', id_card: '', type_id: 1, total_price: 0 }}
              validationSchema={yup.object({
                number_plate: yup.string().required('Vui lòng nhập biển số xe.'),
                id_card: yup.string().required('Vui lòng nhập CCCD.')
              })}
              onSubmit={async (values, { resetForm }) => {
                console.log(values);
                await setReser(values)
                resetForm()
                document.getElementById("start").value = "";
                document.getElementById("start_time").value = "";
                document.getElementById("end").value = "";
                document.getElementById("end_time").value = "";
              }}
            >
              <div className="modal-dialog modal-fullscreen-md-down " >
                <div className="modal-dialog" role="document" >
                  <div className="modal-content" style={{ borderRadius: '2%' }}>
                    <div className="modal-body" >
                      <div className="column" id="main">
                        <h1>THÔNG TIN ĐỖ XE </h1>
                        <p style={{ fontSize: '10px', fontStyle: 'italic' }}>Thông tin của bạn là cần thiết để chúng tôi tạo ra trải nghiệm tốt nhất cho bạn. Vui lòng cung cấp đầy đủ thông tin.</p>
                        <div className="row">
                          <div className="col-6">
                            <label>Tầng : &nbsp;&nbsp; </label>
                            {floor &&
                              <span>số {floor} </span>
                            }
                          </div>
                          <div className="col-6">
                            <label>Ô  :&nbsp;&nbsp;</label>
                            {slot &&
                              <span>YH.{slot.id}</span>
                            }
                          </div>
                        </div>
                        <br></br>
                        <Form>

                          <div className="row">
                            <div className="form-group col-6">
                              <label htmlFor="number_plate">Biển số xe </label>
                              <Field name="number_plate" type="text" className="form-control" id="number_plate" />
                              <ErrorMessage className="error" component={'div'} name="number_plate" />
                            </div>
                            <br></br>
                            <div className="form-group col-6">
                              <label htmlFor="id_card">CCCD </label>
                              <Field name="id_card" type="text" className="form-control" id="id_card" aria-describedby="emailHelp" />
                              <ErrorMessage className="error" component={'div'} name="id_card" />

                            </div>
                          </div>
                          <br />

                          <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Thời gian đỗ xe (5.000/h)</label>
                            <Field as="select" name="type_id" id="exampleInputPassword1" style={{ width: '150px' }} className="form-control" value={discount} onChange={(e) => { setDiscount(e.target.value) }}>
                              {types && types.map((type, index) =>

                                <option style={{ textAlign: 'center' }} key={index} value={type.id} >{type.type}</option>
                              )
                              }
                            </Field>
                            <br></br>

                            <div>
                              <label htmlFor="start">Bắt đầu</label>
                              <div className="row">
                                <div className="col-6">
                                  <input name="start_time" id="start_time" type="date" min={new Date().toISOString().split('T')[0]} defaultValue={dateS} className="form-control" onChange={() => handleKeyUp()} />
                                  <ErrorMessage className="error" component={'div'} name="start_time" />
                                </div>
                                <div className="col-6">
                                  <input name="start" id="start" type="time" className="form-control" defaultValue={hourS} onChange={() => handleKeyUp()} />
                                  <ErrorMessage className="error" component={'div'} name="start" />
                                </div>
                              </div>
                              <br></br>
                              <label htmlFor="end">Kết thúc</label>
                              <div className="row">
                                <div className="col-6">
                                  <input name="end_time" id="end_time" min={new Date().toISOString().split('T')[0]} type="date" className="form-control" defaultValue={dateE} onChange={() => handleKeyUp()} />
                                  <ErrorMessage className="error" component={'div'} name="end_time" />
                                </div>
                                <div className="col-6">
                                  <input name="end" id="end" type="time" className="form-control" defaultValue={hourE} onChange={() => handleKeyUp()} />
                                  <ErrorMessage className="error" component={'div'} name="end" />
                                </div>
                              </div>
                            </div>

                          </div>
                          <br></br>
                          {fl == false ?
                            <button type="submit" className="get-started-btn scrollto">Đặt chỗ</button>
                            :
                            <button data-bs-toggle="modal"
                              data-bs-target={modal} type="submit" className="get-started-btn scrollto">Đặt chỗ</button>
                          }

                        </Form>
                      </div>

                      <div className="column" id="secondary" style={{ borderRadius: '2%' }}>
                        <div className="sec-content">
                          <img id='logo1' src={logo} alt='YH' />
                          <h1 className="logo me-auto me-lg-6" style={{ paddingLeft: '5px' }}><a href="/">YanHua<span>.</span></a></h1>
                          <p style={{ fontSize: '11px', fontStyle: 'italic', color: '#ffffff' }}>Đồng hành cùng bạn trên mọi hành trình</p>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Formik>
          </div>

        </div>
        {/* popup */}
        {
          <div id="popup">

            <div className="modal fade" data-bs-backdrop="static" data-bs-keyboard="false" id="exampleModalDetail1" tabIndex={-1} aria-labelledby="exampleModalLabel1"
              aria-hidden="true" >
              <div className="modal-dialog modal-fullscreen-md-down " >
                <div className="modal-dialog" role="document" >
                  <div className="modal-content" style={{ borderRadius: '2%' }}>
                    <div className="modal-body" >
                      <div className="column" id="main1">
                        <p style={{ fontSize: '30px', textAlign: 'center' }}>XÁC NHẬN THÔNG TIN </p>
                        <p style={{ fontSize: '13px', fontStyle: 'italic', textAlign: 'center' }}>Vui lòng kiểm tra thông tin chính xác trước khi xác nhận.</p>
                        <form>
                          <div className="form-group">
                            <label htmlFor="exampleInputName">Biển số xe : </label>
                            <span id="exampleInputName" > {reservation.number_plate}</span>
                          </div>
                          <br></br>
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">CCCD: </label>
                            <span id="exampleInputEmail1" > {reservation.id_card}</span>
                          </div>
                          <br />
                          <div className="form-group">
                            <div className="row">
                              <div className="col-6">
                                <label htmlFor="start">Bắt đầu:</label>
                                <span >  {hourS}  &nbsp; {moment(dateS).format('DD/MM/YYYY')}</span>

                              </div>

                              <div className="col-6">
                                <label htmlFor="end">Kết thúc:</label>
                                <span > {hourE} &nbsp; {moment(dateE).format('DD/MM/YYYY')}</span>
                                <span > </span>
                              </div>
                            </div>
                          </div>

                          <br></br>
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Tổng thời gian: </label>
                            <span id="exampleInputEmail1" > {convert(diffH)}</span>
                          </div>
                          <br></br>
                          <br></br>
                          <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Tổng số tiền: </label>
                            <span id="exampleInputEmail1" > {numeral(total).format('0,0')} VND</span>
                          </div>
                          <br></br>
                          <div className="row">
                            <div className="col-6">
                              <button style={{ marginLeft: '70px', width: '40%' }} type="button" data-bs-dismiss="modal" className="get-started-btn scrollto">Hủy</button>
                            </div>
                            <div className="col-6">

                              {customer.purse < total ?
                                <button type="button" className="get-started-btn scrollto" onClick={() => {
                                  Swal.fire({
                                    icon: 'info',
                                    title: '<small>Tài khoản của quý khách không đủ.</small>',
                                    showConfirmButton: false,
                                    timer: 1500

                                  })
                                }}>Xác nhận</button>
                                :
                                <button data-bs-toggle="modal"
                                  data-bs-target="#exampleModalDetail12" data-bs-dismiss="modal" style={{ marginLeft: '70px' }} type="button" className="get-started-btn scrollto"
                                  onClick={async () => {
                                    await done()
                                  }}>Xác nhận</button>
                              }



                            </div>
                          </div>

                        </form>
                      </div>


                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
        {/* QR */}
        {
          <div id="qr">

            <div className="modal fade" data-bs-keyboard="false" id="exampleModalDetail12" tabIndex={-1} aria-labelledby="exampleModalLabel12"
              aria-hidden="true" style={{ marginTop: '7%', marginLeft: '7%' }}>
              <div className="modal-dialog modal-fullscreen-md-down " >
                <div className="modal-dialog" role="document" >
                  <div className="modal-content" style={{ borderRadius: '2%' }}>
                    <div className="modal-body" >
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
                          <a style={{ color: 'white', paddingLeft: '130px' }} onClick={() => {
                            downloadQR()
                            setF(true)
                          }}> Tải mã QR </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        }
      </div>




    </>
  )
}