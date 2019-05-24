import React, { Component } from "react";
import ReactDOM from "react-dom";
import Carousel from "./carousel";
import "./styles.css";

const imgs = [
  { src: "https://picsum.photos/800/601" },
  { src: "https://picsum.photos/800/602" },
  { src: "https://picsum.photos/800/300" },
  { src: "https://picsum.photos/800/604" },
  { src: "https://picsum.photos/801/603" },
  { src: "https://picsum.photos/802/603" },
  { src: "https://picsum.photos/803/603" }
];

class App extends Component {
  render() {
    return <Carousel buttons indicators counter imgs={imgs} />;
  }
}

export default App;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
