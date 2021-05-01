import React, {useState} from 'react';
import PropTypes from 'prop-types'

//import utils string filters
import { capString } from '../../utils/stringFilter';

// import component
import LazyImage from '../image/LazyImage'

function MakeupItem(props) {
  // get props
  const handleClick = props.handleClick;
  const makeupItem = props.makeupItem;
  const { name, image_link, brand, category, description, tag_list, product_colors } = makeupItem;

  // init state
  const [display, setDisplay] = useState(false)

  //prepare data string using capString filter
  let strArr = [name, brand, category, description];
  const [fName, fBrand, fCategory, fDescription] = capString(strArr);
  let tagArr = [...tag_list];
  const fTags = capString(tagArr);

  //prepare color circle data
  let productColors = product_colors.slice(0, 10);

  //prepare makeup tag element
  const tagElement = fTags && fTags.map(tag => {
    return <span className="makeup-tag makeup-light-text" key={tag}>{tag}</span>
  })

  //prepare makeup detailed info element
  const makeupDetailElement =
    <div className="makeup-details">
      <span className="makeup-title">{fName}</span>
      <div className="makeup-tags">
        {tagElement}
      </div>
      <span className="makeup-length makeup-light-text">{fDescription && (fDescription.length>=50?fDescription.substr(0, 50) + "..." : fDescription)}</span>
    </div>

  //prepare makeup color circles element
  const makeupColorElement =
    <div className="makeup-colors">
      {productColors.map((color, index) => {
        return <div className="makeup-color" key={color.colour_name + index} style={{backgroundColor: color.hex_value}}></div>
      })}
    </div>


  // render
  return (
    <>
      {
        !!props.makeupItem &&
        <li className="makeup-item" onClick={handleClick}>
            {/* makeup image element */}
            <LazyImage src={image_link} alt={[fBrand,fCategory, fName]} className="makeup-image"/>
            {/* Makeup detail info */}
            {display && makeupDetailElement}
            {/* Makeup bar info */}
            <div className="makeup-info">
              <span className="makeup-title">{fName}</span>
              <span className="makeup-light-text makeup-type">{fBrand}</span>
              {/* Makeup color element */}
              {makeupColorElement}
            </div>
            {/* Hover cover div */}
            <div
              className="makeup-item-cover"
              onMouseOver={() => setDisplay(true)}
              onMouseOut={() => setDisplay(false)}
            >
            </div>
        </li>
      }
    </>
  )
}

// specify Button component prop types
MakeupItem.propTypes = {
  makeupItem: PropTypes.object.isRequired,
  handleClick: PropTypes.func
}

MakeupItem.defaultProps = {
}

export default MakeupItem;