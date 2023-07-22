import React,{createContext} from 'react';
import ReactDOM from 'react-dom/client';
 
import App from './App';
//import reportWebVitals from './reportWebVitals';

const Context = createContext();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <Context.Provider value="Mahendra">
    <App />
    </Context.Provider>
  </React.StrictMode>
);

export {Context} ;

 
//reportWebVitals();
