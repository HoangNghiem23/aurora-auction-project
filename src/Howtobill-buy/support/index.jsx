import  { useState } from "react";
import "./index.scss";
import Search from "antd/es/input/Search";
import { Link } from "react-router-dom";

function Supporttobid() {
  const [feedback, setFeedback] = useState(null);

  const items = [
    {
      key: 1,
      name: "What is needed to bid in an auction?",
    },
  ];
  
  const onSearch = (value) => {
    console.log(value);
  };
  
  const handleFeedback = (response) => {
    setFeedback(response);
  };

  return (
    <div className="support">
      <div className="search-container">
        <Search
          placeholder="Search for answers"
          onSearch={onSearch}
          className="search-container--search"
        />
      </div>
      <div className="content-container">
        <h1>What is needed to bid in an auction?</h1>
        <p>Sotheby's requires bidders to <Link to ={"/register"}>create an account</Link> to ensure a seamless bidding experience. With an account, you'll be able to easily register for any sale through our auction calendar, whether you plan to bid in person or online.</p>
        <p>Follow our <a href="#">step-by-step account creation guide</a> to assist you in this process. Our Client Care team is also available to answer any questions. You can <a href="#">contact them here</a>.</p>
        <p>Please note some auctions and lots require additional financial verification such as a bank reference. A member of our team will contact you if this is necessary.</p>
        <div className="feedback">
          <p>Did this answer your question?</p>
          <button onClick={() => handleFeedback('no')}>No</button>
          <button onClick={() => handleFeedback('yes')}>Yes</button>
        </div>
        <p>240 out of 240 found this helpful.</p>
        {feedback === 'yes' && <p>Thank you for your feedback!</p>}
        {feedback === 'no' && <p>Sorry to hear that. Please contact us for further assistance.</p>}
      </div>
    </div>
  );
}

export default Supporttobid;
