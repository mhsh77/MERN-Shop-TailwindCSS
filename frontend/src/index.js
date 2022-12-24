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
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
}


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AlertProvider template={AlertTemplate} options={options}>
      <Provider store={store}>
        <App/>
      </Provider>
    </AlertProvider>
    
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

