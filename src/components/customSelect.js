import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Arrow } from '../images/arrow.svg';

const options = {
  'pool-cloud?points=1314': 'Point Cloud Pool (1314 points)',
  'pool-cloud?points=10300': 'Point Cloud Pool (10300 points)',
  'pool-cloud?points=124733': 'Point Cloud Pool (124733 points)',
  'pool-cloud?points=1378174': 'Point Cloud Pool (1378174 points)',
  'pool-mesh?points=124733': 'Wire Mesh Pool (124733 points)',
};

const CustomSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(options[value]);
    setIsOpen(false);
  };
  
  return (
    <div className='custom-select'>
      <div
        className={`custom-select__selected ${
          isOpen ? 'custom-select__selected--open' : ''
        }`}
        onClick={toggling}
      >
        <span className='custom-select__selected-text'>
          {selectedOption || 'Choose a rendering'}
        </span>
        <span className='custom-select__selected-icon'>
          <Arrow />
        </span>
      </div>
      {isOpen && (
        <ul className='custom-select__options'>
          {Object.keys(options).map((key, i) => {
            return (
              <li className='custom-select__options-item' key={key}>
                <Link
                  onClick={onOptionClicked(key)}
                  className='custom-select__options-link'
                  to={'/' + key}
                >
                  {options[key]}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default CustomSelect;
