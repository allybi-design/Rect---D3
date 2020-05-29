import React, { useState } from 'react';
import TreeChart from "./TreeChart"

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

  const [data, setData] = useState(initData)

  return (
    <div className="container">
      <h1>Animated Tree Chart</h1>
      <TreeChart data={data} />
      <button onClick={() => setData(initData)}>Updata data</button>

    </div>
  )
}

export default App
