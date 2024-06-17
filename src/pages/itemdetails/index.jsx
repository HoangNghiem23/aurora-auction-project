import React, { useState } from 'react'; // Ensure useState is imported properly
import Header from '../../components/header';
import Footer from '../../components/footer';
import './index.scss';
import { FaMapMarkerAlt } from 'react-icons/fa'; // Import the location icon map

const ItemDetails = () => {
  // Add state for toggling each section
  const [showDetails, setShowDetails] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [showAvailability, setShowAvailability] = useState(false);

  // Toggle functions for each section
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const toggleTips = () => {
    setShowTips(!showTips);
  };

  const toggleAvailability = () => {
    setShowAvailability(!showAvailability);
  };

  const openGoogleMaps = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=your+location', '_blank');
  };

  return (
    <div className="itemdetails-wrapper">
      <Header />
      <div className="itemdetails-container">
        <main className="itemdetails-main-content">
          <div className="itemdetails-detail">
            <div className="itemdetails-image">
              <img src="https://images5.alphacoders.com/135/1352225.jpeg" alt="Sample Item" />
            </div>
            <div className="itemdetails-info">
              <p className="back-to-selection">BACK TO SELECTION</p>
              <h1 className="itemdetails-title">Sample Item</h1>
              <p className="itemdetails-price">$1000.00</p>
              <p className="itemdetails-description">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <button className="add-to-bag">REGISTER TO BILD</button>
              <div className="product-details">
                <p onClick={toggleDetails} className="details-toggle">DETAILS {showDetails ? '▲' : '▼'}</p>
                {showDetails && (
                  <div className="details-content">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat officiis ut soluta in laborum quis, optio enim aspernatur maxime asperiores, libero deserunt. Exercitationem, nihil ducimus. Iure iusto molestias sed modi.</p>
                  </div>
                )}
                <p onClick={toggleTips} className="details-toggle">TIPS & WARNINGS {showTips ? '▲' : '▼'}</p>
                {showTips && (
                  <div className="details-content">
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat pariatur necessitatibus, aut illo porro adipisci numquam, nisi, molestiae eligendi harum deserunt sapiente! Praesentium molestiae delectus, veniam consequatur possimus laudantium vitae.</p>
                  </div>
                )}
                <p onClick={openGoogleMaps} className="location-link">
                  LOCAL AVAILABILITY <FaMapMarkerAlt />
                </p>
              </div>
            </div>
          </div>
          <div className="recommended-section">
            <h2 className="recommended-title">Recommended for you</h2>
            <p className="recommended-subtitle">Based on your history</p>
            <div className="recommended-items">
              <div className="recommended-item">
                <img src="https://i.pinimg.com/originals/2c/cf/44/2ccf44ad05c0fe69fe1ccbb7ef9bbf61.jpg" alt="Heart Drop" />
                <p>HEART DROP - $200.00</p>
              </div>
              <div className="recommended-item">
                <img src="https://cdn.pixabay.com/photo/2016/02/02/15/54/jewellery-1175533_640.jpg" alt="Diamond Choker" />
                <p>DIAMOND CHOKER - $300.00</p>
              </div>
              <div className="recommended-item">
                <img src="https://cdn.pixabay.com/photo/2016/02/02/15/55/jewellery-1175535_640.jpg" alt="Leaf Pendant" />
                <p>LEAF PENDANT - $150.00</p>
              </div>
              <div className="recommended-item">
                <img src="https://img.freepik.com/free-photo/gold-necklace-earrings-are-displayed-red-velvet-surface_1340-42830.jpg" alt="Ruby Pendant" />
                <p>RUBY PENDANT - $250.00</p>
              </div>
              <div className="recommended-item">
                <img src="https://etimg.etb2bimg.com/thumb/msid-105058534,width-1200,resizemode-4/.jpg" alt="Opal Heart" />
                <p>OPAL HEART - $1000.00</p>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ItemDetails;
