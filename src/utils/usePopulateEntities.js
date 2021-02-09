import { useEffect, useState } from 'react'
import { EntityService } from '../services'

//const initialPage = "/apmPage/entities/page1";
const initialPage = '/apmPage/entities/.*'

export const usePopulateEntities = (setLoading) => {
  const [entities, setEntities] = useState([])
  useEffect(() => {
    setLoading(true)
    EntityService.getAll(initialPage)
      .then((res) => {
        const result = res.data.reduce(
          (acc, item) => [...acc, ...JSON.parse(item.attributes.objects)],
          []
        )
        setEntities(result)
        setLoading(false)
      })
      .catch((e) => {
        console.log(`Error-${e}`)
      })
  }, [setLoading])
  const addEntityItem = (entity) => setEntities((state) => [...state, entity])

  return { entities, addEntityItem }
}
