import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Arrow } from '../images/arrow.svg';

const options = {
  'pool-10300': 'Pool (10300 points)',
  'pool-124733': 'Pool (124733 points)',
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
      <div className='custom-select__selected'>
        <span className='custom-select__selected-text' onClick={toggling}>
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
