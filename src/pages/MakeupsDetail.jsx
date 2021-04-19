import React, {useEffect} from 'react';

// import components
import LazyImage from "../components/image/LazyImage";
import ButtonDark from "../components/button/ButtonDark";

function MakeupsDetail(props) {
  let makeupData = null;
  if (props.location.state) {
    makeupData = props.location.state.data;
    localStorage.setItem(makeupData.id, JSON.stringify(makeupData))
  }

  // if there is no data passing in, need to using item id to request data from server
  // however, the public api doesn't provide the id requesting. we store and get data from local storage.
  if(!makeupData && props.location.pathname) {
    const reg = /\/(\d+)$/;
    const id = props.location.pathname.match(reg)[1];
    makeupData = JSON.parse(localStorage.getItem(id));
  }

  //prepare makeup color circles element
  const makeupColorElement =
    <div className="makeup-colors">
      {makeupData.product_colors.map((color, index) => {
        return <span key={color.colour_name + index}>
          <span className="makeup-color" style={{backgroundColor: color.hex_value}}></span>
          <span className="color-name">{color.colour_name}</span>
        </span>
      })}
    </div>

  //prepare makeup tag element
  const tagElement = makeupData.tag_list.map(tag => {
    return <span className="makeup-tag makeup-light-text" key={tag}>{tag}</span>
  })

  // handle Add to Cart btn
  const handleAddToCartBtn = () => {
    console.log("clicked")
  }

  // handle Add to Cart btn
  const handlePurchaseBtn = () => {
    console.log("purchase clicked")
  }

  // estimated delivery date
  const date = new Date();
  console.log(date)

  // render
  return (
    <>
      {
        !!makeupData &&
        <div className="main-wrapper">
          <div className="detail-wrapper">
            <div className="leftWrapper">
              <LazyImage src={makeupData.image_link} className="detail-image" alt={[makeupData.brand, makeupData.category]}/>
              <div className="product-info">
                <h1>{ makeupData.name }</h1>
                <p><strong>Brand: </strong>{makeupData.brand}</p>
                <p><strong>Rating: </strong>{makeupData.rating ? makeupData.rating : "No rating available"}</p>
                <div className="divider"></div>
                <p><strong>Colors: </strong></p>
                { makeupColorElement }
                <div className="divider"></div>
                { tagElement }
                <div className="divider"></div>
                <p><strong>Price: </strong>${makeupData.price}</p>
              </div>
            </div>
            <div className="rightWrapper">
              <select style={{width: "100%", padding: "5px", borderRadius: "5px"}} defaultValue="0">
                <option value="0" disabled hidden>Qty</option>
                <option value="1">1</option>
                <option value="2">2</option>
              </select>
              <ButtonDark value="Add to Cart" fullWidth={true} onClickFunction={()=>handleAddToCartBtn()}/>
              <ButtonDark value="Purchase" fullWidth={true} onClickFunction={()=>handlePurchaseBtn()}/>
              <p>Estimated Delivery by</p>
            </div>
          </div>
          <div className="content">
            <p><strong>Description: </strong>{makeupData.description}</p>
          </div>
        </div>
      }
    </>
  )
}


// export List component
export default MakeupsDetail;