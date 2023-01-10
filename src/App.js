import html2canvas from 'html2canvas';
import { useState } from 'react';
import CoverImage from './CoverImage.tsx';
import logo from './logo.svg'
const imageStyles = {
  width: '100vw',
  height: '100vh',
}

function CsvReader(){
    const [csvFile, setCsvFile] = useState();
    const [csvArray, setCsvArray] = useState([]);

    const processCSV = (str, delim=',') => {
        const headers = str.slice(0,str.indexOf('\n')).split(delim);
        const rows = str.slice(str.indexOf('\n')+1).split('\n');

        const newArray = rows.map( row => {
            const values = row.split(delim);
            const eachObject = headers.reduce((obj, header, i) => {
                obj[header] = values[i];
                return obj;
            }, {})
            return eachObject;
        })

        setCsvArray(newArray)
    }

    const submit = () => {
        const file = csvFile;
        const reader = new FileReader();

        reader.onload = function(e) {
            const text = e.target.result;
            console.log(text);
            processCSV(text)
        }

        reader.readAsText(file);
    }

    return(
        <form id='csv-form'>
            <input
                type='file'
                accept='.csv'
                id='csvFile'
                onChange={(e) => {
                    setCsvFile(e.target.files[0])
                }}
            >
            </input>
            <br/>
            <button
                onClick={(e) => {
                    e.preventDefault()
                    if(csvFile)submit()
                }}
            >
                Submit
            </button>
            <br/>
            <br/>
        </form>
    );

}

function SolarSpotify() {
  return (
    <div 
        className='main--container'
      >
        <CoverImage style={imageStyles}/>
        <div className='container'>
          <div className='main'>
            <h1 className='main--heading'>All the care and  commitment to your solar plant added up to </h1>

            <h2 className='main--units'>
              2,125
            </h2>

            <p className='main--content'>
              In 2022 your solar plant generated 2,125 units of electricity that is approximately ~ ₹ 2,5145* and 125 Kg of Co2 Offset 
            </p>
          </div>
          <footer className='footer'>
            <img src={logo} alt='company-logo' className='footer--img'/>
            <span className='footer--title'>#mysolarhome2022</span>
          </footer>
        </div>
    </div>
    )
}

function App() {
  function convertHtmlToImage() {
    html2canvas(document.body).then(function(canvas) {
      let anchorTag = document.createElement("a");
      document.body.appendChild(anchorTag);
      anchorTag.download = "filename.jpg";
      anchorTag.href = canvas.toDataURL();
      anchorTag.target = '_blank';
      anchorTag.click();
      document.body.removeChild(anchorTag);
    });
  }
  
  return (
    <div style={{
      display: "flex",
      flexDirection: "column"
    }}>
      <CsvReader />
      
    </div>
  );
}

export default App;
