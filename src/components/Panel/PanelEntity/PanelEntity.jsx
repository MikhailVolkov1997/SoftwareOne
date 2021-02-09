import React from "react";
import "./PanelEntity.css";

const PanelEntity = ({ panel }) => {
  console.log(panel);
  const isVisible = panel.visible === "True";
  if (!isVisible) return null;
  console.log(panel.styles);
  return (
    <div className="item-wrapper" style={panel.styles}>
      <div>Name: {panel.name}</div>
      <div>Type:{panel.type}</div>
      <div>Title:{panel.title}</div>
    </div>
  );
};
export default PanelEntity;
