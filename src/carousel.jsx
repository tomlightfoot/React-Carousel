import React, { Component } from "react";
import PropTypes from "prop-types";
import Youtube from "react-youtube";
import classNames from "classnames";

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      overRide: false,
      translate: 0,
      translation: 0
    };

    this.videos = [];
    this.carouselRef = React.createRef();
    this.scroll = this.scroll.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
    this.handleScrolling = this.handleScrolling.bind(this);
  }

  componentDidMount() {
    this.setState(() => ({
      translate: (this.carouselRef.current.offsetWidth / 7) * 3,
      translation: this.carouselRef.current.offsetWidth / 7
    }));
    this.carouselRef.current.scrollLeft =
      this.carouselRef.current.offsetWidth * (this.props.startPosition || 1);
  }

  scroll(dir) {
    dir === "left"
      ? (this.carouselRef.current.scrollLeft -= this.carouselRef.current.offsetWidth)
      : (this.carouselRef.current.scrollLeft += this.carouselRef.current.offsetWidth);
  }

  scrollTo(img) {
    this.carouselRef.current.scrollLeft =
      this.carouselRef.current.offsetWidth * img;
  }

  handleScrolling() {
    this.videos.forEach(x => x.pauseVideo());
    const scrollPosition =
      this.carouselRef.current.scrollLeft /
        this.carouselRef.current.offsetWidth -
      1;
    if (scrollPosition === -1) this.scrollTo(this.props.imgs.length);
    if (scrollPosition === this.props.imgs.length) this.scrollTo(1);
    if (Math.round(scrollPosition) !== this.state.index) {
      this.setState({
        index: Math.round(scrollPosition),
        translate: this.state.translation * (3 - Math.round(scrollPosition))
      });
    }
  }

  render() {
    const {
      imgs,
      counter,
      buttons,
      indicators,
      onClick,
      imgOnly,
      preview
    } = this.props;
    const imgSet = [imgs[imgs.length - 1], ...imgs, imgs[0]];
    return (
      <div className="carouselContainer">
        <div
          className="carousel mb-0"
          onClick={() => onClick(this.state.index + 1)}
          onScroll={this.handleScrolling}
          ref={this.carouselRef}
        >
          {imgSet.map((img, index) => {
            return !img.id || imgOnly ? (
              <div className="imgContainer">
                <img alt="Smiley face" src={img.src} />
              </div>
            ) : (
              <Youtube
                videoId={img.id}
                containerClassName="videoContainer"
                opts={{
                  height: "100%",
                  width: "100%",
                  playerVars: {
                    autoplay: this.props.startPosition - 1 === index && 1
                  }
                }}
                onReady={e => this.videos.push(e.target)}
              />
            );
          })}
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
          <ol
            className={`${preview ? "preview" : "pip"}-indicators`}
            ref={this.indicatorsRef}
          >
            {imgs.map((img, index) => {
              const indicatorClassNames = classNames(
                `${preview ? "preview" : "pip"}-indicator`,
                { "active-indicator": this.state.index === index }
              );
              return (
                <li
                  className={indicatorClassNames}
                  style={{
                    transform: `translateX(${
                      imgs.length > 7 && preview ? this.state.translate : "0"
                    }px`,
                    backgroundImage: `${preview ? `url(${img.src})` : ""}`
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
