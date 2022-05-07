// const = { useState, useEffect } = React

const IMAGE_PARTS = 4;
let changeTO = null;
const AUTOCHANGE_TIME = 4000;

function CitiesSlider(props) {
  const [activeSlide, setActiveSlide] = React.useState(-1);
  const [prevSlide, setPrevSlide] = React.useState(-1);
  const [sliderReady, setSliderReady] = React.useState(false);

  React.useEffect(() => {
    // mounted
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

  return /*#__PURE__*/(
    React.createElement("div", { className: classNames('slider', { 's--ready': sliderReady }) }, /*#__PURE__*/
    React.createElement("p", { className: "slider__top-heading" }, "Travelers"), /*#__PURE__*/
    React.createElement("div", { className: "slider__slides" },
    props.slides.map((slide, index) => /*#__PURE__*/
    React.createElement("div", {
      className: classNames('slider__slide', { 's--active': activeSlide === index, 's--prev': prevSlide === index }),
      key: slide.city }, /*#__PURE__*/

    React.createElement("div", { className: "slider__slide-content" }, /*#__PURE__*/
    React.createElement("h3", { className: "slider__slide-subheading" }, slide.country || slide.city), /*#__PURE__*/
    React.createElement("h2", { className: "slider__slide-heading" },
    slide.city.split('').map(l => /*#__PURE__*/React.createElement("span", null, l))), /*#__PURE__*/

    React.createElement("p", { className: "slider__slide-readmore" }, "read more")), /*#__PURE__*/

    React.createElement("div", { className: "slider__slide-parts" },
    [...Array(IMAGE_PARTS).fill()].map((x, i) => /*#__PURE__*/
    React.createElement("div", { className: "slider__slide-part", key: i }, /*#__PURE__*/
    React.createElement("div", { className: "slider__slide-part-inner", style: { backgroundImage: `url(${slide.img})` } }))))))), /*#__PURE__*/






    React.createElement("div", { className: "slider__control", onClick: () => changeSlides(-1) }), /*#__PURE__*/
    React.createElement("div", { className: "slider__control slider__control--right", onClick: () => changeSlides(1) })));


}

const slides = [
{
  city: 'Paris',
  country: 'France',
  img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/paris.jpg' },

{
  city: 'Singapore',
  img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/singapore.jpg' },

{
  city: 'Prague',
  country: 'Czech Republic',
  img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/prague.jpg' },

{
  city: 'Amsterdam',
  country: 'Netherlands',
  img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/amsterdam.jpg' },

{
  city: 'Moscow',
  country: 'Russia',
  img: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/142996/moscow.jpg' }];



ReactDOM.render(React.createElement(CitiesSlider, { slides: slides }), document.getElementById("app"));