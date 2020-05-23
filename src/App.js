import React, { useState } from 'react';
import RacingBarChart from "./RacingBarChart"
import useInterval from "./useInterval"
import getRandIndex from "./getRandIndex";

const App = () => {
  const initData = [
    {
      name: "alpha",
      value: 5,
      color: "#e68122"
    },
    {
      name: "bravo",
      value: 5,
      color: "#e3e622"
    },
    {
      name: "charlie",
      value: 5,
      color: "#cc0000"
    },
    {
      name: "delta",
      value: 5,
      color: "#7aff83"
    },
    {
      name: "echo",
      value: 5,
      color: "#7ab1ff"
    },
    {
      name: "foxtrot",
      value: 5,
      color: "#ff7afd"
    }
  ]
  const [data, setData] = useState(initData)
  const [iteration, setIteration] = useState(0)
  const [start, setStart] = useState(false)

  useInterval(() => {
    if (start) {
      const rndIndex = getRandIndex(data)
      setData(data.map((entry, index) => index === rndIndex
        ? {
          ...entry,
          value: entry.value + 10
        }
        : entry
      )
      )
      setIteration(iteration + 1)
    }
  }, 500)

  const reset = () => {
    setStart(false)
    setIteration(0)
    setData(initData)
  }

  return (
    <div className="container">
      <h1>Racing Bar Chart</h1>
      <RacingBarChart data={data} />
      <button onClick={() => setStart(!start)}>{start ? "Stop Race" : "Start Race"}</button>
      <button onClick={() => reset()}>RESET</button>
      <p>Iterations: {iteration}</p>
    </div>
  )
}

export default App
