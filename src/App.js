import React, { useState } from "react"
import { convertHtmlToImage, processCSV } from "./utils/index.ts"
import CoverImage from "./CoverImage.tsx"

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

  const renderImageHtml = props => `
    <div class="main--container" id="solar-${props.site_id}">
      <div style="width: 100vw; height: 100vh;"></div>
      <div class="container">
        <div class="main">
          <h1 class="main--heading">
            All the care and commitment to your solar plant added up to
          </h1>

          <h2 class="main--units">${Math.round(props.gen_units)}</h2>

          <p class="main--content">
            In 2022, your solar plant generated ${Math.round(
              props.gen_units
            )} units of electricity that is approximately ~ ₹
            ${(props.gen_units * 7).toFixed(1)}* and ${Math.round(
    props.offset_unit
  )} Kg of Co2 Offset
          </p>
        </div>
        <footer class="footer">
          <span class="footer--title">#mysolarhome2022</span>
        </footer>
      </div>
    </div>`

  const generateImages = async () => {
    for (let i = 0; i < csvArray.length; i++) {
      const currentRow = csvArray[i]
      const imageHtml = renderImageHtml(currentRow)

      const imageElement = document.createElement("div")
      imageElement.innerHTML = imageHtml

      document.body.appendChild(imageElement)

      await new Promise(resolve => setTimeout(resolve, 500))

      convertHtmlToImage(currentRow)

      document.body.removeChild(imageElement)
    }
  }

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
          onClick={generateImages}
        />
      </div>
    </>
  )
}

function App() {
  return <CsvReader />
}

export default App
