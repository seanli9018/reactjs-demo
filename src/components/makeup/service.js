import axiosIns from "../../auth/http";

export const fetchLipStickList = () => {
  return axiosIns.get('?product_type=lipstick')
}

export const fetchNailPolish = () => {
    const url = '?product_type=nail_polish';
    return axiosIns.get(url);
  }

export const fetchMascara = () => {
    const url = '?product_type=mascara';
    return axiosIns.get(url);
  }

export const fetchLipLiner = () => {
    const url = '?product_type=lip_liner';
    return axiosIns.get(url);
  }

export const fetchFoundation = () => {
    const url = '?product_type=foundation';
    return axiosIns.get(url);
  }

export const fetchEyeshadow = () => {
  const url = '?product_type=eyeshadow';
  return axiosIns.get(url);
}

export const fetchEyeliner = () => {
  const url = '?product_type=eyeliner';
  return axiosIns.get(url);
}

export const fetchEyebrow = () => {
  const url = '?product_type=eyebrow';
  return axiosIns.get(url);
}

export const fetchBronzer = () => {
  const url = '?product_type=bronzer';
  return axiosIns.get(url);
}

export const fetchBlush = () => {
  const url = '?product_type=blush';
  return axiosIns.get(url);
}