import React from 'react';

const CoinsList = ({ name, price, change, color }) => {
  return (
    <div className="flex justify-between content-end mb-3">
      <p className="font-mono font-bold" style={{ color: `${color}` }}>
        {name}
      </p>
      <p className="font-normal">{price}</p>
      <p
        className="font-bold"
        style={{ color: `${change >= 0 ? 'green' : 'red'}` }}>
        {change >= 0 ? '▲ ' : '▼ '}
        {change}
      </p>
    </div>
  );
};

export default CoinsList;
