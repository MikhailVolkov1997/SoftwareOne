import React from 'react'
import './PanelEntity.css'

const PanelEntity = ({ panel }) => {
  const isVisible = panel.visible === 'True'

  if (!isVisible) return null

  return (
    <div className="item-wrapper" style={panel.styles}>
      <div>Name: {panel.name}</div>
      <div>Type:{panel.type}</div>
      <div>Title:{panel.title}</div>
    </div>
  )
}
export default PanelEntity
