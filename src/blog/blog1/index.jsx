import React from 'react';
import './index.scss';

function Blog() {
  return (
    <div className="blog-page">
      <div className="blog-page__content">
        <h1>Sotheby’s Metaverse.<br />Curating The Best<br />of Digital Art.</h1>
        <p>
          Explore the most trusted and dynamic secondary market
          to collect, buy and sell remarkable digital artworks
        </p>
        <button className="blog-page__explore-btn">Explore</button>
      </div>
      <div className="blog-page__image">
        <img src="https://res.cloudinary.com/dvn3w9xgk/image/fetch/q_auto/f_webp/fl_animated/https://images.ctfassets.net/fu9did2d8yaw/3UFWEJcuTj3TY0Vq95NyHI/18f03e998beded3252803107cdee695c/100-Sunsets-17-1.png%3Fw%3D1920&q%3D25" alt="Digital Art" />
      </div>
      
      <div className="artist-spotlight">
        <div className="artist-spotlight__content">
          <h2>Artist Spotlight</h2>
          <h3>Emily Xie</h3>
          <p>
            Emily Xie, an artist with a lifelong passion for both art and computers, began her artistic journey experimenting with traditional methods. She pursued formal education at Harvard, earning degrees in history of art and architecture, as well as computational science and engineering. Initially, she worked as a software engineer but discovered her love for generative art around 2015, which she pursued alongside her job. Xie's career took off when she became an artist-in-residence at Pioneer Works, an artist and scientist-led nonprofit cultural center in Red Hook, Brooklyn that fosters innovative thinking through the visual and performing arts, technology, music, and science, in 2016. Her very recognizable style and techniques push the boundaries of generative and her numerous public collections have made her a well-known artist. She has also collaborated with the Los Angeles County Museum of Art (LACMA).
          </p>
          <button className="artist-spotlight__explore-btn">Explore Artist</button>
        </div>
        <div className="artist-spotlight__image">
          <img src="https://res.cloudinary.com/dvn3w9xgk/image/fetch/q_auto/f_webp/fl_animated/https://images.ctfassets.net/fu9did2d8yaw/1bkl7qY845HH8ATvVXrX0a/4f1ec16e4ccd97a2bd22910f061ebdf2/emily-xie-ai-art-portrait-3-cropped_copy.png%3Fw%3D1920&q%3D25" alt="Emily Xie" />
        </div>
      </div>

      <div className="artist-spotlight">
        <div className="artist-spotlight__content">
          <h2>Artist Spotlight</h2>
          <h3>John Doe</h3>
          <p>
            John Doe, a visionary digital artist, has been pushing the boundaries of creativity with his unique blend of technology and traditional art techniques. After completing his formal education at the Art Institute of Chicago, John embarked on a journey to redefine the digital art landscape. His works are celebrated for their intricate details and immersive storytelling, often drawing inspiration from nature and urban environments. John has showcased his work in numerous international exhibitions and has been a guest speaker at several digital art conferences.
          </p>
          <button className="artist-spotlight__explore-btn">Explore Artist</button>
        </div>
        <div className="artist-spotlight__image">
          <img src="https://d7hftxdivxxvm.cloudfront.net/?height=354&quality=80&resize_to=fit&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FQBxy5VrS3XQTUF510cusjQ%2Flarger.jpg&width=254" alt="John Doe" />
        </div>
      </div>

      <div className="artist-spotlight">
        <div className="artist-spotlight__content">
          <h2>Artist Spotlight</h2>
          <h3>Jane Smith</h3>
          <p>
            Jane Smith is an acclaimed multimedia artist known for her innovative use of augmented reality in art. Graduating from the Royal College of Art in London, Jane has developed a unique style that merges physical and digital mediums. Her projects often explore themes of identity, technology, and human interaction. Jane's work has been featured in prestigious galleries worldwide, and she continues to inspire a new generation of artists with her groundbreaking installations and interactive exhibits.
          </p>
          <button className="artist-spotlight__explore-btn">Explore Artist</button>
        </div>
        <div className="artist-spotlight__image">
          <img src="https://www.saqa.com/sites/default/files/styles/banner/public/banner-images/SPOT24-SnavelyAmanda.jpg?h=2944af49&itok=ScYs7wA1" alt="Jane Smith" />
        </div>
      </div>

      <div className="artist-spotlight">
        <div className="artist-spotlight__content">
          <h2>Artist Spotlight</h2>
          <h3>Alex Kim</h3>
          <p>
            Alex Kim, a South Korean digital artist, combines elements of fantasy and surrealism to create captivating visual experiences. With a background in graphic design and animation, Alex's work is known for its vibrant colors and dynamic compositions. He has collaborated with major brands and has been a featured artist at several international digital art festivals. Alex's dedication to his craft is evident in his meticulously crafted pieces, each telling a unique story that resonates with audiences around the globe.
          </p>
          <button className="artist-spotlight__explore-btn">Explore Artist</button>
        </div>
        <div className="artist-spotlight__image">
          <img src="https://uploads3.wikiart.org/images/yves-klein/untitled-blue-monochrome-1955-1.jpg" alt="Alex Kim" />
        </div>
      </div>
    </div>
  );
}

export default Blog;
