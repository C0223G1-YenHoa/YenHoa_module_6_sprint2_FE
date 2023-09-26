import "../signup/signup.css"
import { Formik, Form, ErrorMessage, Field, validateYupSchema } from 'formik';
import { useState } from "react";
import * as yup from "yup"
import { createCustomer, getCustomer, verify } from "../services/customer";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { ProgressBar } from "react-loader-spinner"

export default function SignUp() {
    const navigate = useNavigate()
    const [flag, setFlag] = useState(false);
    const create = async (cus) => {
        try {
            console.log(cus);
            const port = "localhost:" + window.location.port
            console.log(port);
            const role = {
                idRole: 1,
                nameRole: "ROLE_CUSTOMER"
            }
            const account = {
                username: cus.email,
                password: cus.password,
                role: role
            }
            await createCustomer({ ...cus, account: account }, port).then(() => {
                navigate("/")
                Swal.fire({
                    icon: 'success',
                    title: 'Đăng kí thành công.<br> Vui lòng kiểm tra Email xác nhận tài khoản.',
                    showConfirmButton: false,
                    timer: 3000
                })
            })
        } catch {
            Swal.fire({
                icon: 'warning',
                title: 'Email này đã tồn tại.',
                showConfirmButton: false,
                timer: 3000
            })
            navigate("/")
        }



    }

    return (
        <>
            <Formik initialValues={{ name: '', email: '', phone: '', password: '', idCard: '', licensePlates: '', rpassword: '' }}
                validationSchema={yup.object({
                    name: yup.string().min(3, "Họ và tên tối thiểu 3 ký tự.").max(100, "Họ và tên tối đa 100 ký tự. ").required('Vui lòng nhập họ và tên.'),
                    email: yup.string()
                        .required("Vui lòng nhập email.")
                        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email không đúng định dạng.")
                        .min(12, "Email tối thiểu 12 ký tự và tối đa 50 ký tự")
                        .max(50, "Email tối thiểu 12 ký tự và tối đa 50 ký tự"),
                    phone: yup.string().required("Vui lòng nhập số điện thoại.")
                        .matches(/^(\+84|0)[1-9][0-9]{8}$/, "Số điện thoại không đúng định dạng."),
                    password: yup.string().min(6, "Mật khẩu tối thiểu 6 kí tự").max(10, "Mật khẩu tối đa 10 kí tự").required('Vui lòng nhập mật khẩu.'),
                    rpassword: yup.string().min(6, "Mật khẩu tối thiểu 6 kí tự").max(10, "Mật khẩu tối đa 10 kí tự").required('Vui lòng nhập mật khẩu.').oneOf([yup.ref("password")], "Mật khẩu không trùng khớp."),
                    idCard: yup.string().required("Vui lòng nhập CCCD.")
                })}
                onSubmit={(values) => {
                    create(values)
                    setFlag(true)
                    console.log(values);
                }}
            >
                <div id="signup" style={{ paddingTop: '50px' }}>
                    <div className="wrapper">

                        <h2>ĐĂNG KÝ</h2>
                        <Form>
                            <div className="row">
                                <div className="input-field col-6">
                                    <Field name='name' type="text" />
                                    <label>Họ và tên (*)</label>
                                    <ErrorMessage className="error" component={'div'} name="name" />
                                </div>
                                <div className="col-1"></div>
                                <div className="input-field col-5">
                                    <Field name='phone' type="text" />
                                    <label>Số điện thoại (*)</label>
                                    <ErrorMessage className="error" component={'div'} name="phone" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col-6">
                                    <Field name='idCard' type="text" />
                                    <label>CCCD (*)</label>
                                    <ErrorMessage className="error" component={'div'} name="idCard" />
                                </div>
                                <div className="col-1"></div>
                                <div className="input-field col-5">
                                    <Field name='licensePlates' type="text" />
                                    <label>Biển số xe</label>

                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col-12">
                                    <Field name='email' type="text" />
                                    <label>Email (*)</label>
                                    <ErrorMessage className="error" component={'div'} name="email" />

                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col-6">
                                    <Field name='password' type="password" />
                                    <label>Mật khẩu (*)</label>
                                    <ErrorMessage className="error" component={'div'} name="password" />

                                </div>
                                <div className="col-1"></div>
                                <div className="input-field col-5">
                                    <Field name='rpassword' type="password" />
                                    <label>Nhập lại mật khẩu (*)</label>
                                    <ErrorMessage className="error" component={'div'} name="rpassword" />
                                </div>
                            </div>
                            {flag ?
                                <div>
                                    
                                    <ProgressBar
                                        height="25"
                                        width="30"
                                        ariaLabel="progress-bar-loading"
                                        wrapperStyle={{}}
                                        wrapperClass="progress-bar-wrapper"
                                        borderColor='#ffffff'
                                        barColor='#ffc451'
                                    />
                                </div>
                                :
                                <button type="submit" className="get-started-btn scrollto">Đăng kí</button>
                            }
                        </Form>

                    </div>
                </div>
            </Formik>
        </>
    )
}