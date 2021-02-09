import React from "react";
import "./Panel.css";
import PanelEntity from "./PanelEntity/PanelEntity";
const Panel = ({ children, panels }) => {
  if (!panels) return <div className="entity-field">{children}</div>;
  const { left, right, bottom, top } = panels;

  return (
    <div className="upper-wrapper">
      {Boolean(left) && left.length && (
        <div className="left-side">
          {left.map((panel, index) => (
            <PanelEntity key={index} panel={panel} />
          ))}
        </div>
      )}
      <div className="middle-side">
        {Boolean(top) && top.length && (
          <div className="top-field">
            {" "}
            {top.map((panel, index) => (
              <PanelEntity key={index} panel={panel} />
            ))}
          </div>
        )}
        <div className="entity-field">{children}</div>
        {Boolean(bottom) && bottom.length && (
          <div className="bottom-field">
            {bottom.map((panel, index) => (
              <PanelEntity key={index} panel={panel} />
            ))}
          </div>
        )}
      </div>
      {Boolean(right) && right.length && (
        <div className="right-side">
          {" "}
          {right.map((panel, index) => (
            <PanelEntity key={index} panel={panel} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Panel;
