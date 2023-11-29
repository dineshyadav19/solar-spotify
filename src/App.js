import { useState } from "react"
import { SolarSpotify } from "./components/SolarSpotify"
import { processCSV } from "./utils/index.ts"

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

  return (
    <>
      <input
        type="file"
        accept=".csv"
        onChange={e => {
          submit(e.target.files[0])
        }}
      />
      <br />
      {csvArray.map(item =>
        item.site_id ? <SolarSpotify {...item} key={item.site_id} /> : null
      )}
    </>
  )
}

function App() {
  return <CsvReader />
}

export default App
