import React from 'react';
import './index.scss';

const AboutUs = () => {
    return (
        <div className="about-us">
            <div className="about-text">
                <h1>About Us</h1>
                <p className="intro">This is an About Us page for this conceptual jewelry website, helping viewers become accustomed to Apollonian and its purpose, if it were real.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                <p>Vel eros donec ac odio tempor orci dapibus ultrices. Mauris vitae ultricies leo integer. Placerat duis ultricies lacus sed turpis tincidunt id.</p>
                <p>Augue mauris augue neque gravida in fermentum et.</p>
            </div>
            <div className="about-image">
                <img src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-1-1.jpg" alt="Jewelry" />
            </div>
        </div>
    );
}

export default AboutUs;
