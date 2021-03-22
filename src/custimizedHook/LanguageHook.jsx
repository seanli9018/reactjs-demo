import React, { useEffect, useState } from 'react';

export default function useLanguagePageText(locale) {
  const [pageText, setPageText] = useState({});

    // get lang data
  useEffect(()=>{
    // after componentDidMount and componentDidUpdate, we need to get langData file and set page text
    React.$lang.languageLoader().then((langData)=>{
      setPageText(langData.default);
    })
  }, [locale])

  return pageText;
}