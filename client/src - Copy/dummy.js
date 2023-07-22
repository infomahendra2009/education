import logo from './logo.svg';
import './App.css';
import Button from '@mui/material/Button';

function getButtonText(){

  return " add Submit";
}
 const App=()=> {
const button="Click me!1";
const button1=[5,33,3];
const button2={"text":'abc'};
const styles={backgroundColor:"green",color:"white"};
  return (
    <div className="App">
      
      <div>
      <Button variant="contained">Hello World</Button>
        <label>name</label>
        <input type="text" className="form" />
        <button style={styles}> 
          {getButtonText()}
          </button>
        <button style={{backgroundColor:"red",color:"white"}}>
          {button2.text} | 
          {button1} | 
          {button} | 
          {getButtonText()}
          </button>
      </div>
    </div>
  );
}

export default App;
