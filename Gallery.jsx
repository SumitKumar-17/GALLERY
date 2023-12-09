import React, { useEffect, useRef } from "react";
import imageData from "../temp-imgs/img_data_gallery";
import "./gallery.css";

const Gallery = () => {
  const url = require('./dog.jpg');
  const progressRef = useRef(50);
  const intervalIdRef = useRef(null);
  const itemsRef = useRef([]);

  const speedWheel = 0.02;
  const autoScrollInterval = 1150;

  const getZindex = (array, index) =>
    array.map((_, i) =>
      index === i ? array.length : array.length - Math.abs(index - i)
    );

  const displayItems = (item, index, active) => {
    const zIndex = getZindex(itemsRef.current, active)[index];
    item.style.setProperty("--zIndex", zIndex);
    item.style.setProperty("--active", (index - active) / itemsRef.current.length);
  };

  const animate = () => {
    progressRef.current += 1;
    progressRef.current = progressRef.current > 100 ? 0 : progressRef.current;
    const active = Math.floor((progressRef.current / 100) * (itemsRef.current.length - 1));

    itemsRef.current.forEach((item, index) => displayItems(item, index, active));
  };

  const startAutoScroll = () => {
    intervalIdRef.current = setInterval(animate, autoScrollInterval);
  };

  const stopAutoScroll = () => {
    clearInterval(intervalIdRef.current);
  };

  useEffect(() => {
    itemsRef.current = Array.from(document.querySelectorAll(".carousel-item"));

    document.addEventListener("mousewheel", (e) => {
      const wheelProgress = e.deltaY * speedWheel;
      progressRef.current += wheelProgress;
      animate();
      stopAutoScroll();
    });

    document.addEventListener("mousedown", () => {
      startAutoScroll();
    });

    document.addEventListener("mousemove", () => {
      stopAutoScroll();
    });

    document.addEventListener("mouseup", () => {
      startAutoScroll();
    });

    document.addEventListener("touchstart", () => {
      startAutoScroll();
    });

    document.addEventListener("touchmove", () => {
      stopAutoScroll();
    });

    document.addEventListener("touchend", () => {
      startAutoScroll();
    });

    startAutoScroll();

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, []); 
  return (
    <div className="carousel">
      {imageData.map((index) => (
        <div className="carousel-item" key={index}>
          <div className="carousel-box">
            <img src={url} alt="" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery;
