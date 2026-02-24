import React from 'react';
import Navbar from './Navbar/navbar';
import Home from './Home/home';

const main = () => {
    return (
        <div className="mainContainer">
           <Navbar></Navbar>
              <Home></Home>
        </div>
    );
}

export default main;