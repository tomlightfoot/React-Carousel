import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.css";

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0
    };

    this.carouselRef = React.createRef();
    this.scroll = this.scroll.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
    this.setActiveIndicator = this.setActiveIndicator.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.offsetWidth = 0;
  }

  componentDidMount() {
    this.offsetWidth = this.props.children[0].ref.current.offsetWidth;
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    this.offsetWidth = this.props.children[0].ref.current.offsetWidth;
    this.carouselRef.current.scrollLeft = 0;
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
    this.setState({
      index: Math.round(this.carouselRef.current.scrollLeft / this.offsetWidth)
    });
  }

  test(e) {
    console.log(e.pageX);
  }

  render() {
    const { children, buttons, indicators } = this.props;

    return (
      <div className="carouselContainer">
        <div
          className="carousel mb-0"
          ref={this.carouselRef}
          onScroll={this.setActiveIndicator}
          draggable={true}
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

Carousel.propTypes = {
  buttons: PropTypes.bool,
  indicators: PropTypes.bool
};

export default Carousel;
