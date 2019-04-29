import React, { Component } from "react";
import "./styles.css";

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0
    };

    this.carouselRef = React.createRef();
    this.setActiveIndicator = this.setActiveIndicator.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
    this.scroll = this.scroll.bind(this);
    this.offsetWidth = 0;
  }

  componentDidMount() {
    this.offsetWidth = this.props.children[0].ref.current.offsetWidth;
  }

  scroll(dir) {
    dir === "left"
      ? (this.carouselRef.current.scrollLeft -= this.offsetWidth)
      : (this.carouselRef.current.scrollLeft += this.offsetWidth);
  }

  scrollTo(index) {
    this.carouselRef.current.scrollLeft = parseInt(this.offsetWidth) * index;
  }

  setActiveIndicator() {
    const index = this.carouselRef.current.scrollLeft / this.offsetWidth;
    if (Number.isInteger(index)) {
      this.setState({ index: index });
    }
  }

  render() {
    const { children, buttons, indicators } = this.props;

    return (
      <div className="carouselContainer">
        <div
          className="carousel mb-0"
          ref={this.carouselRef}
          onScroll={this.setActiveIndicator}
        >
          {children}
          {buttons && (
            <React.Fragment>
              <button className="left" onClick={() => this.scroll("left")}>
                Left
              </button>
              <button className="right" onClick={() => this.scroll("right")}>
                Right
              </button>
            </React.Fragment>
          )}

          {indicators && (
            <ol className="carousel-indicators">
              {children.map((img, index) => {
                return (
                  <li
                    className={
                      "carousel-indicator " +
                      (this.state.index === index ? "active" : "")
                    }
                    onClick={() => this.scrollTo(index)}
                  />
                );
              })}
            </ol>
          )}
        </div>
      </div>
    );
  }
}

export default Carousel;
