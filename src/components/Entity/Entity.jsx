import React from 'react'
import { getBasicParams } from '../../utils/getBasicParams'
import './Entity.css'

const Entity = ({ setSelected, item }) => {
  const { left, top, name, property } = getBasicParams(item)
  console.log(getBasicParams(item))

  return (
    <div
      className="EntityItem"
      style={{ left, top }}
      onClick={() => setSelected(item)}
    >
      <span>{name}</span>
    </div>
  )
}
export default Entity
