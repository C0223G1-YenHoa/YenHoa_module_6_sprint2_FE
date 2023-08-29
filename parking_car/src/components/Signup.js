import "../signup/signup.css"

export default function SignUp() {
    return (
        <>
            <div id="signup" style={{ paddingTop: '50px' }}>
                <div className="wrapper">
                    <form action="#">
                        <h2>ĐĂNG KÝ</h2>
                        <div className="row">
                            <div className="input-field col-6">
                                <input type="text" required />
                                <label>Họ và tên</label>
                            </div>
                            <div className="col-1"></div>
                            <div className="input-field col-5">
                                <input type="text" required />
                                <label>Số điện thoại</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col-6">
                                <input type="text" required />
                                <label>CCCD/Giấy phép lái xe</label>
                            </div>
                            <div className="col-1"></div>
                            <div className="input-field col-5">
                                <input type="text" required />
                                <label>Biển số xe</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col-12">
                                <input type="text" required />
                                <label>Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col-6">
                                <input type="password" required />
                                <label>Mật khẩu</label>
                            </div>
                            <div className="col-1"></div>
                            <div className="input-field col-5">
                                <input type="password" required />
                                <label>Nhập lại mật khẩu</label>
                            </div>
                        </div>
                        
                        <button type="submit" className="get-started-btn scrollto">Đăng nhập</button>

                    </form>
                </div>
            </div>
        </>
    )
}