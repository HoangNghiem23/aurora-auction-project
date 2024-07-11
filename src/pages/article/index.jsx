import React, { useEffect } from "react";

import "./index.scss";

const Article = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="article-container">
      <main className="article-main">
        <article className="article-content">
          <header className="article-header">
            <h1>During the golden hour.</h1>
            <p>ARTICLE - OCTOBER 2022</p>
          </header>
          <section className="article-body">
            <div className="text-left-image-right">
              <div className="text">
                <p>
                  On this conceptual jewelry website, this is an article
                  discussing whom this brand is currently collaborating with. I
                  chose to introduce this element as part of both the aesthetic
                  makeup and the "official" quality of Apollonian, whose extras
                  are inspired by Tiffany & Co.'s Stories and Cartier's Discover
                  sections.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Proin sed libero enim sed. Dignissim enim sit amet venenatis
                  urna cursus. Odio aenean sed adipiscing diam donec. Ut
                  consequat semper viverra nam libero justo laoreet sit amet.
                  Est lorem ipsum dolor sit amet consectetur adipiscing. Tempor
                  orci dapibus ultrices in iaculis nunc. Tristique sollicitudin
                  nibh sit amet commodo nulla.
                </p>
              </div>
              <div className="image">
                <img
                  src="https://media.istockphoto.com/id/1338646661/photo/gold-jewelry-diamond-rings-show-in-luxury-retail-store-window-display-showcase.jpg?s=612x612&w=0&k=20&c=9VOOm2CteX5ViJVQ58wW8Gl_nyHnrJraegUbIp8Au9I="
                  alt="Golden hour"
                  className="article-image"
                />
              </div>
            </div>
            <blockquote className="article-quote">
              “This is a quote by the collaborator discussed in this article.”
              <cite>— John Fern on his plans for the brand</cite>
            </blockquote>
            <div className="image-left-text-right">
              <div className="image">
                <img
                  src="https://media.istockphoto.com/id/1338646661/photo/gold-jewelry-diamond-rings-show-in-luxury-retail-store-window-display-showcase.jpg?s=612x612&w=0&k=20&c=9VOOm2CteX5ViJVQ58wW8Gl_nyHnrJraegUbIp8Au9I="
                  alt="Collaborator"
                  className="article-image"
                />
              </div>
              <div className="text">
                <p>
                  Cursus euismod quis viverra nibh. Feugiat in ante metus dictum
                  at tempor commodo. Purus non enim praesent elementum facilisis
                  leo. Ipsum dolor sit amet consectetur adipiscing. Duis at
                  consectetur lorem donec massa sapien. Quam vulputate dignissim
                  suspendisse in est ante in nibh mauris. Sit amet est placerat
                  in egestas erat imperdiet. Maecenas volutpat blandit aliquam
                  etiam erat.
                </p>
                <p>
                  Morbi tempus iaculis urna id. Quam elementum pulvinar etiam
                  non quam lacus. Lacus vestibulum sed arcu non odio euismod.
                </p>
              </div>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
};

export default Article;
