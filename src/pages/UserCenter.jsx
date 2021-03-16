import React from 'react';

class UserCenter extends React.Component {
  render() {
    console.log(this.props.location);

    const query = new URLSearchParams(this.props.location.search);
    console.log(query.get("name"));
    console.log(query.get("age"));

    return (
      <div>
        This is User Center page
      </div>
    );
  }
}

export default UserCenter;