import React from 'react';
import {Layout} from 'antd'

function AppFooter() {
  const { Footer } = Layout;

  let handleClick = ()=>{
    React.$modal.confirm(()=>{
      console.log("Clicked Okay");
    }, ()=>{
      console.log("Clicked Cancel");
    })
  }

  return (
    <>
      <Footer className="app-footer">
        <div className="footer-info">
          <input type="button" value="Click Me!!" onClick={()=> handleClick("This is globale notification")}/>
          <span><strong>Email:</strong> seanli9018@gmail.com; <strong>Phone:</strong> 312-825-9982</span>
        </div>
      </Footer>
    </>
  )
}
export default AppFooter;