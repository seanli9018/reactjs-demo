import React from 'react';
import Other from '../components/Other'

class Mine extends React.Component {
  render() {
    const query = new URLSearchParams(this.props.location.search);
    console.log(query.get("name"))
    console.log(query.get("age"))

    return (
      <div>
        This is User Page
        <Other />
      </div>
    );
  }
}

export default Mine;