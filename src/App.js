import React, { useState } from 'react';
import ForceTreeChart from "./ForceTreeChart"

const App = () => {
  const initData = {
    name: "🧓",
    title: "Grandparent",
    children: [
      {
        name: "🧑",
        title: "Parent 1",
        children: [
          {

            name: "👦",
            title: "Child 1",
          },
          {
            name: "👧",
            title: "Child 2",
          },
          {
            name: "👶",
            title: "Child 3",
          }
        ]
      },
      {
        name: "👩",
        title: "Parent 2",
        children: [
          {

            name: "👦",
            title: "Child 1",
          },
          {
            name: "👧",
            title: "Child 2",
          },
          {
            name: "👶",
            title: "Child 3",
          }
        ]
      }
    ]
  }

  const [data] = useState(initData)

  return (
    <div className="container">
      <h1>Animated Force Tree Chart</h1>
      <ForceTreeChart data={data} />
    </div>
  )
}

export default App
