import styled from '@emotion/styled';
import React from 'react';

const CheckBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .checkbox-title {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 8px;
  }

  .checkbox-input {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;

    input[type='checkbox'] {
      margin: 0;
      margin-right: 8px;
      width: 16px;
      height: 16px;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      cursor: pointer;
      outline: none;
      border: none;
      background-color: #fff;
      border-radius: 4px;
      transition: 0.2s;
      border: 1px solid #d3d3d3;
    }

    input[type='checkbox']:checked {
      background-color: #fff;
      border: 1px solid #d3d3d3;
    }

    input[type='checkbox']::before {
      content: '';
      display: block;
      width: 10px;
      height: 10px;
      transform: scale(0);
      transition: 0.2s transform ease-in-out;
      box-shodow: inset 0 0 0 2px pink;
    }

    input[type='checkbox']::before {
      transform-origin: bottom center;
      background-color: blue;
      clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    }

    input[type='radio']:checked::before,
    input[type='checkbox']:checked::before {
      transform: scale(1);
    }
  }
`;

const CheckBox = ({ title, uniqueItems, handleCheck, filter }) => {
  return (
    <CheckBoxWrapper>
      <p className="checkbox-title">{title}</p>
      <div className="checkbox-input">
        {uniqueItems.map((item) => (
          <label
            htmlFor={item.toLowerCase()}
            key={item}
            className="checkbox-label">
            <input
              type="checkbox"
              name={item.toLowerCase()}
              id={item.toLowerCase()}
              onChange={handleCheck}
              checked={filter.includes(item.toLowerCase())}
            />
            {item}
          </label>
        ))}
      </div>
    </CheckBoxWrapper>
  );
};

export default CheckBox;
