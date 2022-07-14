import React from 'react';
import './ButtonPrimary.css';

const ButtonPrimary = ({ type, name, onClick }) => {
  return (
    <button className="buttonPrimary" type={type} onClick={onClick}>
      {name}
    </button>
  );
};

export default ButtonPrimary;
