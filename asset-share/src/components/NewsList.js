import React from 'react';

const NewsList = ({ title, img, link }) => {
  return (
    <div className="flex news-list_container">
      <div className="w-64 h-24 overflow-hidden image_container">
        <img src={img} alt={title} className="object-contain" />
      </div>
      <div className="font-sans	text-base news_title pl-3">
        <a href={link}>
          <p className="">{title}</p>
        </a>
      </div>
    </div>
  );
};

export default NewsList;
