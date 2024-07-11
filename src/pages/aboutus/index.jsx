// import React, { useState } from 'react';
// import './index.scss';
// import Header from '../../components/header';
// import Footer from '../../components/footer';

// const AboutUs = () => {
//     const [showImage, setShowImage] = useState(false);
//     const [activeToggle, setActiveToggle] = useState(null);

//     const toggleImage = () => {
//         setShowImage(!showImage);
//     };

//     const handleToggle = (toggleId) => {
//         setActiveToggle(activeToggle === toggleId ? null : toggleId);
//     };

//     const getImageSrc = () => {
//         switch (activeToggle) {
//             case 'toggle1':
//                 return 'https://noraydesigns.com/cdn/shop/articles/types_of_gold_jewelry.jpg?v=1610129125';
//             case 'toggle2':
//                 return 'https://assets.teenvogue.com/photos/62aca6a144833da9c28dc484/16:9/w_2560%2Cc_limit/Comm_jewelry_june2022_header.jpg';
//             case 'toggle3':
//                 return 'https://nypost.com/wp-content/uploads/sites/2/2023/01/mejuri-jewelry.jpg';
//             case 'toggle4':
//                 return 'https://t4.ftcdn.net/jpg/04/47/91/41/360_F_447914195_XdcRh5miaqdCGBsHKM87zSCDDBfOwWkO.jpg';
//             case 'toggle5':
//                 return 'https://media.cnn.com/api/v1/images/stellar/prod/skin-studio-lifestyle-cnnu.jpg?q=h_1018,w_1810,x_0,y_0';
//             default:
//                 return 'https://donjjewellery.com/wp-content/uploads/2022/02/1-CUSTOM-FINE-JEWELRY-.jpg';
//         }
//     };

//     return (
//         <div className="about-us-container">
           
//             <main className="about-us-main">
//                 <section className="top-image-section">
//                     <img src="https://i.pinimg.com/originals/ff/9c/20/ff9c204f62b65141a988cde3c7b1484f.jpg" alt="Top Image" className="top-image"/>
//                 </section>
//                 <section className="intro-section">
//     <p>Tại Tierra, chúng tôi tạo tác những món trang sức đầy cảm hứng, lan <br></br>
//          tỏa những giá trị chân thành và hạnh phúc đến người trẻ hiện đại.</p>
//     <div className="divider">
//         <hr />
//         <img src="https://cdn.vectorstock.com/i/500p/09/05/green-aurora-borealis-logo-modern-northern-lights-vector-43980905.jpg" alt="icon" />
//         <hr />
//     </div>
// </section>
// <section className="product-section">
//     <h2>Các dòng sản phẩm Aurora</h2>
//     <div className="product-cards">
//         <div className="product-card">
//             <img src="https://manubhai.in/SocialMedia/post_artworks/BJD-16-2Nov2023.jpg" alt="Necklaces" />
//             <p>Necklaces</p>
//         </div>
//         <div className="product-card">
//             <img src="https://www.diamondstuds.com/news/wp-content/uploads/2023/02/image.png" alt="Earrings" />
//             <p>Earrings</p>
//         </div>
//         <div className="product-card">
//             <img src="https://faithandlovedesigns.com.au/cdn/shop/files/Untitleddesign_77_1000x1000.png?v=1689128202" alt="Trang sức nam" />
//             <p>Bracelets</p>
//         </div>
//         <div className="product-card">
//             <img src="https://images-aka.zales.com/category/rings/z20231023/Mobile/Collage-NowTrending/Z-WEB-LP-Rings-Collage-NowTrending-MOB-StackableRings-390x224.png" alt="Trang sức nam" />
//             <p>Rings</p>
//         </div>
//         <div className="product-card">
//             <img src="https://i.ebayimg.com/images/g/oHQAAOSwHohkNkOX/s-l1200.webp" alt="Brooch" />
//             <p>Brooch</p>
//         </div>
//     </div>
// </section>

