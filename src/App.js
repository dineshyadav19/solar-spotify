import React, { useState } from "react"
import { generateImages, processCSV } from "./utils/index.ts"

function CsvReader() {
  const [csvArray, setCsvArray] = useState([])

  const submit = csvFile => {
    const file = csvFile
    const reader = new FileReader()

    reader.onload = function (e) {
      const text = e.target.result
      const newArray = processCSV(text)
      setCsvArray(newArray)
    }

    reader.readAsText(file)
  }

  const generateDynamicImages = () => generateImages(csvArray)

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          rowGap: "1rem",
          marginTop: "4rem",
        }}
      >
        <input
          type="file"
          accept=".csv"
          onChange={e => {
            submit(e.target.files[0])
          }}
          style={{ width: "100px" }}
        />

        <input
          type="button"
          value="Convert Html to Image"
          onClick={generateDynamicImages}
        />
      </div>
    </>
  )
}

function App() {
  return <CsvReader />
}

export default App
