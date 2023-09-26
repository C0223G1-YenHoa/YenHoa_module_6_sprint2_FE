import { Link, useNavigate } from "react-router-dom"
import "../login/style.css"
import { ErrorMessage, Field, Form, Formik } from "formik"
import * as yup from "yup"
import { login } from "../services/account"
import Swal from "sweetalert2";

export default function Login() {
    const navigate = useNavigate()
    const signin = async (account) => {
      
try {
    await login(account).then(() => {
            navigate("/")
            Swal.fire({
                icon: 'success',
                title: 'Đăng nhập thành công.',
                showConfirmButton: false,
                timer: 1500
            })
        })
} catch (error) {
    navigate("/login")
    Swal.fire({
        icon: 'error',
        title: 'Email hoặc mật khẩu không chính xác.',
        showConfirmButton: false,
        timer: 1500
    })
}
       
    }

    return (
        <>
            <Formik initialValues={{ accountName: '', password: '' }}
                validationSchema={yup.object({
                    accountName: yup.string()
                        .required("Vui lòng nhập email.")
                        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email không đúng định dạng."),
                    password: yup.string().required('Vui lòng nhập mật khẩu.'),

                })}
                onSubmit={async(values) => {
                
                   signin(values)
                    console.log(values);
                }}
            >
                <div id="login" style={{ paddingTop: '80px' }}>
                    <div className="wrapper">
                        <Form>
                            <h2>ĐĂNG NHẬP</h2>
                            <div className="input-field">
                                <Field type="text" name="accountName" />
                                <label>Email</label>
                                <ErrorMessage className="error" component={'div'} name="accountName" />

                            </div>
                            <div className="input-field">
                                <Field type="password" name="password" />
                                <label>Mật khẩu</label>
                                <ErrorMessage className="error" component={'div'} name="password" />

                            </div>
                            <div className="forget">
                                <label htmlFor="remember">
                                    <input type="checkbox" id="remember" />
                                    <span style={{ paddingLeft: '5px' }}>Nhớ đăng nhập</span>
                                </label>
                                <a href="#">Quên mật khẩu?</a>
                            </div>
                            <button type="submit">Đăng nhập</button>
                            <div className="register">
                                <p>Bạn chưa có tài khoản? <Link to={'/signup'}>Đăng kí</Link></p>
                            </div>
                        </Form>
                    </div>
                </div>
            </Formik>
        </>
    )
}