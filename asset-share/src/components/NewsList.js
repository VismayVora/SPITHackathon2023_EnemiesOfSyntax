import React from 'react';

const NewsList = ({ title, img, link }) => {
  return (
    <div className="flex bg-gray-900 rounded-xl p-4 mt-4">
      <div className="w-64 overflow-hidden">
        <img src={img} alt={title} className="w-36" />
      </div>
      <div className="font-sans	text-base pl-3">
        <a href={link} target="_blank" rel="noreferrer">
          <p className="">{title}</p>
        </a>
      </div>
    </div>
  );
};

export default NewsList;
