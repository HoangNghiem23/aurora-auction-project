import {
  FacebookOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  XOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";
import "./index.scss";

const FooterTest = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info-links">
          <div className="footer-info">
            <h3 className="footer-title">CUSTOMER SERVICES</h3>
            <a href="#" className="footer-link">
              Contact Us
            </a>
            <a href="#" className="footer-link">
              Track Your Order
            </a>
            <a href="#" className="footer-link">
              Shipping & Returns
            </a>
            <a href="#" className="footer-link">
              Frequently Asked Questions
            </a>
            <a href="#" className="footer-link">
              Schedule An Appointment
            </a>
          </div>
          <div className="footer-info">
            <h3 className="footer-title">ABOUT US</h3>
            <a href="#" className="footer-link">
              Origins
            </a>
            <a href="#" className="footer-link">
              Our Purpose
            </a>
            <a href="#" className="footer-link">
              Careers
            </a>
            <a href="#" className="footer-link">
              Sustainability
            </a>
            <a href="#" className="footer-link">
              Giving Back
            </a>
          </div>
          <div className="footer-info">
            <h3 className="footer-title">MATERIAL CARE</h3>
            <a href="#" className="footer-link">
              Jewelry Repair
            </a>
            <a href="#" className="footer-link">
              Ring Sizing
            </a>
            <a href="#" className="footer-link">
              Metal Allergy Resources
            </a>
            <a href="#" className="footer-link">
              Styling Tips
            </a>
          </div>
          <div className="footer-info">
            <h3 className="footer-title">MAIN LOCATIONS</h3>
            <a href="#" className="footer-link">
              Chicago, IL
            </a>
            <a href="#" className="footer-link">
              San Francisco, CA
            </a>
            <a href="#" className="footer-link">
              New York, NY
            </a>
            <a href="#" className="footer-link">
              Seattle, WA
            </a>
          </div>
        </div>
        <div className="footer-copyright-policy">
          <div className="footer-copyright">
            <p className="copyright-text">&copy; AURORA, LLC</p>
          </div>
          <div className="footer-policy">
            <a href="#" className="policy-text">
              PRIVACY POLICY
            </a>
            <p>&bull;</p>
            <a href="#" className="policy-text">
              TERMS OF USE
            </a>
            <p>&bull;</p>
            <a href="#" className="policy-text">
              SITEMAP
            </a>
            <p>&bull;</p>
            <a href="#" className="policy-text">
              DO NOT SELL MY INFORMATION
            </a>
            <p>&bull;</p>
            <a href="#" className="policy-text">
              COOKIES
            </a>
          </div>
        </div>
      </div>
      <div className="footer-signup">
        <h2 className="footer-title">You can be one step ahead.</h2>
        <p className="footer-description">
          Sign up to hear about our updates on the dot.
        </p>
        <div className="signup">
          <input
            type="text"
            placeholder="Your email address"
            className="signup-input"
          />
          <div className="signup-btn">SIGN UP</div>
        </div>
        <div className="footer-media">
          <a href="#">
            <InstagramOutlined />
          </a>
          <a href="#">
            <XOutlined />
          </a>
          <a href="#">
            <FacebookOutlined />
          </a>
          <a href="#">
            <YoutubeOutlined />
          </a>
          <a href="#">
            <LinkedinOutlined />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterTest;
