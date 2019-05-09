import React, { Component } from "react";
import ReactDOM from "react-dom";
import Carousel from "./carousel";
import "./styles.css";

class App extends Component {
  render() {
    return (
      <div>
        <Carousel buttons={true} indicators={true}>
          <div ref={React.createRef()}>
            <img src="https://picsum.photos/800/600" loading="lazy" alt="" />
          </div>
          <div ref={React.createRef()}>
            <img src="https://picsum.photos/800/601" loading="lazy" alt="" />
          </div>
          <div ref={React.createRef()}>
            <img src="https://picsum.photos/800/602" loading="lazy" alt="" />
          </div>
          <div ref={React.createRef()}>
            <img src="https://picsum.photos/800/603" loading="lazy" alt="" />
          </div>
          <div ref={React.createRef()}>
            <img src="https://picsum.photos/800/604" loading="lazy" alt="" />
          </div>
          <div ref={React.createRef()}>
            <img src="https://picsum.photos/801/600" loading="lazy" alt="" />
          </div>
          <div ref={React.createRef()}>
            <img src="https://picsum.photos/802/600" loading="lazy" alt="" />
          </div>
          <div ref={React.createRef()}>
            <img src="https://picsum.photos/803/600" loading="lazy" alt="" />
          </div>
          <div ref={React.createRef()}>
            <img src="https://picsum.photos/804/600" loading="lazy" alt="" />
          </div>
          <div ref={React.createRef()}>
            <img src="https://picsum.photos/800/605" loading="lazy" alt="" />
          </div>
          <div ref={React.createRef()}>
            <img src="https://picsum.photos/800/606" loading="lazy" alt="" />
          </div>
          <div ref={React.createRef()}>
            <img src="https://picsum.photos/805/600" loading="lazy" alt="" />
          </div>
          <div ref={React.createRef()}>
            <img src="https://picsum.photos/806/600" loading="lazy" alt="" />
          </div>
          <div ref={React.createRef()}>
            <img src="https://picsum.photos/807/600" loading="lazy" alt="" />
          </div>
          <div ref={React.createRef()}>
            <img src="https://picsum.photos/800/600" loading="lazy" alt="" />
          </div>
        </Carousel>
      </div>
    );
  }
}

export default App;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
