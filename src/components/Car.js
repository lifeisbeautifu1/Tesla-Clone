import React from 'react';
import ButtonPrimary from './ButtonPrimary';
import ButtonSecondary from './ButtonSecondary';
import './Car.css';

const Car = ({ model, testDrive, imgSrc }) => {
  return (
    <div className="car">
      <div className="car__image">
        <img src={imgSrc} alt={model} />
      </div>
      <div className="car__model">{model}</div>
      <div className="car__actions">
        <ButtonPrimary name="order" />
        {testDrive && <ButtonSecondary name="test drive" />}
      </div>
      <div className="car__info">
        <span>Request a Call</span> to speak with a product specialist, value
        your trade-in or apply for leasing
      </div>
    </div>
  );
};

export default Car;
