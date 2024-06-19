import React from 'react';
import { Row, Col } from 'antd';
import './index.scss';

const Article = () => {
    return (
        <div className="article">
       
            <Row className="article-content">
                <Col md={16}  className="left-column">
                <p>ARTICLE • OCTOBER 2022</p>
                <h1>During the golden hour.</h1>
                    <p className="intro">On this conceptual jewelry website, this is an article discussing whom this brand is currently collaborating with. I chose to introduce this element as part of both the aesthetic makeup and the "official" quality of Apollonian, whose extras are inspired by Tiffany & Co.’s Stories and Cartier’s Discover sections.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Proin sed libero enim sed. Dignissim enim sit amet venenatis urna cursus. Odio aenean sed adipiscing diam donec. Ut consequat semper viverra nam libero justo laoreet sit amet. Est lorem ipsum dolor sit amet consectetur adipiscing. Tempor orci dapibus ultrices in iaculis nunc. Tristique sollicitudin nibh sit amet commodo nulla.</p>
                    <p>At ultricies mi tempus imperdiet nulla malesuada. Varius duis at consectetur lorem donec. Cursus euismod quis viverra nibh cras pulvinar. Eu nisl nunc mi ipsum faucibus vitae aliquet nec ullamcorper. Nibh tortor id aliquet lectus proin nibh. Aenean sed adipiscing diam donec adipiscing. Eros in cursus turpis massa tincidunt dui. Sed odio morbi quis commodo. Ac feugiat sed lectus vestibulum mattis ullamcorper velit sed. Tempor id eu nisl nunc mi ipsum faucibus vitae. Venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam.</p>
                </Col>
                <Col md={8} className="right-column">
                    <img src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-3.jpg" alt="Golden hour" />
                </Col>
            </Row>
            <Row className="article-quote">
                <Col span={24}>
                    <blockquote>
                        “This is a quote by the collaborator discussed in this article.”<br />
                        <span>— John Fern on his plans for the brand</span>
                    </blockquote>
                </Col>
            </Row>
            <Row className="article-footer">
                <Col md={12} className="footer-left">
                    <img src="https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/04/anh-con-gai-3.jpg" alt="Footer left" />
                </Col>
                <Col md={12} className="footer-right">
                    <p>Cursus euismod quis viverra nibh. Feugiat in ante metus dictum at tempor commodo. Purus non enim praesent elementum facilisis leo. Ipsum dolor sit amet consectetur adipiscing. Duis at consectetur lorem donec massa sapien. Quam vulputate dignissim suspendisse in est ante in nibh mauris. Sit amet est placerat in egestas erat imperdiet. Maecenas volutpat blandit aliquam etiam erat.</p>
                    <p>Morbi tempus iaculis urna id. Quam elementum pulvinar etiam non quam lacus. Lacus vestibulum sed arcu non odio euismod.</p>
                    <p className="author">Jane Doe</p>
                </Col>
            </Row>
        </div>
    );
}

export default Article;
