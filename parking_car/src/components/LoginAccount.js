import "../login/style.css"

export default function Login() {
    return (
        <>
            <div id="login" style={{paddingTop:'80px'}}>
                <div className="wrapper">
                    <form action="#">
                        <h2>Đăng nhập</h2>
                        <div className="input-field">
                            <input type="text" required />
                            <label>Email</label>
                        </div>
                        <div className="input-field">
                            <input type="password" required />
                            <label>Mật khẩu</label>
                        </div>
                        <div className="forget">
                            <label htmlFor="remember">
                                <input type="checkbox" id="remember" />
                                <p>Nhớ đăng nhập</p>
                            </label>
                            <a href="#">Quên mật khẩu?</a>
                        </div>
                        <button type="submit">Đăng nhập</button>
                        <div className="register">
                            <p>Bạn chưa có tài khoản? <a href="#">Đăng kí</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}