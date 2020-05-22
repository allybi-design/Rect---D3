import React, { useState } from 'react';
import BarChart from "./BarChart"

const App = () => {

  const [data, setData] = useState([3, 25, 30, 45, 60, 30, 45, 60])

  const addNewData = () => {
    setData([...data, Math.round((Math.random() * 100))])
  }


  return (
    <div className="container">
      <BarChart data={data} />
      <button onClick={() => setData(data.map(value => value + 5))}>Inc data by 5</button>
      <button onClick={() => addNewData()}>Add New Data</button>
    </div>
  )
}

export default App
