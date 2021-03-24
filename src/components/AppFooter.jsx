import React from 'react';

// import from redux
import {connect} from "react-redux";

// import from antd UI
import {Layout} from 'antd'

// import custimazied hook, get language data.
import useLanguagePageText from '../custimizedHook/LanguageHook';

function AppFooter(props) {
  const { Footer } = Layout;
  const { locale } = props

  //get lang data, passing locale to dynamically load lang data based on Redux locale state.
  const pageText = useLanguagePageText(locale);

  return (
    <>
      <Footer className="app-footer">
        <div className="footer-info">
          {
            !!pageText.appFooter && 
            <span><strong>{pageText.appFooter[0]}</strong> seanli9018@gmail.com; <strong>{pageText.appFooter[1] || ''}</strong> 312-825-9982</span>
          }
        </div>
      </Footer>
    </>
  )
}

// get redux state and passing it to component props
const mapStateToProps = (state) => {
  return {
    locale: state.locale
  }
}

// export component
export default connect(mapStateToProps, null)(AppFooter);