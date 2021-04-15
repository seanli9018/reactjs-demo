import { useState, useEffect, useRef } from 'react';

// hook for obtaining hook's previous state
export function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
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

// hook for getting element width and height
export function useEleDimensions(element) {
  const [elementDimensions, setElementDimensions] = useState({
    elementWidth: 0,
    elementHeight: 0
  });

  // get list element width
  useEffect(() => {
    // set state after first time mounted
    if(element.current) {
      setElementDimensions({
        elementWidth: element.current.offsetWidth,
        elementHeight: element.current.offsetHeight
      });
    }

  }, [element.current])

  return elementDimensions;
}

// hook for getting element position scroll status (scrollTop and scrolling)
export function useScrollTop(e) {
  const [ scrollStatus, setScrollStatus ] = useState({scrollTop: 0, scrolling: false});
	const preScrollTop = usePrevious(scrollStatus.scrollTop);

  useEffect(() => {
    const onScroll = () => {
      setScrollStatus({
        scrollTop: window.pageYOffset, // distance between visible screen's top to page top
        scrolling: window.pageYOffset > preScrollTop
      });
    };
    window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
  }, [scrollStatus])

	return scrollStatus;
}

// hook for getting element to body top distance after first time mounted
// (not the distance to parent element, no dependencies, which means will not update after component updated)
export function useEleDistanceToTop (element) {
  const [distanceToTop, setDistanceToTop] = useState(0);

  useEffect(() => {
    let eleDistanceToTop = element ? (window.pageYOffset + element.current.getBoundingClientRect().top) : 0;
    setDistanceToTop(eleDistanceToTop);
  }, []);

  return distanceToTop;
}