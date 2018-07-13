import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "../slick-theme.css";
import Slider from "react-slick";


export default class ImageSlider extends Component {
  render() {
    const settings = {
      dots: false,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
    };
    const slides = this.props.images.map((elem) => {
      return (<div className="slide" key={elem}>
        <img className="slideIMG" src={require(`../img/${elem}.jpg`)} alt={elem}/>
      </div>);
    });
    return (
      <div className="slider" onClick={this.props.handleChangeImage}>
        <Slider {...settings}>
          {slides}
        </Slider>
      </div>
    );
  }
}