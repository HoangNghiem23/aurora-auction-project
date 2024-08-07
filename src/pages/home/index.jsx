// export default HomePage;
import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ImageSlider from "../../components/slider"; // Import slider

const HomePage = () => {
  const navigate = useNavigate();

  const handleAboutUsClick = () => {
    navigate("/aboutus");
  };

  const handlePolicyClick = () => {
    navigate("/policy");
  };

  const handleArticleClick = () => {
    navigate("/article");
  };

  const handleBlogClick = () => {
    navigate("/blog");
  };

  return (
    <div className="homepage">
      <main className="main-content">
        <section className="hero-section">
          <ImageSlider />
          <div className="hero-text">
            <h1 className="hero-title">The Aurora Auction </h1>
            <p className="hero-description">
              Fall has arrived.
              <br />
              Shop for our new releases starting today.
            </p>
            <button className="hero-btn">SHOP NOW</button>
          </div>
        </section>
        <section className="category-section">
          <h2 className="category-title">Shop by category</h2>
          <p className="category-description">Indulge in what we offer.</p>
          <div className="category-items">
            <div className="category-item">
              <img
                src="https://fleckedwithgold.com/cdn/shop/files/ultraminiclover.jpg?v=1686489354"
                alt="Necklaces"
                className="category-image"
              />
              <p className="category-text">Necklaces</p>
            </div>
            <div className="category-item">
              <img
                src="https://www.lmfj.com/_next/image?url=https%3A%2F%2Fimages.prismic.io%2Flmfjcom%2F7727e45a-934a-4f51-be6e-f1b8fc7410e4_20221011%2Bearring%2Bdangle.png%3Fauto%3Dcompress%2Cformat&w=3840&q=75"
                alt="Earrings"
                className="category-image"
              />
              <p className="category-text">Earrings</p>
            </div>
            <div className="category-item">
              <img
                src="https://alexandramarksjewelry.com/cdn/shop/files/PermanentJewelry_AlexandraMarks_1000x1000.png?v=1713974191"
                alt="Bracelets"
                className="category-image"
              />
              <p className="category-text">Bracelets</p>
            </div>
            <div className="category-item">
              <img
                src="https://ajaffe.com/pub/media/wysiwyg/Engagaement_1280_x_586_pixels_01_Sep_2022-new.jpg"
                alt="Rings"
                className="category-image"
              />
              <p className="category-text">Rings</p>
            </div>
            <div className="category-item">
              <img
                src="https://m.media-amazon.com/images/I/61b0IWUpv-L._AC_UY1000_.jpg"
                alt="Charms"
                className="category-image"
              />
              <p className="category-text">Brooch</p>
            </div>
          </div>
        </section>
        <hr></hr>
        <section className="products-section">
          <div className="product-item">
            <img
              src="https://cache.net-a-porter.com/content/images/story-head-content-24thOctober2022-1666086890596.jpeg/w1900_q65.jpeg"
              alt="Iconic Jewels: Her Sense of Style"
              className="product-image"
            />
            <p className="product-title">Iconic Jewels: Her Sense of Style</p>
            <p className="product-date">
              2-16 MAY 2024 | 12:00 PM CEST | GENEVA
            </p>
            <button className="add-to-cart-button">BILD</button>
          </div>
          <div className="product-item">
            <img
              src="https://hips.hearstapps.com/hmg-prod/images/vintage-necklaces-and-jewelry-for-sale-in-the-royalty-free-image-1687462684.jpg"
              alt="Iconic Jewels: Her Sense of Style"
              className="product-image"
            />
            <p className="product-title">Iconic Jewels: Her Sense of Style</p>
            <p className="product-date">
              2-16 MAY 2024 | 12:00 PM CEST | GENEVA
            </p>
            <button className="add-to-cart-button">BILD</button>
          </div>
          <div className="product-item">
            <img
              src="https://fsilverman.com/wp-content/uploads/2021/07/iStock-494833184-gold-jewelry.jpg"
              alt="Iconic Jewels: Her Sense of Style"
              className="product-image"
            />
            <p className="product-title">Iconic Jewels: Her Sense of Style</p>
            <p className="product-date">
              2-16 MAY 2024 | 12:00 PM CEST | GENEVA
            </p>
            <button className="add-to-cart-button">ADD TO CART</button>
          </div>
          <div className="product-item">
            <img
              src="https://media.cnn.com/api/v1/images/stellar/prod/230515143657-0707.jpg?q=w_2000,c_fill"
              alt="Iconic Jewels: Her Sense of Style"
              className="product-image"
            />
            <p className="product-title">Iconic Jewels: Her Sense of Style</p>
            <p className="product-date">
              2-16 MAY 2024 | 12:00 PM CEST | GENEVA
            </p>
            <button className="add-to-cart-button">ADD TO CART</button>
          </div>
        </section>
        <section className="additional-content">
          <div className="section-item">
            <img
              src="https://i.pinimg.com/originals/ff/9c/20/ff9c204f62b65141a988cde3c7b1484f.jpg"
              alt="Jewelry Image 1"
              className="section-image"
            />
            <div className="section-text">
              <h3 className="section-title">About us</h3>
              <p className="section-description">
                At our jewelry auction site, we provide a trustworthy and
                enjoyable experience. Each piece is vetted and verified for
                authenticity. Our experts bring you unique and exquisite pieces
                with the highest standards of integrity and transparency. Join
                our community and discover the difference.
              </p>
              <button className="section-btn" onClick={handleAboutUsClick}>
                About Us
              </button>
            </div>
          </div>
          <div className="section-item">
            <div className="section-text">
              <h3 className="section-title">Article</h3>
              <p className="section-description">
                Our articles section offers a wealth of information on various
                topics related to jewelry. From the latest trends and designs to
                in-depth guides on jewelry care and maintenance, we cover it
                all. Each article is meticulously researched and written by
                experts in the field, ensuring you get accurate and valuable
                insights
              </p>
              <button className="section-btn" onClick={handleArticleClick}>
                Read more
              </button>
            </div>
            <img
              src="https://c0.wallpaperflare.com/preview/984/867/753/jewellery-gold-wedding-indian.jpg"
              alt="Jewelry Image 2"
              className="section-image"
            />
          </div>
          <div className="section-item">
            <img
              src="https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcHg4MDQyMTItaW1hZ2Uta3d2eGg0NGwuanBn.jpg"
              alt="Sunset Image"
              className="section-image"
            />
            <div className="section-text">
              <h3 className="section-title">Purchasing Policy</h3>
              <p className="section-description">
                Our purchasing policy ensures a seamless and secure experience
                for all our customers. We prioritize transparency, authenticity,
                and customer satisfaction. Each item is thoroughly inspected and
                verified before listing, and we offer comprehensive support
                throughout the bidding and purchasing process. Trust us for a
                reliable and exceptional jewelry auction experience
              </p>
              <button className="section-btn" onClick={handlePolicyClick}>
                READ MORE
              </button>
            </div>
          </div>
          <div className="section-item">
            <img
              src="https://sothebys-com.brightspotcdn.com/dims4/default/fa7a823/2147483647/strip/true/crop/2912x1385+0+49/resize/1440x685!/format/webp/quality/90/?url=http%3A%2F%2Fsothebys-brightspot.s3.amazonaws.com%2Fdotcom%2Ff3%2Ff6%2Fe93d51de40a0a6da4e3c22ea3c15%2Fai-001.jpg"
              alt="Blog Image"
              className="section-image"
            />
            <div className="section-text">
              <h3 className="section-title">Blog</h3>
              <p className="section-description">
                Discover the latest trends, tips, and stories in our blog. Stay
                updated with our latest articles and insights.
              </p>
              <button className="section-btn" onClick={handleBlogClick}>
                Read More
              </button>
            </div>
          </div>
        </section>
      </main>
      <div className="footer__follow">
        <div className="footer__follow__content">Follow Us</div>
      </div>
    </div>
  );
};

export default HomePage;
