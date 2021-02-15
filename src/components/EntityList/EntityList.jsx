import React, { useEffect, useState } from 'react'

import { usePopulateEntities } from '../../utils/usePopulateEntities'
import './EntityList.css'
import Panel from '../Panel/Panel'
import Entity from '../Entity/Entity'
import { usePopulateDetails } from '../../utils/usePopulateDetails'

const EntityList = () => {
  const [selected, setSelected] = useState('')
  const [panels, setPanels] = useState()
  const [loading, setLoading] = useState(false)

  const { entities } = usePopulateEntities(setLoading)

  usePopulateDetails(selected, setPanels, setLoading)

  useEffect(() => {
    setPanels()
  }, [selected])

  if (loading) {
    return <div className="Loading">Loading</div>
  }

  return (
    <div className="Layout">
      <Panel panels={panels} selected={selected}>
        {entities.map((item, index) => (
          <Entity key={index} item={item} setSelected={setSelected} />
        ))}
      </Panel>
    </div>
  )
}

export default EntityList