//                 <section className="quote-section">
//                     <p>“OUR CRAFTSMANSHIP <span>SHINES</span> AND SO WILL YOU.”</p>
//                 </section>
//                 <section className="details-section">
//                     <div className="details-image">
//                         <img src="https://okl.scene7.com/is/image/OKL/SalesEvent_84433_Lifestyle_3?wid=1000&op_sharpen=1" alt="Crafting Jewelry" />
//                     </div>
//                     <div className="details-text">
//                         <p>Ra đời từ năm 2016, Tierra Diamond hướng đến mục tiêu đem lại những trải nghiệm trang sức lý tưởng. Thấu hiểu người tiêu dùng hướng đến sự thẩm mỹ cao, viên kiểm định kim cương và niềm mong muốn sáng tạo nên trang sức độc nhất, chúng tôi thiết kế và chế tác "Bespoke" cùng những dịch vụ khách biệt để việc mua sắm trở thành niềm vui thích, trải nghiệm đặc sắc.</p>
//                     </div>
//                 </section>
//                 <section className="video-section">
//                     <div className="video-text">
//                         <p>crafting happiness</p>
//                         <p>Mỗi thiết kế của chúng tôi ẩn chứa câu chuyện của chính mình; sự chân thành và hạnh phúc trong mỗi tác phẩm.</p>
//                     </div>
//                     <div className="video-embed">
//                    <iframe width="560" height="315" src="https://www.youtube.com/embed/2DcAMbmmYNM?si=ohjSZHLK7CPYHLNA&start=4&autoplay=1&mute=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
//                     </div>
//                 </section>
//                 <section className="background-section">
//                     <div className="background-content">
//                         <h2>Hành trình của Aurora</h2>
//                         <p>Chúng tôi cam kết đem lại những giá trị tốt đẹp nhất cho khách hàng.</p>
//                     </div>
//                 </section>
//                 <section className="toggle-section">
//                     {!showImage && (
//                         <div className="toggle-button-container">
//                             <button onClick={toggleImage} className="toggle-button">
//                                 Khám phá
//                                 <span className="toggle-icon">▼</span>
//                             </button>
//                         </div>
//                     )}
//                     {showImage && (
//                         <div className="toggle-content">
//                             <div className="toggle-image">
//                                 <img src="https://www.tierra.vn/views/img/about/journey-vn.webp" alt="Toggle Image" />
//                             </div>
//                             <div className="toggle-button-container">
//                                 <button onClick={toggleImage} className="toggle-button">
//                                     Thu gọn
//                                     <span className="toggle-icon">▲</span>
//                                 </button>
//                             </div>
//                         </div>
//                     )}
//                 </section>
//                 <section className="new-section">
//                     <img src="https://www.tierra.vn/views/img/about/banner-sketch.webp" alt="Full Width Image" className="new-section-image"/>
//                     <div className="new-section-text">
//                         <h3>Đẹp hoàn hảo từ mọi góc nhìn</h3>
//                         <p>Dù ở góc thẳng đứng, góc chính diện hay góc ngang và hướng nhìn từ người đối diện, chiếc nhẫn Tierra vẫn luôn toả sáng lấp lánh. Đó chính là nhờ quá trình gia công tỉ mỉ và sự thấu hiểu nét đặc trưng của mỗi viên kim cương, từ đó tạo ra sự hài hoà trong từng chi tiết thiết kế.</p>
//                     </div>
//                 </section>
//                 {/* Section mới */}
//                 <section className="value-section">
//                     <div className="value-image">
//                         <img src={getImageSrc()} alt="Value Image" />
//                     </div>
//                     <div className="value-toggles">
//                         <div className="value-toggle" onClick={() => handleToggle('toggle1')}>
//                             <h4>Thanh lịch và tinh tế <span className={`toggle-icon ${activeToggle === 'toggle1' ? 'open' : ''}`}>▼</span></h4>
//                             {activeToggle === 'toggle1' && (
//                                 <div className="value-content">
//                                     <p>Nội dung chi tiết về Thanh lịch và tinh tế.</p>
//                                 </div>
//                             )}
//                         </div>
//                         <div className="value-toggle" onClick={() => handleToggle('toggle2')}>
//                             <h4>Tạo tác từ trái tim <span className={`toggle-icon ${activeToggle === 'toggle2' ? 'open' : ''}`}>▼</span></h4>
//                             {activeToggle === 'toggle2' && (
//                                 <div className="value-content">
//                                     <p>Không chỉ tạo ra từ những thiết kế đẹp mắt, Tierra còn tỉ mẩn chạm khắc từng đường nét nhỏ nhất để chiếc nhẫn đạt chuẩn "đo ni đóng giày" và đem lại sự thoải mái nhất cho người đeo.</p>
//                                 </div>
//                             )}
//                         </div>
//                         <div className="value-toggle" onClick={() => handleToggle('toggle3')}>
//                             <h4>Tinh tuyển tốt nhất <span className={`toggle-icon ${activeToggle === 'toggle3' ? 'open' : ''}`}>▼</span></h4>
//                             {activeToggle === 'toggle3' && (
//                                 <div className="value-content">
//                                     <p>Nội dung chi tiết về Tinh tuyển tốt nhất.</p>
//                                 </div>
//                             )}
//                         </div>
//                         <div className="value-toggle" onClick={() => handleToggle('toggle4')}>
//                             <h4>An tâm, tin tưởng <span className={`toggle-icon ${activeToggle === 'toggle4' ? 'open' : ''}`}>▼</span></h4>
//                             {activeToggle === 'toggle4' && (
//                                 <div className="value-content">
//                                     <p>Nội dung chi tiết về An tâm, tin tưởng.</p>
//                                 </div>
//                             )}
//                         </div>
//                         <div className="value-toggle" onClick={() => handleToggle('toggle5')}>
//                             <h4>Đồng hành trọn vẹn <span className={`toggle-icon ${activeToggle === 'toggle5' ? 'open' : ''}`}>▼</span></h4>
//                             {activeToggle === 'toggle5' && (
//                                 <div className="value-content">
//                                     <p>Nội dung chi tiết về Đồng hành trọn vẹn.</p>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </section>
//                 <section className="another-new-section">
//     <img src="https://www.tierra.vn/views/img/about/banner-4Cs.webp" alt="Full Width Image" className="new-section-image"/>
//     <div className="new-section-text">
//         <h3>Kim cương 4Cs</h3>
//         <p>Để có một viên kim cương hoàn hảo, việc đánh giá không chỉ dựa trên thông số 4Cs, giấy chứng thực bởi GIA mà còn được kiểm định nâng cao cho các yếu tố, đặc điểm khác. Chúng tôi gọi đó là Tiêu chuẩn TIERRA CHOICE, hướng đến chất lượng hoàn hảo và giá trị vượt trội.</p>
//     </div>
// </section>
// <section className="store-experience-section">
//     <div className="store-experience-image">
//         <img src="https://media.timeout.com/images/102035297/image.jpg" alt="Store Experience" />
//     </div>
//     <div className="store-experience-text">
//         <h3>Trải nghiệm cửa hàng</h3>
//         <p>Trải nghiệm ngay không gian thoải mái, riêng tư và khác biệt tại cửa hàng của chúng tôi. Đội ngũ tư vấn viên tận tình chuyên nghiệp sẽ đồng hành và mang lại cho Quý khách hàng trải nghiệm mua sắm thư thái và an tâm tuyệt đối.</p>
//         <p><strong>Giờ làm việc</strong><br />
//         8:30 - 20:30 (bao gồm Chủ Nhật)</p>
//         <p><strong>Hotline</strong><br />
//         1900 232 354 - 0938 256 545</p>
//         <p><a href="#store-system">Hệ thống cửa hàng ›</a></p>
//         <button className="appointment-button">Đặt lịch hẹn</button>
//     </div>
// </section>

