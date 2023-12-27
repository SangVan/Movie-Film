import React, { Component, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import Film from "../Film/Film";
import Fim_Flips from "../Film/Fim_Flips";
import styleSlick from "./MultipleRowSlick.module.css";

import {
  SET_FILM_DANG_CHIEU,
  SET_FILM_SAP_CHIEU,
} from "../../redux/actions/types/QuanLyPhimType";
import { CSSTransition } from "react-transition-group";
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block", top: "45%" }}
      onClick={onClick}
    ></div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styleSlick["slick-prev"]}`}
      style={{ ...style, display: "block", left: "-62px", top: "45%" }}
      onClick={onClick}
    ></div>
  );
}


const MultipleRowSclick = (props) => {

  const dispatch = useDispatch();
  const { dangChieu, sapChieu } = useSelector(state => state.QuanLyPhimReducer);

  let activeClassDC = dangChieu === true ? 'active_Film ' : 'none_active_Film';

  let activeClassSC = sapChieu === true ? 'active_Film ' : 'none_active_Film';
  const renderFilms = () => {
    return props.arrFilm.slice(0, 12).map((item, index) => {
      // return <div className={`${styleSlick['width-item']}`} key={index}>
      //   {/* <Film phim={item}/> */}
      //   <Fim_Flips />
      // </div>

      return <div className="mt-0" style={{ marginLeft: '3px' }} key={index}>
        {/* <Fim_Flips item={item} /> */}
        <Fim_Flips item={item} />
      </div>

    })
  }

  const settings = {
    className: "center variable-width",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1.5,
    speed: 500,
    rows: 2,
    slidesPerRow: 2,
    variableWidth: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />
  };
  return (
    <div className="text-center">
      {/* <h2>Multiple Rows</h2> */}
      <button className={`${styleSlick[activeClassDC]} px-8 py-3 font-semibold rounded bg-gray-800 text-white-100 mr-2 ho`} onClick={() => {
        const action = { type: SET_FILM_DANG_CHIEU }
        dispatch(action);
      }}>Phim đang chiếu</button>
      <button className={`${styleSlick[activeClassSC]} px-8 py-3 font-semibold rounded bg-white text-gray-800 border-gray-800 border`} onClick={() => {
        const action = { type: SET_FILM_SAP_CHIEU }
        dispatch(action);
      }}>Phim sắp chiếu</button>
      <Slider {...settings}>
        {renderFilms()}
      </Slider>

    </div>
  );
}

export default MultipleRowSclick;