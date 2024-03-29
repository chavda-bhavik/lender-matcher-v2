import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import Navbar from './components/NavbarComponent';
import Footer from './components/FooterComponent';
import Main from './components/MainComponent/MainComponent';
import FAQ from './components/FAQComponent';
import About from './components/AboutComponent';

function App() {
  const [bankList, setBankList] = useState([]);
  return (
    <>
      <Navbar resetList={() => setBankList([])} />
      <Main bankList={bankList} setList={setBankList} />
      <About />
      <FAQ />
      <Footer />
    </>
  );
}

export default App;
