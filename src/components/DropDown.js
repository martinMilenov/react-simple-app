import React, { useEffect, useRef, useState } from "react";

const DropDown = ({ options, selected, handleSelectedChange, label }) => {
  const [toggle, setToggle] = useState(false);

  const formRef = useRef(null);

  useEffect(() => {
    const onBodyClick = (e) => {
      if (formRef.current.contains(e.target)) {
        return;
      }
      setToggle(false);
    };

    document.body.addEventListener("click", onBodyClick, { capture: true });

    return () => {
      document.body.removeEventListener("click", onBodyClick, {
        capture: true,
      });
    };
  }, []);

  return (
    <div className="ui form" ref={formRef}>
      <div className="field">
        <label className="label">{label}</label>
        <div
          onClick={(e) => setToggle(!toggle)}
          className={`ui selection dropdown ${toggle ? "visible active" : ""}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label || "Select color"}</div>
          <div className={`menu ${toggle ? "visible transition" : ""}`}>
            {options.map((option) => {
              if (option.value === selected.value) {
                return null;
              }
              return (
                <div
                  onClick={() => handleSelectedChange(option)}
                  key={option.value}
                  className="item"
                >
                  {option.label}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropDown;
