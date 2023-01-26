import {useEffect, useState, useRef} from 'react';

function MainPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateValue, setTranslateValue] = useState(0);
  const [automobiles, setAutomobiles] = useState([]);

  const getData = async () => {
    const response = await fetch('http://localhost:8100/api/automobiles/');
    if (response.ok) {
      const data = await response.json()
      console.log(data.autos)
      setAutomobiles(data.autos)
    }
  }

  const slideWidth = () => {
    if(slideRef && slideRef.current){
      return slideRef.current.clientWidth;
    }
    return 0;
  }

  const handleNextSlide = () => {
    if (currentIndex === automobiles.length - 1) {
      setCurrentIndex(0);
      setTranslateValue(0);
    } else {
      setCurrentIndex(currentIndex + 1);
      setTranslateValue(translateValue - (slideWidth()))
    }
  };

  const handlePrevSlide = () => {
    if (currentIndex === 0) {
      setCurrentIndex(automobiles.length - 1);
      setTranslateValue(-(slideWidth() * (automobiles.length - 1)));
    } else {
      setCurrentIndex(currentIndex - 1);
      setTranslateValue(translateValue + (slideWidth()));
    }
  };

  const slideRef = useRef(null);

  useEffect(() => {
    if(slideRef.current){
      slideWidth.current = slideRef.current.clientWidth;
    }
  }, [automobiles]);
  
  useEffect(() => {
    getData()
  }, []);

  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">CarCars</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          The premiere solution for automobile dealership
          management!
        </p>
        <div className="carousel-container">
          <div
            className="carousel-slider"
            style={{
              transform: `translateX(${translateValue}px)`,
              transition: "transform ease-out 0.45s"
            }}
          >

          </div>
          <div className="carousel-arrows">
            <div className="carousel-arrow prev" onClick={handlePrevSlide}>
              <i className="fas fa-arrow-left" />
            </div>
            <div className="carousel-arrow next" onClick={handleNextSlide}>
              <i className="fas fa-arrow-right" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage
