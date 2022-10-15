import { useEffect, useState } from "react";
import "../styles/carousel.css";
import { useSelector } from "react-redux";

interface Props {
  images: string[];
  autoPlay?: boolean;
  showButtons?: boolean;
}

const Carousel = (props: Props) => {
  //console.log("Llegan props a carrusel", props.images[0]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState();
  const [loaded, setLoaded] = useState(false);

  /* Setting the first image of the array as the selected image. */
  useEffect(() => {
    if (props.autoPlay || !props.showButtons) {
      const interval = setInterval(() => {
        selectNewImage(selectedIndex, props.images[0]);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  /* Setting the first image of the array as the selected image. */
  useEffect(() => {
    let currentSlider = "";

    let allImages = props.images;
    currentSlider = allImages.map(function (image, index, array) {
      return image[0];
    });

    setSelectedImage(currentSlider);
  }, [props.images]);

  /**
   * "If the selectedIndex is less than the length of the images array, then increment the selectedIndex
   * by 1, otherwise set the selectedIndex to 0."
   *
   * The nextIndex variable is the value that is used to set the selectedIndex state.
   */
  const selectNewImage = (index: number, images: [], next = true) => {
    console.log(selectedImage);
    setLoaded(false);
    setTimeout(() => {
      const condition = next
        ? selectedIndex < images.length - 1
        : selectedIndex > 0;
      const nextIndex = next
        ? condition
          ? selectedIndex + 1
          : 0
        : condition
        ? selectedIndex - 1
        : images.length - 1;
      setSelectedImage(images[nextIndex]);
      setSelectedIndex(nextIndex);
    }, 1500);
  };

  const previous = () => {
    selectNewImage(selectedIndex, props.images[0], false);
  };

  const next = () => {
    selectNewImage(selectedIndex, props.images[0]);
  };
  return (
    <>
      <div className="mainSlider">
        <img
          src={selectedImage}
          alt="Gentleman"
          className={`${loaded} ? "loaded" : "" carouselImg`}
          onLoad={() => setLoaded(true)}
        />
        <div className="flex items-center flex-row mt-4">
          {props.showButtons ? (
            <>
              <button
                className="absolute top-2/4 text-white bg-sky-400 p-2 leftButton"
                onClick={previous}
              >
                {"<"}
              </button>
              <button
                className="absolute top-2/4 text-white bg-sky-400 p-2 rightButton"
                onClick={next}
              >
                {">"}
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Carousel;
