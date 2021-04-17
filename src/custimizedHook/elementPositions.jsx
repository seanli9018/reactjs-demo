import { useState, useEffect, useRef } from 'react';

// hook for obtaining hook's previous state
export function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	},[value]);
	return ref.current;
}

// internal function for getting visible screen/windows width and height.
function _getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

// hook for getting windows dimensions (width and height)
export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(_getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(_getWindowDimensions());
    }
    // add event listener onResize to window. everytime, after resizing, we re-triger handleResize func to re-setState.
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

// hook for getting element width (Will work on the element height later)
export function useEleDimensions(element) {
  const [ elementWidth, setElementWidth ] = useState(0);

  // get list element width
  useEffect(() => {
    // set state after first time mounted
    const handleUpdateEleWidth = () => {
      if(element.current) {
        setElementWidth(element.current.clientWidth);
      }
    }
    window.addEventListener('resize', handleUpdateEleWidth);
    handleUpdateEleWidth()
    // on Component Will Unmount
    return () => window.removeEventListener('resize', handleUpdateEleWidth);
  }, [element.current])

  return elementWidth;
}

// hook for getting element position scroll status (scrollTop and scrolling)
export function useScrollTop() {
  const [ scrollStatus, setScrollStatus ] = useState({scrollTop: 0, scrolling: false});
	const preScrollTop = usePrevious(scrollStatus.scrollTop);

  useEffect(() => {
    const handleOnScroll = () => {
      setScrollStatus({
        scrollTop: window.pageYOffset, // distance between visible screen's top to page top
        scrolling: window.pageYOffset > preScrollTop
      });
    };
    window.addEventListener('scroll', handleOnScroll);
		return () => window.removeEventListener('scroll', handleOnScroll);
  }, [scrollStatus])

	return scrollStatus;
}

// hook for getting element top to body top distance after first time mounted
// (not the distance to parent element, no dependencies, which means will not update after component updated)
export function useEleDistanceToTop (element) {
  const [distanceToTop, setDistanceToTop] = useState(0);

  useEffect(() => {
    const handleUpdateEleDistanceToTop = () => {
      let eleDistanceToTop = element.current ? (window.pageYOffset + element.current.getBoundingClientRect().top) : 0;
      setDistanceToTop(eleDistanceToTop);
    }
    handleUpdateEleDistanceToTop();
    window.addEventListener('resize', handleUpdateEleDistanceToTop);
    // on Component Will Unmount
    return () => window.removeEventListener('resize', handleUpdateEleDistanceToTop);
  }, []);

  return distanceToTop;
}