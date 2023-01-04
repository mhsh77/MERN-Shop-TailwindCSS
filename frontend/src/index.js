import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { positions , transitions,Provider as AlertProvider } from 'react-alert'
import AlertTemplate  from 'react-alert-template-basic'
import App from './App';
import 'flowbite'
import 'flowbite-react'
const options = {
  timeout: 10000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
}


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} options={options}>
      
        <App/>
      
    </AlertProvider>
    
  </React.StrictMode>
  </Provider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

