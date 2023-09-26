import { Link, useLocation } from 'react-router-dom'

import logo from '../login/YH.png'
import { useEffect, useState } from 'react'
import { logout } from '../services/account';
import { getCustomer } from '../services/customer';
import numeral from 'numeral';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { ToastContainer, toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"


export default function Header(props) {

  var stompClient = null;

  const [customer, setCustomer] = useState("")
  const [accountName, setAccountName] = useState("")
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [money, setMoney] = useState(0)
  const [flag, setFlat] = useState(true)
  const [open, setOpen] = useState(false)
  const location = useLocation();
  const check = () => {
    const a = localStorage.getItem("user");
    if (a != null) {
      const account = JSON.parse(localStorage.getItem('user'));
      console.log(account);
      setAccountName(account.name);
    } else {
      setAccountName("")
    }
  }

  console.log(open);
  const Customer = async () => {
    if (accountName != '') {
      const cus = await getCustomer(accountName)
      setCustomer(cus)
    } else {
      setCustomer("")
    }
  }


  useEffect(() => {
    check()
  }, [location])


  useEffect(() => {
    Customer()
  }, [accountName, props.value])




  useEffect(() => {

    let Sock = new SockJS('http://localhost:8080/ws');
    stompClient = over(Sock);
    Sock.onopen = () => {
      console.log("123");
      stompClient.connect({}, onConnected, onError);
    }

    return () => {
      Sock.onclose = () => {
        if (stompClient != null) {
          stompClient.disconnect();
        }
      };
    }



  }, []);


  const onConnected = async () => {
    console.log("connected");
    const getUserName = JSON.parse(localStorage.getItem('user'));
    let userName;
    if (getUserName) {
      userName = getUserName.name;
      stompClient.subscribe('/user/' + userName + '/private', onMessageReceived);
    }

  }

  const onMessageReceived = (payload) => {
    console.log("message");
    var payloadData = JSON.parse(payload.body);
    toastSuccess(payloadData.message);
    setMessages((prev) => [...prev, payloadData.message]) 
  }
  console.log(messages);
  const onError = (err) => {
    console.log(err);
  }
  const handleRead = () => {
    setMessages([]);
    setOpen(false);
  };

  const toastSuccess = (messageContent) => {
    toast.warning(`${messageContent}`, {
      top: "50px",
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  }

  // useEffect(() => {

  //   if (message != "") {
  //     toastSuccess()

  //   }

  // }, [message])

  return (
    <>
      <ToastContainer></ToastContainer>
      <header id="header" className="fixed-top header-scrolled header-inner-pages" >
        <div className="container d-flex align-items-center justify-content-lg-between">
          <img id='logo' src={logo} alt='YH' />
          <h1 className="logo me-auto me-lg-6" style={{ paddingLeft: '5px' }}><a href="/">YanHua<span>.</span></a></h1>
          {/* Uncomment below if you prefer to use an image logo */}
          {/* <a href="index.html" class="logo me-auto me-lg-0"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>*/}
          <nav id="navbar" className="navbar order-last order-lg-0">
            <ul>
              <li><Link className="nav-link scrollto" to={'/'}>Trang chủ</Link></li>
              <li><a className="nav-link scrollto" href="#services">Dịch vụ</a></li>
              <li><a className="nav-link scrollto" href="#contact">Liên hệ</a></li>
              <li><Link to={"/reservation"} className="nav-link scrollto" >Đặt chỗ</Link></li>

              {customer != '' ?
                <>
                  <li><a className="nav-link scrollto" href="#contact">
                    <div className='row'>
                      <div className='col-3' style={{ fontSize: '15px' }}>
                        <span ><i class="fa-solid fa-sack-dollar"></i></span>
                      </div>
                      <div className='col-9' style={{ padding: '0px 2px' }} >
                        {numeral(customer.purse).format('0,0')} VND
                        {console.log(customer.purse)}
                      </div>
                    </div>
                  </a> </li>
                  <div className='row'>
                    <div className='col-6'>
                      <li className="dropdown"><a href="#"><span style={{ textTransform: "uppercase" }}>{customer.name}</span> <i className="bi bi-chevron-down" /></a>
                        <ul>
                          <li><a href="/recharge">Nạp tiền</a></li>
                          <li><Link to={`history/${customer.account.id}`} href="#">Lịch sử đỗ xe</Link></li>
                          <li><Link to={"/"} onClick={() => { logout() }} href="#">Đăng xuất </Link></li>

                        </ul>
                      </li>
                    </div>
                    <div className='col-6'>
                      <div className='drop-down'>
                        <span onClick={() => { setOpen(!open) }} className='dropdown-toggle' data-toggle="dropdown" style={{ color: 'white', paddingLeft: '10px', top: '10px' }}><i class="fa-solid fa-bell"></i></span>
                        <span className="counter">{messages.length}</span>
                        {open &&
                          <div style={{ top: '20px',right:"50px"}} id='notify'>
                            <ul className="dropdown-menu" style={{ display: 'grid', overflow: 'scroll',width: '200px', maxHeight: "200px"  }}>
                              {messages && messages.map((message) =>
                                <li style={{ fontSize: '13px', display: 'block', borderBottom: "1px solid #ffc451", paddingLeft: "5px" }}>{message}</li>
                              )}

                              <li style={{ fontSize: '13px', textAlign: 'center', paddingTop: '10px',fontWeight:'bold' }} onClick={() => { handleRead() }} >
                                Đánh dấu đã đọc
                              </li>
                            </ul> 
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                </>
                :
                <li></li>
              }

            </ul>
            <i className="bi bi-list mobile-nav-toggle" />
          </nav>{/* .navbar */}

          {customer == '' &&
            <div className="row" style={{ paddingLeft: '40px' }}>
              <div className="col-6"> <Link to={'/login'} className="get-started-btn scrollto">Đăng nhập</Link></div>
              <div className="col-6"> <Link to={'/signup'} className="get-started-btn scrollto">Đăng ký</Link></div></div>
          }

        </div>
      </header>

    </>
  )

}