import React from 'react';

const CheckBox = ({ title, uniqueItems, handleCheck, filter }) => {
  return (
    <div>
      <p>{title}</p>
      {uniqueItems.map((item) => (
        <label htmlFor={item.toLowerCase()} key={item}>
          {item}
          <input
            type="checkbox"
            name={item.toLowerCase()}
            id={item.toLowerCase()}
            onChange={handleCheck}
            checked={filter.genres.includes(item.toLowerCase())}
          />
        </label>
      ))}
    </div>
  );
};

export default CheckBox;
