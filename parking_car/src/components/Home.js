


export default function Home() {
    return (
        <>
            <div>
                <section id="hero" className="d-flex align-items-center justify-content-center">
                    <div className="container" data-aos="fade-up">
                        <div className="row justify-content-center" data-aos="fade-up" data-aos-delay={150}>
                            <div className="col-xl-6 col-lg-8">
                                <h1>YanHua<span>.</span></h1>
                                <h2>Đồng hành cùng bạn trên mọi hành trình</h2>
                            </div>
                        </div>
                        <div className="row gy-4 mt-5 justify-content-center" data-aos="zoom-in" data-aos-delay={250}>
                            <div className="col-xl-2 col-md-4">
                                <div className="icon-box">
                                    <img src="assets/img/money.png" height={60} width={60} alt="" />
                                    <h3><a href>Tiết kiệm <br /> chi phí</a></h3>
                                </div>
                            </div>
                            <div className="col-xl-2 col-md-4">
                                <div className="icon-box">
                                    <img src="assets/img/clock.png" height={60} width={60} alt="" />
                                    <h3><a href>Tiết kiệm <br /> thời gian</a></h3>
                                </div>
                            </div>
                            <div className="col-xl-2 col-md-4">
                                <div className="icon-box">
                                    <img src="assets/img/man.png" height={60} width={60} alt="" />
                                    <h3><a href>Giảm stress</a></h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>{/* End Hero */}
                <main id="main">
                    {/* ======= About Section ======= */}
                    <section id="about" className="about">
                        <div className="container" data-aos="fade-up">
                            <div className="row">
                                <div className="col-lg-6 order-1 order-lg-2" data-aos="fade-left" data-aos-delay={100}>
                                    <img src="assets/img/parkingcar.png" className="img-fluid" alt="" />
                                </div>
                                <div className="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content" data-aos="fade-right" data-aos-delay={100}>
                                    <h3>Tại sao bạn nên chọn chúng tôi ? </h3>
                                    <p className="fst-italic">
                                        Tiện lợi và an toàn - Đặt chỗ xe ngay hôm nay!
                                    </p>
                                    <ul>
                                        <li><i className="ri-check-double-line" />Điều chỉnh lịch trình của bạn với việc đặt chỗ bãi đậu xe trực tuyến linh hoạt và tiện lợi.</li>
                                        <li><i className="ri-check-double-line" /> Tận hưởng trải nghiệm đậu xe dễ dàng và an toàn với dịch vụ của chúng tôi.</li>
                                        <li><i className="ri-check-double-line" /> Giải pháp tiện ích cho việc tìm kiếm và đặt chỗ bãi đậu xe dễ dàng và nhanh chóng.</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>{/* End About Section */}
                    {/* ======= Features Section ======= */}
                    <section id="features" className="features">
                        <div className="container" data-aos="fade-up">
                            <div className="row">
                                <div className="image col-lg-6" style={{ backgroundImage: 'url("assets/img/xehay-baidoxe-300822-520220901172054.8661730.jpg")' }} data-aos="fade-right" />
                                <div className="col-lg-6" data-aos="fade-left" data-aos-delay={100}>
                                    <div className="icon-box mt-5 mt-lg-0" data-aos="zoom-in" data-aos-delay={150}>
                                        <i className="fa-regular fa-clock" />
                                        <h4>Tiện lợi và tiết kiệm thời gian</h4>
                                        <p> Bạn có thể dễ dàng tìm và đặt chỗ trống trước khi đến nơi, giúp tiết kiệm thời gian và giảm stress.</p>
                                    </div>
                                    <div className="icon-box mt-5" data-aos="zoom-in" data-aos-delay={150}>
                                        <i className="fa-solid fa-square-parking" />
                                        <h4>Đảm bảo chỗ đỗ xe</h4>
                                        <p>Với hệ thống đặt chỗ trực tuyến, có thể đảm bảo rằng sẽ có chỗ đỗ xe sẵn sàng cho bạn khi đến nơi.</p>
                                    </div>
                                    <div className="icon-box mt-5" data-aos="zoom-in" data-aos-delay={150}>
                                        <i className="fa-solid fa-list-check" />
                                        <h4>Quản lý tốt hơn</h4>
                                        <p>Có thể theo dõi số lượng chỗ đỗ trống và thông tin về xe đỗ trong thời gian thực, từ đó tối ưu hóa việc sử dụng không gian và tài nguyên</p>
                                    </div>
                                    <div className="icon-box mt-5" data-aos="zoom-in" data-aos-delay={150}>
                                        <i className="fa-solid fa-comment-dollar" />
                                        <h4>Thanh toán dễ dàng</h4>
                                        <p>Bãi đỗ xe online cung cấp tính năng thanh toán trực tuyến, giúp người dùng dễ dàng và nhanh chóng thanh toán phí đỗ xe. Điều này loại bỏ việc cần mang theo tiền mặt và tạo ra một trải nghiệm thuận tiện hơn cho người dùng.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>{/* End Features Section */}
                    {/* ======= Services Section ======= */}
                    <section id="services" className="services">
                        <div className="container" data-aos="fade-up">
                            <div className="section-title">
                                <h2>Dịch vụ</h2>
                                <p>Dịch vụ của chúng tôi</p>
                            </div>
                            <div className="row">
                                <div className="col-lg-4 col-md-6 d-flex align-items-stretch" data-aos="zoom-in" data-aos-delay={100}>
                                    <div className="icon-box">
                                        <div className="icon"><i className="fa-solid fa-calendar-check" /></div>
                                        <h4><a href>Đặt chỗ trước</a></h4>
                                        <p>Bạn có thể đặt chỗ trước để đảm bảo sự dễ dàng và tiện lợi khi tới bãi đỗ xe.</p>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="zoom-in" data-aos-delay={200}>
                                    <div className="icon-box">
                                        <div className="icon"><i className="fa-brands fa-cc-amazon-pay" /></div>
                                        <h4><a href>Thanh toán trực tuyến</a></h4>
                                        <p>Bạn có thể thanh toán phí đỗ xe trước hoặc khi đến bãi đỗ xe.</p>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0" data-aos="zoom-in" data-aos-delay={300}>
                                    <div className="icon-box">
                                        <div className="icon"><i className="fa-solid fa-circle-question" /></div>
                                        <h4><a href>Thông tin về bãi đỗ xe</a></h4>
                                        <p>Cung cấp thông tin chi tiết về bãi đỗ xe, bao gồm địa chỉ, bản đồ, số chỗ đỗ, giá cả, thời gian hoạt động và các tiện ích đi kèm.</p>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in" data-aos-delay={100}>
                                    <div className="icon-box">
                                        <div className="icon"><i className="fa-solid fa-tags" /></div>
                                        <h4><a href>Chương trình khuyến mãi</a></h4>
                                        <p>Cung cấp các chương trình khuyến mãi, giảm giá hoặc ưu đãi đặc biệt.</p>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in" data-aos-delay={200}>
                                    <div className="icon-box">
                                        <div className="icon"><i className="fa-solid fa-bell" /></div>
                                        <h4><a href>Thông báo và nhắc nhở</a></h4>
                                        <p>Gửi thông báo và nhắc nhở cho người dùng về việc đặt chỗ, thay đổi lịch trình hoặc thông tin liên quan đến bãi đỗ xe.</p>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4" data-aos="zoom-in" data-aos-delay={300}>
                                    <div className="icon-box">
                                        <div className="icon"><i className="fa-solid fa-circle-user" /></div>
                                        <h4><a href>Quản lý tài khoản</a></h4>
                                        <p>Bạn có thể quản lý tài khoản cá nhân, xem lại lịch sử đặt chỗ, lưu trữ thông tin thanh toán và quản lý thông tin cá nhân.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>{/* End Services Section */}
                    {/* ======= Cta Section ======= */}
                    <section id="cta" className="cta">
                        <div className="container" data-aos="zoom-in">
                            <div className="text-center">
                                <h3>Tiện lợi và an toàn - Đặt chỗ xe ngay hôm nay!</h3>
                                <p> Tìm kiếm, đặt chỗ và quản lý bãi đậu xe chỉ với vài cú nhấp chuột.</p>
                                <a className="cta-btn" href="#">Đặt chỗ</a>
                            </div>
                        </div>
                    </section>{/* End Cta Section */}
                    {/* ======= Contact Section ======= */}
                    <section id="contact" className="contact">
                        <div className="container" data-aos="fade-up">
                            <div className="section-title">
                                <h2>Liên hệ</h2>
                                <p>Liên hệ chúng tôi</p>
                            </div>
                            <div>
                                <iframe style={{ border: 0, width: '100%', height: '270px' }} src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621" frameBorder={0} allowFullScreen />
                            </div>
                            <div className="row mt-5">
                                <div className="col-lg-4">
                                    <div className="info">
                                        <div className="address">
                                            <i className="bi bi-geo-alt" />
                                            <h4>Địa chỉ:</h4>
                                            <p>Số 280 đường Trần Hưng Đạo, phường An Hải Tây, quận Sơn Trà, TP. Đà Nẵng </p>
                                        </div>
                                        <div className="email">
                                            <i className="bi bi-envelope" />
                                            <h4>Email:</h4>
                                            <p>yanhua_parking@gmail.com</p>
                                        </div>
                                        <div className="phone">
                                            <i className="bi bi-phone" />
                                            <h4>Call:</h4>
                                            <p>+84 397 212 234</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-8 mt-5 mt-lg-0">
                                    <form action="forms/contact.php" method="post" role="form" className="php-email-form">
                                        <div className="row">
                                            <div className="col-md-6 form-group">
                                                <input type="text" name="name" className="form-control" id="name" placeholder="Họ và tên" required />
                                            </div>
                                            <div className="col-md-6 form-group mt-3 mt-md-0">
                                                <input type="email" className="form-control" name="email" id="email" placeholder="Email" required />
                                            </div>
                                        </div>
                                        <div className="form-group mt-3">
                                            <input type="text" className="form-control" name="subject" id="subject" placeholder="Subject" required />
                                        </div>
                                        <div className="form-group mt-3">
                                            <textarea className="form-control" name="message" rows={5} placeholder="Message" required defaultValue={""} />
                                        </div>
                                        <div className="my-3">
                                            <div className="loading">Loading</div>
                                            <div className="error-message" />
                                            <div className="sent-message">Your message has been sent. Thank you!</div>
                                        </div>
                                        <div className="text-center"><button type="submit">Gửi</button></div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>{/* End Contact Section */}
                </main>{/* End #main */}
            </div>


        </>
    )
}