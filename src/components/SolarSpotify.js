import { useEffect } from "react"

import CoverImage from "../CoverImage.tsx"
import CompanyLogo from "../test.png"
import { convertHtmlToImage } from "../utils/index.ts"
import "../index.css"

const imageStyles = {
  width: "100vw",
  height: "100vh",
}

export function SolarSpotify(props) {
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
          <img src={CompanyLogo} alt="company-logo" className="footer--img" />
          <span className="footer--title">#mysolarhome2022</span>
        </footer>
      </div>
    </div>
  )
}
