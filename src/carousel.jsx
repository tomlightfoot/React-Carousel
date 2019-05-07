import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.css";

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      translate: 0
    };

    this.carouselRef = React.createRef();
    this.scroll = this.scroll.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
    this.setActiveIndicator = this.setActiveIndicator.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    this.carouselRef.current.scrollLeft = 0;
  }

  scroll(dir) {
    dir === "left"
      ? (this.carouselRef.current.scrollLeft -= this.props.children[0].ref.current.offsetWidth)
      : (this.carouselRef.current.scrollLeft += this.props.children[0].ref.current.offsetWidth);
  }

  scrollTo(index) {
    this.carouselRef.current.scrollLeft =
      parseInt(this.props.children[0].ref.current.offsetWidth) * index;
  }

  setActiveIndicator() {
    this.state.index <
      Math.round(
        this.carouselRef.current.scrollLeft /
          this.props.children[0].ref.current.offsetWidth
      ) && this.setState({ translate: this.state.translate - 14 });
    this.state.index >
      Math.round(
        this.carouselRef.current.scrollLeft /
          this.props.children[0].ref.current.offsetWidth
      ) && this.setState({ translate: this.state.translate + 14 });

    this.setState({
      index: Math.round(
        this.carouselRef.current.scrollLeft /
          this.props.children[0].ref.current.offsetWidth
      )
    });
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
            <ol
              className="carousel-indicators"
              style={{
                transform: "translateX(" + this.state.translate + "px)",
                transition: "0.6s"
              }}
            >
              {children.map((img, index) => {
                return (
                  <li
                    className={
                      "carousel-indicator " +
                      (this.state.index === index ? "active " : "") +
                      (Math.abs(this.state.index - index) === 1
                        ? "large"
                        : "") +
                      (Math.abs(this.state.index - index) === 2
                        ? "medium"
                        : "") +
                      (Math.abs(this.state.index - index) === 3
                        ? "small"
                        : "") +
                      (Math.abs(this.state.index - index) === 4
                        ? "ex-small"
                        : "") +
                      (Math.abs(this.state.index - index) > 4 ? "inactive" : "")
                    }
                    key={index}
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
