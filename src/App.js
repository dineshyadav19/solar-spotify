import html2canvas from "html2canvas"
import { useEffect, useState } from "react"
import CoverImage from "./CoverImage.tsx"
import logo from "./test.png"
const imageStyles = {
  width: "100vw",
  height: "100vh",
}

function convertHtmlToImage(props) {
  html2canvas(document.querySelector(`#solar-${props.site_id}`)).then(function (
    canvas
  ) {
    let anchorTag = document.createElement("a")
    document.body.appendChild(anchorTag)
    anchorTag.download = `${props.mobile}.jpg`
    anchorTag.href = canvas.toDataURL()
    anchorTag.target = "_blank"
    anchorTag.click()
    document.body.removeChild(anchorTag)
  })
}

function CsvReader() {
  const [csvArray, setCsvArray] = useState([])

  const processCSV = (str, delim = ",") => {
    const headers = str.slice(0, str.indexOf("\n")).split(delim)
    const rows = str.slice(str.indexOf("\n") + 1).split("\n")
    const newArray = rows.map(row => {
      const values = row.split(delim)
      const eachObject = headers.reduce((obj, header, i) => {
        obj[header] = values[i]
        return obj
      }, {})
      return eachObject
    })

    setCsvArray(newArray)
  }

  const submit = csvFile => {
    const file = csvFile
    const reader = new FileReader()

    reader.onload = function (e) {
      const text = e.target.result
      processCSV(text)
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

function SolarSpotify(props) {
  useEffect(() => {
    convertHtmlToImage(props)
  }, [props])

  return (
    <div className="main--container" id={`solar-${props.site_id}`}>
      <CoverImage style={imageStyles} />
      <div className="container">
        <div className="main">
          <h1 className="main--heading">
            All the care and commitment to your solar plant added up to{" "}
          </h1>

          <h2 className="main--units">{Math.round(props.gen_units)}</h2>

          <p className="main--content">
            In 2022, your solar plant generated {Math.round(props.gen_units)}{" "}
            units of electricity that is approximately ~ ₹
            {(props.gen_units * 7).toFixed(1)}* and{" "}
            {Math.round(props.offset_unit)} Kg of Co2 Offset
          </p>
        </div>
        <footer className="footer">
          <img src={logo} alt="company-logo" className="footer--img" />
          <span className="footer--title">#mysolarhome2022</span>
        </footer>
      </div>
    </div>
  )
}

function App() {
  return (
    <>
      <CsvReader />
    </>
  )
}

export default App
