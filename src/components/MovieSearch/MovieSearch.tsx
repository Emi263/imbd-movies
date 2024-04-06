import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function MovieSearch() {

  const [query, setQuery] = useState("");
  const nav = useNavigate();




  function handleSearch() {
    const splitQuery = query.split(" ").join("+").trim();
    nav("/search/" + splitQuery)
  }



  return (
    <form style={{
      padding: 40,

    }}>
      <input onChange={(event) => setQuery(event.target.value)} type='text' />
      <button onClick={handleSearch}>Search</button>
    </form>
  )
}

export default MovieSearch