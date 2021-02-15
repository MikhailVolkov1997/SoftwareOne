import { isEmpty } from 'lodash'

export function createProperties(properties) {
  const newFields = properties.map(({ name, value }) => {
    if (isEmpty(name)) return

    return { [name]: value }
  })

  return newFields.filter((item) => item)
}
