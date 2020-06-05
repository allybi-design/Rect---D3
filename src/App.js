import React, { useState } from 'react';
import GeoChart from "./geoChart"
import geoData from "./worldMapGeo.json"

const App = () => {

  const [property, sertProperty] = useState("pop_est")

  return (
    <div className="container">
      <h1>World Map with d3-geo</h1>
      <GeoChart data={geoData} property={property}/>
      <h2>Select a country to highlight</h2>
      <select value={property} onChange={e => sertProperty(e.target.value)}>
        <option value="pop_est">Population</option>
        <option value="name_len">name Length</option>
        <option value="gdp_md_est">GDP</option>
      </select>
    </div>
  )
}

export default App
