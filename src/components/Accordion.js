import React, { Fragment, useState } from "react";

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (i) => {
    setActiveIndex(i);
  };

  return (
    <div className="ui styled accordion">
      {items.map((item, i) => {
        const active = i === activeIndex ? "active" : "";
        return (
          <Fragment key={i}>
            <div
              onClick={() => handleClick(i)}
              className={`title ${active}`}
              key={i}
            >
              <i className="dropdown icon"></i>
              {item.title}
            </div>
            <div className={`content ${active}`}>
              <p>{item.content}</p>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
};

export default Accordion;
