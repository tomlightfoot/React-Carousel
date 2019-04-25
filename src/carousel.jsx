import React, { Component } from "react";
import "./styles.css";

// This creates the "Article Context" i.e. an object containing a Provider and a Consumer component
const CarouselContext = React.createContext();

// This is the Title sub-component, which is a consumer of the Article Context
const Img = props => {
  return (
    <CarouselContext.Consumer>
      {({ setImgRef }) => {
        console.log(setImgRef);
        return <div ref={setImgRef}>{props.children}</div>;
      }}
    </CarouselContext.Consumer>
  );
};

const Buttons = () => {
  return (
    <CarouselContext.Consumer>
      {({ scroll }) => {
        console.log("here");
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

    this.imgRefs = [];
    this.carouselRef = React.createRef();

    this.setImgRefBound = this.setImgRef.bind(this);
    this.scrollToBound = this.scrollTo.bind(this);
    this.scrollBound = this.scroll.bind(this);

    this.state = {
      value: {
        setImgRef: this.setImgRefBound,
        scrollTo: this.scrollToBound,
        scroll: this.scrollBound,
        imgRefs: this.imgRefs
      }
    };
  }

  componentDidMount() {
    this.setState({
      value: {
        setImgRef: this.setImgRefBound,
        scrollTo: this.scrollToBound,
        scroll: this.scrollBound,
        imgRefs: this.imgRefs
      }
    });
  }

  setImgRef(img) {
    this.imgRefs.push(img);
  }

  scrollTo(img) {
    this.carouselRef.current.scrollLeft = img.offsetLeft;
  }

  scroll(dir) {
    const width = this.state.value.imgRefs[1].offsetLeft;
    dir === "left"
      ? (this.carouselRef.current.scrollLeft -= width)
      : (this.carouselRef.current.scrollLeft += width);
  }

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
