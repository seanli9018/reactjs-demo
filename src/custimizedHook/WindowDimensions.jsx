import { useState, useEffect, useRef } from 'react';

// internal function for getting windows width and height.
function _getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

// hook for obtaining hook's previous state
export function usePrevious(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
}

// hook for getting windows demensions (width and height)
export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(_getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(_getWindowDimensions());
    }
    // add event listener onResize to window. everytime, after resizing, we retriger handleResize func to re-setState.
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

// hook for getting scroll status (scrollTop and scrolling)
export function useScrollTop(e) {
  const [ scrollStatus, setScrollStatus ] = useState({scrollTop: 0, scrolling: false});
	const preScrollTop = usePrevious(scrollStatus.scrollTop);

  useEffect(() => {
    const onScroll = () => {
      setScrollStatus({
        scrollTop: window.pageYOffset,
        scrolling: window.pageYOffset > preScrollTop
      });
    };
    window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
  }, [scrollStatus])

	return scrollStatus;
}