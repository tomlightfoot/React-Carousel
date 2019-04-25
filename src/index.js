import React, { Component } from "react";
import ReactDOM from "react-dom";
import Carousel from "./carousel";

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Carousel>
          <Carousel.Img>
            <img src="https://picsum.photos/737/501" loading="lazy" alt="" />
          </Carousel.Img>
          <Carousel.Img>
            <img src="https://picsum.photos/737/500" loading="lazy" alt="" />
          </Carousel.Img>
          <Carousel.Buttons />
          <Carousel.Indicators />
        </Carousel>
      </div>
    );
  }
}

export default App;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
