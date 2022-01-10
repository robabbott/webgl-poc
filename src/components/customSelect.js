import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Arrow } from '../images/arrow.svg';

const options = {
  'cloud-pool-124733': 'Point Cloud Pool (124733 points)',
  'mesh-pool-124733': 'Wire Mesh Pool (124733 points)'
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
        <div className='custom-select__options'>
          {Object.keys(options).map((key, i) => {
            return (
              <Link
                onClick={onOptionClicked(key)}
                className='custom-select__options-item'
                to={'/' + key}
              >
                {options[key]}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default CustomSelect;
