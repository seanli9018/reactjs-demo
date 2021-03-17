import React from 'react';
import {Layout} from 'antd'

function AppFooter() {
  const { Footer } = Layout;

  return (
    <>
      <Footer className="app-footer">
        <div className="footer-info">
          <span><strong>Email:</strong> seanli9018@gmail.com; <strong>Phone:</strong> 312-825-9982</span>
        </div>
      </Footer>
    </>
  )
}
export default AppFooter;