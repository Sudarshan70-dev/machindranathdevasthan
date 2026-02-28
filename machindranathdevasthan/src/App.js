import './App.css';
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Main from './main';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {

  return (
    <div className="App-header">
      <Main></Main>
      <ToastContainer position="top-right" autoClose={3000} />

    </div>
  );
}

export default App;