//             </main>
//             <Footer />
//         </div>
//     );
// }

// export default AboutUs;
import React, { useState, useEffect } from 'react';
import './index.scss';
import Header from '../../components/header';
import Footer from '../../components/footer';

const AboutUs = () => {
    const [showImage, setShowImage] = useState(false);
    const [activeToggle, setActiveToggle] = useState(null);

    // Scroll to the top of the page when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const toggleImage = () => {
        setShowImage(!showImage);
    };

    const handleToggle = (toggleId) => {
        setActiveToggle(activeToggle === toggleId ? null : toggleId);
    };

    const getImageSrc = () => {
        switch (activeToggle) {
            case 'toggle1':
                return 'https://noraydesigns.com/cdn/shop/articles/types_of_gold_jewelry.jpg?v=1610129125';
            case 'toggle2':
                return 'https://assets.teenvogue.com/photos/62aca6a144833da9c28dc484/16:9/w_2560%2Cc_limit/Comm_jewelry_june2022_header.jpg';
            case 'toggle3':
                return 'https://nypost.com/wp-content/uploads/sites/2/2023/01/mejuri-jewelry.jpg';
            case 'toggle4':
                return 'https://t4.ftcdn.net/jpg/04/47/91/41/360_F_447914195_XdcRh5miaqdCGBsHKM87zSCDDBfOwWkO.jpg';
            case 'toggle5':
                return 'https://media.cnn.com/api/v1/images/stellar/prod/skin-studio-lifestyle-cnnu.jpg?q=h_1018,w_1810,x_0,y_0';
            default:
                return 'https://donjjewellery.com/wp-content/uploads/2022/02/1-CUSTOM-FINE-JEWELRY-.jpg';
        }
    };

    return (
        <div className="about-us-container">
            <main className="about-us-main">
                <section className="top-image-section">
                    <img src="https://i.pinimg.com/originals/ff/9c/20/ff9c204f62b65141a988cde3c7b1484f.jpg" alt="Top Image" className="top-image"/>
                </section>
                <section className="intro-section">
                    <p>Tại Tierra, chúng tôi tạo tác những món trang sức đầy cảm hứng, lan <br></br>
                    tỏa những giá trị chân thành và hạnh phúc đến người trẻ hiện đại.</p>
                    <div className="divider">
                        <hr />
                        <img src="https://cdn.vectorstock.com/i/500p/09/05/green-aurora-borealis-logo-modern-northern-lights-vector-43980905.jpg" alt="icon" />
                        <hr />
                    </div>
                </section>
                <section className="product-section">
                    <h2>Các dòng sản phẩm Aurora</h2>
                    <div className="product-cards">
                        <div className="product-card">
                            <img src="https://manubhai.in/SocialMedia/post_artworks/BJD-16-2Nov2023.jpg" alt="Necklaces" />
                            <p>Necklaces</p>
                        </div>
                        <div className="product-card">
                            <img src="https://www.diamondstuds.com/news/wp-content/uploads/2023/02/image.png" alt="Earrings" />
                            <p>Earrings</p>
                        </div>
                        <div className="product-card">
                            <img src="https://faithandlovedesigns.com.au/cdn/shop/files/Untitleddesign_77_1000x1000.png?v=1689128202" alt="Trang sức nam" />
                            <p>Bracelets</p>
                        </div>
                        <div className="product-card">
                            <img src="https://images-aka.zales.com/category/rings/z20231023/Mobile/Collage-NowTrending/Z-WEB-LP-Rings-Collage-NowTrending-MOB-StackableRings-390x224.png" alt="Trang sức nam" />
                            <p>Rings</p>
                        </div>
                        <div className="product-card">
                            <img src="https://i.ebayimg.com/images/g/oHQAAOSwHohkNkOX/s-l1200.webp" alt="Brooch" />
                            <p>Brooch</p>
                        </div>
                    </div>
                </section>
                <section className="quote-section">
                    <p>“OUR CRAFTSMANSHIP <span>SHINES</span> AND SO WILL YOU.”</p>
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
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/2DcAMbmmYNM?si=ohjSZHLK7CPYHLNA&start=4&autoplay=1&mute=1" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                    </div>
                </section>
                <section className="background-section">
                    <div className="background-content">
                        <h2>Hành trình của Aurora</h2>
                        <p>Chúng tôi cam kết đem lại những giá trị tốt đẹp nhất cho khách hàng.</p>
                    </div>
                </section>
                <section className="toggle-section">
                    {!showImage && (
                        <div className="toggle-button-container">
                            <button onClick={toggleImage} className="toggle-button">
                                Khám phá
                                <span className="toggle-icon">▼</span>
                            </button>
                        </div>
                    )}
                    {showImage && (
                        <div className="toggle-content">
                            <div className="toggle-image">
                                <img src="https://www.tierra.vn/views/img/about/journey-vn.webp" alt="Toggle Image" />
                            </div>
                            <div className="toggle-button-container">
                                <button onClick={toggleImage} className="toggle-button">
                                    Thu gọn
                                    <span className="toggle-icon">▲</span>
                                </button>
                            </div>
                        </div>
                    )}
                </section>
                <section className="new-section">
                    <img src="https://www.tierra.vn/views/img/about/banner-sketch.webp" alt="Full Width Image" className="new-section-image"/>
                    <div className="new-section-text">
                        <h3>Đẹp hoàn hảo từ mọi góc nhìn</h3>
                        <p>Dù ở góc thẳng đứng, góc chính diện hay góc ngang và hướng nhìn từ người đối diện, chiếc nhẫn Tierra vẫn luôn toả sáng lấp lánh. Đó chính là nhờ quá trình gia công tỉ mỉ và sự thấu hiểu nét đặc trưng của mỗi viên kim cương, từ đó tạo ra sự hài hoà trong từng chi tiết thiết kế.</p>
                    </div>
                </section>
                <section className="value-section">
                    <div className="value-image">
                        <img src={getImageSrc()} alt="Value Image" />
                    </div>
                    <div className="value-toggles">
                        <div className="value-toggle" onClick={() => handleToggle('toggle1')}>
                            <h4>Thanh lịch và tinh tế <span className={`toggle-icon ${activeToggle === 'toggle1' ? 'open' : ''}`}>▼</span></h4>
                            {activeToggle === 'toggle1' && (
                                <div className="value-content">
                                    <p>Nội dung chi tiết về Thanh lịch và tinh tế.</p>
                                </div>
                            )}
                        </div>
                        <div className="value-toggle" onClick={() => handleToggle('toggle2')}>
                            <h4>Tạo tác từ trái tim <span className={`toggle-icon ${activeToggle === 'toggle2' ? 'open' : ''}`}>▼</span></h4>
                            {activeToggle === 'toggle2' && (
                                <div className="value-content">
                                    <p>Không chỉ tạo ra từ những thiết kế đẹp mắt, Tierra còn tỉ mẩn chạm khắc từng đường nét nhỏ nhất để chiếc nhẫn đạt chuẩn "đo ni đóng giày" và đem lại sự thoải mái nhất cho người đeo.</p>
                                </div>
                            )}
                        </div>
                        <div className="value-toggle" onClick={() => handleToggle('toggle3')}>
                            <h4>Tinh tuyển tốt nhất <span className={`toggle-icon ${activeToggle === 'toggle3' ? 'open' : ''}`}>▼</span></h4>
                            {activeToggle === 'toggle3' && (
                                <div className="value-content">
                                    <p>Nội dung chi tiết về Tinh tuyển tốt nhất.</p>
                                </div>
                            )}
                        </div>
                        <div className="value-toggle" onClick={() => handleToggle('toggle4')}>
                            <h4>An tâm, tin tưởng <span className={`toggle-icon ${activeToggle === 'toggle4' ? 'open' : ''}`}>▼</span></h4>
                            {activeToggle === 'toggle4' && (
                                <div className="value-content">
                                    <p>Nội dung chi tiết về An tâm, tin tưởng.</p>
                                </div>
                            )}
                        </div>
                        <div className="value-toggle" onClick={() => handleToggle('toggle5')}>
                            <h4>Đồng hành trọn vẹn <span className={`toggle-icon ${activeToggle === 'toggle5' ? 'open' : ''}`}>▼</span></h4>
                            {activeToggle === 'toggle5' && (
                                <div className="value-content">
                                    <p>Nội dung chi tiết về Đồng hành trọn vẹn.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
                <section className="another-new-section">
                    <img src="https://www.tierra.vn/views/img/about/banner-4Cs.webp" alt="Full Width Image" className="new-section-image"/>
                    <div className="new-section-text">
                        <h3>Kim cương 4Cs</h3>
                        <p>Để có một viên kim cương hoàn hảo, việc đánh giá không chỉ dựa trên thông số 4Cs, giấy chứng thực bởi GIA mà còn được kiểm định nâng cao cho các yếu tố, đặc điểm khác. Chúng tôi gọi đó là Tiêu chuẩn TIERRA CHOICE, hướng đến chất lượng hoàn hảo và giá trị vượt trội.</p>
                    </div>
                </section>
                <section className="store-experience-section">
                    <div className="store-experience-image">
                        <img src="https://media.timeout.com/images/102035297/image.jpg" alt="Store Experience" />
                    </div>
                    <div className="store-experience-text">
                        <h3>Trải nghiệm cửa hàng</h3>
                        <p>Trải nghiệm ngay không gian thoải mái, riêng tư và khác biệt tại cửa hàng của chúng tôi. Đội ngũ tư vấn viên tận tình chuyên nghiệp sẽ đồng hành và mang lại cho Quý khách hàng trải nghiệm mua sắm thư thái và an tâm tuyệt đối.</p>
                        <p><strong>Giờ làm việc</strong><br />
                        8:30 - 20:30 (bao gồm Chủ Nhật)</p>
                        <p><strong>Hotline</strong><br />
                        1900 232 354 - 0938 256 545</p>
                        <p><a href="#store-system">Hệ thống cửa hàng ›</a></p>
                        <button className="appointment-button">Đặt lịch hẹn</button>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default AboutUs;
