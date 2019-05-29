import React, { Component } from "react";
import PropTypes from "prop-types";
import Youtube from "react-youtube";

const videos = [];

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      overRide: false,
      translate: 0,
      translation: 0,
      videos: []
    };

    this.carouselRef = React.createRef();
    this.setCarousel = this.setCarousel.bind(this);
    this.scroll = this.scroll.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
    this.handleScrolling = this.handleScrolling.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.setCarousel);
    this.setCarousel();
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.setCarousel);
  }

  setCarousel() {
    this.setState(() => ({
      index: 0,
      translate: (this.carouselRef.current.offsetWidth / 7) * 3,
      translation: this.carouselRef.current.offsetWidth / 7
    }));
    this.carouselRef.current.scrollLeft = this.carouselRef.current.offsetWidth;
  }

  scroll(dir) {
    dir === "left"
      ? (this.carouselRef.current.scrollLeft -= this.carouselRef.current.offsetWidth)
      : (this.carouselRef.current.scrollLeft += this.carouselRef.current.offsetWidth);
  }

  scrollTo(index) {
    this.carouselRef.current.scrollLeft =
      parseInt(this.carouselRef.current.offsetWidth) * index;
    this.setState(() => ({
      overRide: true,
      translate:
        this.state.translate +
        this.state.translation * (this.state.index - index + 1)
    }));
  }

  handleScrolling() {
    videos.forEach(x => x.pauseVideo());
    let overRide = this.state.overRide;
    const scrollPosition =
      this.carouselRef.current.scrollLeft /
        this.carouselRef.current.offsetWidth -
      1;
    if (scrollPosition === -1) {
      this.scrollTo(this.props.imgs.length);
      this.setState({
        translate: -(this.props.imgs.length - 5) * this.state.translation
      });
      overRide = true;
    }

    //Number.isInteger(this.carouselRef.current.scrollLeft / this.props.imgs[0].ref.current.offsetWidth) &&
    //  trackingHelpers.track(null, 'scroll', 'Carousel', `imgs ${scrollPosition + 1}`)

    if (scrollPosition === this.props.imgs.length) {
      this.scrollTo(1);
      this.setState({
        translate: (this.carouselRef.current.offsetWidth / 7) * 2
      });
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
    const { imgs, counter, buttons, indicators } = this.props;
    const fisrtImg = imgs[0];
    const lastImg = imgs[imgs.length - 1];
    return (
      <div className="carouselContainer">
        <div
          className="carousel mb-0"
          onScroll={this.handleScrolling}
          ref={this.carouselRef}
        >
          <img src={lastImg.src} />
          {imgs.map((img, index) => {
            return !img.id ? (
              <img
                onLoad={() => {
                  this.scrollTo(1);
                }}
                src={img.src}
              />
            ) : (
              <Youtube
                videoId={img.id}
                containerClassName="videoContainer"
                opts={{
                  height: "100%",
                  width: "100%",
                  playerVars: {
                    autoplay: this.state.index === index
                  }
                }}
                onReady={e => videos.push(e.target)}
              />
            );
          })}
          <img src={fisrtImg.src} />
          {counter && (
            <div className="counter">
              {`${(imgs.length === this.state.index
                ? imgs.length - 1
                : this.state.index < 1
                ? 0
                : this.state.index) + 1} of ${imgs.length}`}
            </div>
          )}
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
            {imgs.map((img, index) => {
              return (
                <li
                  className="indicator"
                  style={{
                    transform: `translateX(${
                      imgs.length > 5 ? this.state.translate : "0"
                    }px`,
                    backgroundImage: `url(${img.src})`,
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
      </div>
    );
  }
}

Carousel.propTypes = {
  buttons: PropTypes.bool,
  indicators: PropTypes.bool
};

export default Carousel;
