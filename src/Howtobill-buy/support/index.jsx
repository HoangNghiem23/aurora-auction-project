import React from "react";
import "./index.scss";
import Search from "antd/es/input/Search";
function Supporttobid() {
  const items = [
    {
      key: 1,
      name: "What is needed to bid in an auction?",
    },
  ];
  const onSearch = (value) => {
    console.log(value);
  };
  return (
    <div className="support">
      <div className="search-container">
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          className="search-container--search"
        />
      </div>
      {items.map((item) => (
        <h2 key={item.key}>{item.name}</h2>
      ))}
    </div>
  );
}

export default Supporttobid;
