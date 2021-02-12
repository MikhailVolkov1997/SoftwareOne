import React from 'react'

import './Panel.css'

import DiagramWrapper from '../Canvas/DiagramWrapper'
import { TopPanel } from '../TopPanel/TopPanel'
import PanelEntity from './PanelEntity/PanelEntity'
import useStateCallback from '../../utils/useStateCallback'

const Panel = ({ children, panels }) => {
  const [diagramData, setDiagramData] = useStateCallback([])

  if (!panels) return <div className="entity-field">{children}</div>
  const { left, right, bottom, top } = panels

  return (
    <>
      <TopPanel />
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
              {top.map((panel, index) => (
                <PanelEntity key={index} panel={panel} />
              ))}
            </div>
          )}
          <div className="entity-field">
            <DiagramWrapper
              diagramData={diagramData}
              setDiagramData={setDiagramData}
            />
          </div>

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
            {' '}
            {right.map((panel, index) => (
              <PanelEntity key={index} panel={panel} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}
export default Panel
