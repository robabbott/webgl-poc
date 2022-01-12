import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Arrow } from '../images/arrow.svg';

const options = {
  'sky-box':
    'Skybox Example',
  'render-scene?type=cloud&model=dolomite-pool-1314':
    'Point Cloud Pool (1314 points)',
  'render-scene?type=cloud&model=dolomite-pool-10300':
    'Point Cloud Pool (10300 points)',
  'render-scene?type=cloud&model=dolomite-pool-124733':
    'Point Cloud Pool (124733 points)',
  'render-scene?type=cloud&model=dolomite-pool-1378174':
    'Point Cloud Pool (1378174 points)',
  'render-scene?type=mesh&model=dolomite-pool-1314':
    'Wire Mesh Pool (1314 points)',
  'render-scene?type=mesh&model=dolomite-pool-10300':
    'Wire Mesh Pool (10300 points)',
  'render-scene?type=mesh&model=dolomite-pool-124733':
    'Wire Mesh Pool (124733 points)',
  'render-scene?type=mesh&model=dolomite-pool-1378174':
    'Wire Mesh Pool (1378174 points)',
};

const CustomSelect = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const componentRef = useRef()
  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(options[value]);
    setIsOpen(false);
  };

  /**
   * Handle click outside of element to close dropdown
   */
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
    function handleClick(e) {
      if (componentRef && componentRef.current && isOpen) {
        const ref = componentRef.current;
        if (!ref.contains(e.target)) {
          setIsOpen(false);
        }
      }
    }
  });
  
  return (
    <div className='custom-select' ref={componentRef}>
      <div
        className={`custom-select__selected ${
          isOpen ? 'custom-select__selected--open' : ''
        }`}
        onClick={toggling}
      >
        <span className='custom-select__selected-text'>
          {selectedOption || 'Choose a model'}
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
