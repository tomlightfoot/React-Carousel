import React, { Component } from "react";
import PropTypes from "prop-types";

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      overRide: false,
      translate: 0,
      translation: 0
    };

    this.carouselRef = React.createRef();
    this.indicatorsRef = React.createRef();
    this.resetCarousel = this.resetCarousel.bind(this);
    this.scroll = this.scroll.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
    this.handleScrolling = this.handleScrolling.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.resetCarousel);
    this.carouselRef.current.scrollLeft = this.carouselRef.current.offsetWidth;
    this.setState(() => ({
      width: this.carouselRef.current.offsetWidth,
      translate:
        (parseFloat(window.getComputedStyle(this.indicatorsRef.current).width) /
          5) *
        2,
      translation:
        parseFloat(window.getComputedStyle(this.indicatorsRef.current).width) /
        5
    }));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.resetCarousel);
  }

  resetCarousel() {
    this.setState(() => ({
      index: 0,
      translate:
        (parseFloat(window.getComputedStyle(this.indicatorsRef.current).width) /
          5) *
        2,
      translation:
        parseFloat(window.getComputedStyle(this.indicatorsRef.current).width) /
        5
    }));
    this.carouselRef.current.scrollLeft = this.carouselRef.current.offsetWidth;
  }

  scroll(dir) {
    dir === "left"
      ? (this.carouselRef.current.scrollLeft -= this.props.children[0].ref.current.offsetWidth)
      : (this.carouselRef.current.scrollLeft += this.props.children[0].ref.current.offsetWidth);
  }

  scrollTo(index) {
    this.carouselRef.current.scrollLeft =
      parseInt(this.props.children[0].ref.current.offsetWidth) * index;
    this.setState(() => ({
      overRide: true,
      translate:
        this.state.translate +
        this.state.translation * (this.state.index - index + 1)
    }));
  }

  handleScrolling() {
    let overRide = this.state.overRide;
    const scrollPosition =
      this.carouselRef.current.scrollLeft /
        this.props.children[0].ref.current.offsetWidth -
      1;
    if (scrollPosition === -1) {
      this.scrollTo(this.props.children.length);
      this.setState({
        translate: -(this.props.children.length - 4) * this.state.translation
      });
      overRide = true;
    }

    if (scrollPosition === this.props.children.length) {
      this.scrollTo(1);
      this.setState({ translate: this.state.translation });
      overRide = true;
    }

    if (!overRide) {
      this.state.index < Math.round(scrollPosition) &&
        this.setState({
          translate: this.state.translate - this.state.translation
        });
      this.state.index > Math.round(scrollPosition) &&
        this.setState({
          translate: this.state.translate + this.state.translation
        });
    }

    this.setState({
      index: Math.round(scrollPosition),
      overRide: false
    });
  }

  render() {
    const { children, counter, buttons, indicators } = this.props;

    return (
      <div className="carouselContainer">
        <div
          className="carousel mb-0"
          ref={this.carouselRef}
          onScroll={this.handleScrolling}
        >
          {children[children.length - 1]}
          {children}
          {children[0]}
        </div>
        {buttons && (
          <React.Fragment>
            <label className="left" onClick={() => this.scroll("left")}>
              <svg
                aria-hidden="true"
                role="presentation"
                fill="currentColor"
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
                fill="currentColor"
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
          <ol className="indicators" ref={this.indicatorsRef}>
            {children.map((img, index) => {
              return (
                <li
                  className="indicator"
                  style={{
                    transform: `translateX(${
                      children.length > 5 ? this.state.translate : "0"
                    }px`,
                    backgroundImage: `url(${img.ref.current &&
                      img.ref.current.children[0].src})`,
                    opacity: `${this.state.index === index ? "1" : ""}`,
                    Animation: "indicatorsMove 1s"
                  }}
                  key={index}
                  onClick={() => this.scrollTo(index + 1)}
                />
              );
            })}
          </ol>
        )}
        {counter && (
          <div className="mt-2 test">
            {(children.length === this.state.index
              ? children.length - 1
              : this.state.index < 1
              ? 0
              : this.state.index) + 1}
            /{children.length}
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
