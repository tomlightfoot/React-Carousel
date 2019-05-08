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
  }

  componentDidMount() {
    window.addEventListener(
      "resize",
      () => (this.carouselRef.current.scrollLeft = 0)
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      "resize",
      () => (this.carouselRef.current.scrollLeft = 0)
    );
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
    const scrollPosition =
      this.carouselRef.current.scrollLeft /
      this.props.children[0].ref.current.offsetWidth;
    this.state.index < Math.round(scrollPosition) &&
      this.setState({ translate: this.state.translate - 16 });
    this.state.index > Math.round(scrollPosition) &&
      this.setState({ translate: this.state.translate + 16 });

    this.setState({
      index: Math.round(scrollPosition)
    });
  }

  render() {
    const { children, counter, buttons, indicators } = this.props;

    return (
      <div className="carouselContainer">
        <div
          className="carousel mb-0"
          ref={this.carouselRef}
          onScroll={this.setActiveIndicator}
        >
          {children}
        </div>
        {buttons && (
          <React.Fragment>
            <label className="left" onClick={() => this.scroll("left")}>
              <svg
                aria-hidden="true"
                role="presentation"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
              </svg>
              <span className="sr-only">Previous</span>
            </label>
            <label className="right" onClick={() => this.scroll("right")}>
              <svg
                aria-hidden="true"
                role="presentation"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
              </svg>
              <span className="sr-only">Next</span>
            </label>
          </React.Fragment>
        )}
        {indicators && (
          <ol
            className="indicators"
            style={{
              transform: "translateX(" + this.state.translate + "px)",
              transition: "0.6s"
            }}
          >
            {children.map((img, index) => {
              return (
                <li
                  className={
                    "indicator " +
                    (this.state.index === index ? "active-ind " : "") +
                    (Math.abs(this.state.index - index) === 1
                      ? "large-ind"
                      : "") +
                    (Math.abs(this.state.index - index) === 2
                      ? "medium-ind"
                      : "") +
                    (Math.abs(this.state.index - index) === 3
                      ? "small-ind"
                      : "") +
                    (Math.abs(this.state.index - index) === 4
                      ? "ex-small-ind"
                      : "") +
                    (Math.abs(this.state.index - index) > 4
                      ? "inactive-ind"
                      : "")
                  }
                  key={index}
                  onClick={() => this.scrollTo(index)}
                />
              );
            })}
          </ol>
        )}
        {counter && (
          <div className="mt-2 test">
            {this.state.index + 1}/{children.length}
          </div>
        )}
      </div>
    );
  }
}

Carousel.propTypes = {
  buttons: PropTypes.bool,
  indicators: PropTypes.bool
};

export default Carousel;
