import React from 'react';
import './index.scss';
import Header from '../../components/header';
import Footer from '../../components/footer';

const AboutUs = () => {
    return (
        <div className="about-us-container">
            <Header />
            <main className="about-us-main">
                <section className="top-image-section">
                    <img src="https://i.pinimg.com/originals/ff/9c/20/ff9c204f62b65141a988cde3c7b1484f.jpg" alt="Top Image" className="top-image"/>
                </section>
                <section className="intro-section">
                    <p>Tại Tierra, chúng tôi tạo tác những món trang sức đầy cảm hứng, lan tỏa những giá trị chân thành và hạnh phúc đến người trẻ hiện đại.</p>
                </section>
                <section className="product-section">
                    <h2>Các dòng sản phẩm Tierra</h2>
                    <div className="product-cards">
                        <div className="product-card">
                            <img src="https://okl.scene7.com/is/image/OKL/SalesEvent_84433_Lifestyle_3?wid=1000&op_sharpen=1" alt="Cầu hôn" />
                            <p>Cầu hôn</p>
                        </div>
                        <div className="product-card">
                            <img src="https://okl.scene7.com/is/image/OKL/SalesEvent_84433_Lifestyle_3?wid=1000&op_sharpen=1" alt="Trang sức kim cương" />
                            <p>Trang sức kim cương</p>
                        </div>
                        <div className="product-card">
                            <img src="https://okl.scene7.com/is/image/OKL/SalesEvent_84433_Lifestyle_3?wid=1000&op_sharpen=1" alt="Trang sức nam" />
                            <p>Trang sức nam</p>
                        </div>
                        <div className="product-card">
                            <img src="https://okl.scene7.com/is/image/OKL/SalesEvent_84433_Lifestyle_3?wid=1000&op_sharpen=1" alt="Trang sức nam" />
                            <p>Trang sức nam</p>
                        </div>
                        <div className="product-card">
                            <img src="https://okl.scene7.com/is/image/OKL/SalesEvent_84433_Lifestyle_3?wid=1000&op_sharpen=1" alt="Trang sức nam" />
                            <p>Trang sức nam</p>
                        </div>
                    </div>
                </section>
                <section className="details-section">
                    <div className="details-image">
                        <img src="https://okl.scene7.com/is/image/OKL/SalesEvent_84433_Lifestyle_3?wid=1000&op_sharpen=1" alt="Crafting Jewelry" />
                    </div>
                    <div className="details-text">
                        <p>Ra đời từ năm 2016, Tierra Diamond hướng đến mục tiêu đem lại những trải nghiệm trang sức lý tưởng. Thấu hiểu người tiêu dùng hướng đến sự thẩm mỹ cao, viên kiểm định kim cương và niềm mong muốn sáng tạo nên trang sức độc nhất, chúng tôi thiết kế và chế tác "Bespoke" cùng những dịch vụ khách biệt để việc mua sắm trở thành niềm vui thích, trải nghiệm đặc sắc.</p>
                    </div>
                </section>
                <section className="video-section">
                    <div className="video-text">
                        <p>crafting happiness</p>
                        <p>Mỗi thiết kế của chúng tôi ẩn chứa câu chuyện của chính mình; sự chân thành và hạnh phúc trong mỗi tác phẩm.</p>
                    </div>
                    <div className="video-embed">
                        <iframe src="https://www.youtube.com/embed/example" frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default AboutUs;
