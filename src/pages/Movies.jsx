import React, {useState, useEffect} from 'react';
//import {connect} from "react-redux";

function Movies(props) {
  //const query = new URLSearchParams(props.location.search);
  //const userId = props.location.state ? props.location.state.userId : '';
  const [movieData, setMovieData] = useState({});

  useEffect((movieData) => {
    React.$http.getMovies('', {s: 'Avengers Endgame', page: '1', r: 'json'}).then(res => {
      console.log(!!res.data ? res.data : "");
    }).catch(err => {
      console.log(err)
    })
  }, [movieData])

  return (
    <div>
      <h1>Movie List</h1>
    </div>
  )
}


// export List component
export default Movies;