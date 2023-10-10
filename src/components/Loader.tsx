import React from 'react';
import loader from '../assets/Eclipse-1s-200px.svg';
import '../App.css';

const Loader: React.FC = () => {
  return (
    <div className="loader">
      <img src={loader} alt="Loading..." />
    </div>
  );
};

export default Loader;