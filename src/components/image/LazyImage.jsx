//import react
import React, {useState, useEffect} from 'react';

//import props limitation
import PropTypes from 'prop-types';

function LazyImage(props) {
  // init state: image loading status
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  //prepare props
  const { src, alt, className, onErrorSrc, loadingSrc } = props;

  // load image once DOM mounted
  useEffect(() => {
    const image = new Image();
    // handle load and error;
    const handleLoad = () => {
      setLoaded(true);
    }
    const handleError = () => {
      setError(true);
    }

    image.onload = handleLoad;
    image.onerror = handleError;

    // assign the src from props to image;
    image.src = src;

    return ()=>{
      image.removeEventListener('load', handleLoad);
      image.removeEventListener('error', handleError);
    }
  }, [props.src])


  return (
    <img
      className={className}
      src={error ? onErrorSrc : !loaded ? loadingSrc : src}
      alt={alt.join(" ")}
    />
  )

}

// default props
LazyImage.defaultProps = {
  src: '',
  alt: 'images',
  onErrorSrc: process.env.PUBLIC_URL + '/handleimage/image-not-found.jpg',
  loadingSrc: process.env.PUBLIC_URL + '/handleimage/image-loading.jpg',
  className: 'img'
}

// prop types
LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.array,
  onErrorSrc: PropTypes.string,
  loadingSrc: PropTypes.string,
  className: PropTypes.string
}

export default LazyImage;