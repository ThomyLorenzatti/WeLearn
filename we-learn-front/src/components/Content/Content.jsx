import React, { useState, useEffect } from 'react';
import './Content.css';
import classNames from 'classnames';

const IMAGE_PARTS = 4;
let changeTO = null;
const AUTOCHANGE_TIME = 4000;

function CitiesSlider(props) {
  const [activeSlide, setActiveSlide] = React.useState(-1);
  const [prevSlide, setPrevSlide] = React.useState(-1);
  const [sliderReady, setSliderReady] = React.useState(false);

  React.useEffect(() => {
    if (props) {
      runAutochangeTO();
      setTimeout(() => {
        setActiveSlide(0);
        setSliderReady(true);

      }, 0);
    }
    return () => {
      window.clearTimeout(changeTO);
    };
  }, [props.slides]);

  const runAutochangeTO = () => {
    changeTO = setTimeout(() => {
      changeSlides(1);
      runAutochangeTO();
    }, AUTOCHANGE_TIME);
  };

  const changeSlides = change => {
    window.clearTimeout(changeTO);
    const { length } = props.slides;
    const prevSlide = activeSlide;
    let activeSlideNew = prevSlide + change;
    if (activeSlideNew < 0) activeSlideNew = length - 1;
    if (activeSlideNew >= length) activeSlideNew = 0;
    setActiveSlide(activeSlideNew);
    setPrevSlide(prevSlide);
  };

  return (
    React.createElement("div", { className: classNames('slider', { 's--ready': sliderReady }) }, 
    React.createElement("p", { className: "slider__top-heading" }, "Decentralized Formation Platform"), 
    React.createElement("div", { className: "slider__slides" },
    props.slides.map((slide, index) => 
    React.createElement("div", {
      className: classNames('slider__slide', { 's--active': activeSlide === index, 's--prev': prevSlide === index }),
      key: slide.city }, 
    React.createElement("div", { className: "slider__slide-content" }, 
    React.createElement("h3", { className: "slider__slide-subheading" }, slide.country || slide.city), 
    React.createElement("h2", { className: "slider__slide-heading" }, slide.city), 
    React.createElement("p", { className: "slider__slide-readmore" }, "")),
    React.createElement("div", { className: "slider__slide-parts" },
    [...Array(IMAGE_PARTS).fill()].map((x, i) => 
    React.createElement("div", { className: "slider__slide-part", key: i }, 
    React.createElement("div", { className: "slider__slide-part-inner", style: { backgroundImage: `url(${slide.img})` } }))))))), 
    React.createElement("div", { className: "slider__control", onClick: () => changeSlides(-1) }), 
    React.createElement("div", { id: "skipButton", className: "slider__control slider__control--right", onClick: () => changeSlides(1) })));
}

const slides = [
{
  city: 'First Decentralized Learning Platform',
  country: 'What is WeLearn?',
  img: 'https://www.getsmarter.com/blog/wp-content/uploads/2019/02/SLOT-20-Q4_header_2019.02.05_v2.png' },
  
  {
  city: 'Be rewarded for your knowledge',
  country: 'Teach to Learn',
  img: 'https://twin-cities.umn.edu/sites/twin-cities.umn.edu/files/Brain%20900x600.jpg' },

{
  city: 'Authentic and unique certificates',
  country: 'Get certified',
  img: 'https://images.squarespace-cdn.com/content/v1/5468d9f5e4b07d3571276e84/1595228911869-NMBTHU9VD9EZVA1WXI18/LARGE-Home-117302880_m_Custom.jpg?format=1500w' }];

  
function Content() {
    const Slider = React.createElement(CitiesSlider, { slides: slides });
  return (Slider);
}

export default Content