import React, { Component } from "react";
import ReactDOM from "react-dom";
import Carousel from "./carousel";
import "./styles.css";

const imgs = [
  // {
  //   id: "CbMjTe_d5Z8",
  //   src: "https://img.youtube.com/vi/CbMjTe_d5Z8/maxresdefault.jpg",
  //   type: "youtube"
  // },
  // {
  //   id: "pKPCEpXsS0A",
  //   src: "https://img.youtube.com/vi/pKPCEpXsS0A/maxresdefault.jpg",
  //   type: "youtube"
  // },
  {
    id: null,
    src:
      "//images.legolandholidays.co.uk/hotel/RESCAS/16-9/1-castle-exterior-v2.jpg",
    type: "image"
  },
  {
    id: null,
    src: "//images.legolandholidays.co.uk/hotel/RESCAS/16-9/1-reception.jpg",
    type: "image"
  },
  {
    id: null,
    src: "//images.legolandholidays.co.uk/hotel/RESCAS/16-9/3-jester.jpg",
    type: "image"
  },
  {
    id: null,
    src: "//images.legolandholidays.co.uk/hotel/RESCAS/16-9/4-wizard.jpg",
    type: "image"
  },
  {
    id: null,
    src:
      "//images.legolandholidays.co.uk/hotel/RESCAS/16-9/5-wizard-corridor.jpg",
    type: "image"
  },
  {
    id: null,
    src: "//images.legolandholidays.co.uk/hotel/RESCAS/16-9/6-wizard-room.jpg",
    type: "image"
  },
  {
    id: null,
    src: "//images.legolandholidays.co.uk/hotel/RESCAS/16-9/7-knight-room.jpg",
    type: "image"
  },
  {
    id: null,
    src: "//images.legolandholidays.co.uk/hotel/RESCAS/16-9/8-breakfast.jpg",
    type: "image"
  },
  {
    id: null,
    src:
      "//images.legolandholidays.co.uk/hotel/RESCAS/16-9/9-leaving-hotel.jpg",
    type: "image"
  }
];

class App extends Component {
  constructor() {
    super();

    this.state = {
      clicked: false
    };
  }
  render() {
    return <Carousel buttons indicators counter imgs={imgs} />;
  }
}

export default App;

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
