

export default function Footer() {


    return (
        <>
            <div>
                <footer id="footer">
                    <div className="footer-top">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-5 col-md-6">
                                    <div className="footer-info">
                                        <h3>YanHua<span>.</span></h3>
                                        <p>
                                            Số 280 đường Trần Hưng Đạo, phường An Hải Tây, quận Sơn Trà, <br />
                                            TP. Đà Nẵng<br /><br />
                                            <strong>Phone:</strong> +84 397 212 234<br />
                                            <strong>Email:</strong> yanhua_parking@gmail.com<br />
                                        </p>
                                        <div className="social-links mt-3">
                                            <a href="#" className="twitter"><i className="bx bxl-twitter" /></a>
                                            <a href="#" className="facebook"><i className="bx bxl-facebook" /></a>
                                            <a href="#" className="instagram"><i className="bx bxl-instagram" /></a>
                                            <a href="#" className="google-plus"><i className="bx bxl-skype" /></a>
                                            <a href="#" className="linkedin"><i className="bx bxl-linkedin" /></a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-md-6 footer-links">
                                    <h4> Links</h4>
                                    <ul>
                                        <li><i className="bx bx-chevron-right" /> <a href="#">Trang chủ</a></li>
                                        <li><i className="bx bx-chevron-right" /> <a href="#">Liên hệ</a></li>
                                        <li><i className="bx bx-chevron-right" /> <a href="#">Dịch vụ</a></li>
                                        <li><i className="bx bx-chevron-right" /> <a href="#">Quyền lợi khách hàng</a></li>
                                        <li><i className="bx bx-chevron-right" /> <a href="#">Chính sách bảo hành</a></li>
                                    </ul>
                                </div>
                                <div className="col-lg-4 col-md-6 footer-newsletter">
                                    <h4>Đóng góp ý kiến</h4>
                                    <form action method="post">
                                        <input type="email" name="email" /><input type="submit" value={'Gửi'}  />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>{/* End Footer */}
                {/* <div id="preloader" /> */}
                <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short" /></a>
            </div>

        </>
    )
}