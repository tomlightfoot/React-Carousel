import React, { Component } from "react";
import "./styles.css";

// This creates the "Article Context" i.e. an object containing a Provider and a Consumer component
const CarouselContext = React.createContext();

// This is the Title sub-component, which is a consumer of the Article Context
const Img = props => {
  console.log(props);
  return (
    <CarouselContext.Consumer>
      {({ setImgRef }) => {
        return <div ref={setImgRef}>{props.children}</div>;
      }}
    </CarouselContext.Consumer>
  );
};

const Buttons = () => {
  return (
    <CarouselContext.Consumer>
      {({ scroll }) => {
        return (
          <React.Fragment>
            <button className="left" onClick={() => scroll("left")}>
              Left
            </button>
            <button className="right" onClick={() => scroll("right")}>
              Right
            </button>
          </React.Fragment>
        );
      }}
    </CarouselContext.Consumer>
  );
};

const Indicators = () => {
  return (
    <CarouselContext.Consumer>
      {({ imgRefs, scrollTo }) => {
        return (
          <ol className="carousel-indicators">
            {imgRefs &&
              imgRefs.map(img => {
                return <li onClick={() => scrollTo(img)} />;
              })}
          </ol>
        );
      }}
    </CarouselContext.Consumer>
  );
};

// This is our main Article components, which is a provider of the Article Context
class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: {
        setImgRef: this.setImgRef,
        scrollTo: this.scrollTo,
        scroll: this.scroll,
        imgRefs: this.imgRefs
      },
      imgRefs: []
    };

    this.imgRefs = [];
    this.carouselRef = React.createRef();
  }

  componentDidMount() {
    this.setState({
      value: {
        setImgRef: this.setImgRef,
        scrollTo: this.scrollTo,
        scroll: this.scroll,
        imgRefs: this.imgRefs
      }
    });
  }

  setImgRef = img => {
    this.imgRefs.push(img);
    this.setState({ imgRefs: this.imgRefs });
  };

  scrollTo = img => {
    this.carouselRef.current.scrollLeft = img.offsetLeft;
  };

  scroll = dir => {
    const width = this.state.imgRefs[1].offsetLeft;
    dir === "left"
      ? (this.carouselRef.current.scrollLeft -= width)
      : (this.carouselRef.current.scrollLeft += width);
  };

  render() {
    return (
      <CarouselContext.Provider {...this.state}>
        <div className="carouselContainer">
          <div className="carousel" ref={this.carouselRef}>
            {this.props.children}
          </div>
        </div>
      </CarouselContext.Provider>
    );
  }
}

Carousel.Img = Img;
Carousel.Buttons = Buttons;
Carousel.Indicators = Indicators;

export default Carousel;
