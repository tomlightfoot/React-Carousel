import React, { Component } from "react";
import "./styles.css";

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.imgRefs = [];

    this.carouselRef = React.createRef();
    this.setImgRef = this.setImgRef.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
    this.scroll = this.scroll.bind(this);
    this.offsetWidth = 0;
  }

  componentDidMount() {
    this.offsetWidth = this.props.children[0].ref.current.offsetWidth;
  }

  setImgRef(img) {
    this.imgRefs.push(img);
  }

  scrollTo(index) {
    this.carouselRef.current.scrollLeft = parseInt(this.offsetWidth) * index;
  }

  scroll(dir) {
    dir === "left"
      ? (this.carouselRef.current.scrollLeft -= this.offsetWidth)
      : (this.carouselRef.current.scrollLeft += this.offsetWidth);
  }

  render() {
    return (
      <div className="carouselContainer">
        <div className="carousel mb-0" ref={this.carouselRef}>
          {this.props.children}
          {this.props.buttons && (
            <React.Fragment>
              <button className="left" onClick={() => this.scroll("left")}>
                Left
              </button>
              <button className="right" onClick={() => this.scroll("right")}>
                Right
              </button>
            </React.Fragment>
          )}

          {this.props.indicators && (
            <ol className="carousel-indicators">
              {this.props.children.map((img, index) => {
                return <li onClick={() => this.scrollTo(index)} />;
              })}
            </ol>
          )}
        </div>
      </div>
    );
  }
}

export default Carousel;
