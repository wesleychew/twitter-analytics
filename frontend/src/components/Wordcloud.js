import React from "react";
import ReactDOM from "react-dom";
import ReactWordcloud from "react-wordcloud";

import words from "./words";

function Wordcloud() {
  return (
    <div style={{ width: "100%", height: 300 }}>
      <ReactWordcloud words={words} />
    </div>
  );
}

export default Wordcloud;
