import "./index.scss";

function DiamondFactors() {
  return (
    <section id="factors" className="diamondfactor">
      <h2>Diamond Pricing Factors</h2>
      <ul>
        <li>
          <h3><strong>1. Carat :</strong></h3>
          <ul>
            <li>Carat is the unit of measurement for the weight of a diamond.</li>
            <li>1 carat is equal to 200 milligrams.</li>
            <li>The weight of a diamond is one of the most important factors affecting its value.</li>
            <li>Larger diamonds are rarer and more valuable, but their value does not increase linearly; it increases exponentially.</li>
          </ul>
        </li>
        <li>
          <h3><strong>2. Color :</strong></h3>
          <ul>
            <li>Diamonds are graded on a color scale from <b className="underline_bold">D</b> (colorless) to <b className="underline_bold">Z</b> (light yellow or brown).</li>
            <li>Colorless diamonds (D-F) are considered rare and highly valuable.</li>
            <li>Diamonds with more noticeable color (G-Z) are generally less valuable, except for fancy color diamonds.</li>
          </ul>
        </li>
        <li>
          <h3><strong>3. Clarity :</strong></h3>
          <ul>
            <li>Clarity refers to the presence of internal or external flaws, known as inclusions and blemishes.</li>
            <li>Clarity grades include: <b className="underline_bold">FL</b> (Flawless), <b className="underline_bold">IF</b> (Internally Flawless), <b className="underline_bold">VVS1</b> and <b className="underline_bold">VVS2</b> (Very Very Slightly Included), <b className="underline_bold">VS1</b> and <b className="underline_bold">VS2</b> (Very Slightly Included), <b className="underline_bold">SI1</b> and <b className="underline_bold">SI2</b> (Slightly Included), <b className="underline_bold">I1</b>, <b className="underline_bold">I2</b>, and <b className="underline_bold">I3</b> (Included).</li>
            <li>The fewer the inclusions and blemishes, the higher the value.</li>
          </ul>
        </li>
        <li>
          <h3><strong>4. Cut :</strong></h3>
          <ul>
            <li>The cut of a diamond not only refers to its shape but also to the proportions, symmetry, and polish of its facets.</li>
            <li>A well-cut diamond maximizes brightness, fire, and scintillation. Common cut grades include: <b className="underline_bold">Excellent</b>, <b className="underline_bold">Very Good</b>, <b className="underline_bold">Good</b>, <b className="underline_bold">Fair</b>, <b className="underline_bold">Poor</b>.</li>
          </ul>
        </li>
        <li>
          <h3><strong>5. Shape :</strong></h3>
          <ul>
            <li>The shape of a diamond also influences its value. Common shapes include <b className="underline_bold">Round</b>, <b className="underline_bold">Princess</b>, <b className="underline_bold">Emerald</b>, <b className="underline_bold">Asscher</b>, <b className="underline_bold">Marquise</b>, <b className="underline_bold">Oval</b>, <b className="underline_bold">Radiant</b>, <b className="underline_bold">Pear</b>, <b className="underline_bold">Heart</b>, and <b className="underline_bold">Cushion</b>.</li>
            <li>Each shape has its own characteristics and value.</li>
          </ul>
        </li>
        <li>
          <h3><strong>6. Certification :</strong></h3>
          <ul>
            <li>Certifications from reputable organizations like GIA (Gemological Institute of America) provide detailed information and verification of a diamond's characteristics.</li>
            <li>Certification ensures the quality and value of the diamond, giving buyers confidence in their purchase.</li>
          </ul>
        </li>
      </ul>
    </section>
  );
}

export default DiamondFactors;
