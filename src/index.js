import React, { Component } from "react";
import ReactDOM from "react-dom";
import Carousel from "./carousel";

class App extends Component {
  render() {
    return (
      <div>
        <Carousel buttons={true} indicators={true}>
          <div ref={React.createRef()}>
            <img src="https://via.placeholder.com/500" loading="lazy" alt="" />
          </div>
          <div ref={React.createRef()}>
            <img src="https://via.placeholder.com/500" loading="lazy" alt="" />
          </div>
        </Carousel>
      </div>
    );
  }
}

export default App;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
