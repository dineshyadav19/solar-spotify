import logo from './Background.svg';
import html2canvas from 'html2canvas';
const imageStyles = {
  width: '100vw',
  height: '100vh',
}

const centerContainer = {
  position: "absolute",
  left: '0',
  right: '0', 
  marginLeft: 'auto', 
  marginRight: 'auto', 
  width: '60%',
  height: '60%',
  background: 'red'
}

function App() {
  function takeS() {
    html2canvas(document.body).then(function(canvas) {
    document.body.appendChild(canvas);
    console.log(canvas)
  });
  }
  
  return (
    <div style={{
      position: "relative",
      display: "flex",
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <img src={logo} alt="logo" style={imageStyles}/>
      <div style={centerContainer}>

      </div>

      <input type='button' onClick={takeS} value='click'/>
    </div>
  );
}

export default App;
