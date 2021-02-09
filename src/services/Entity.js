import { http } from './http'

class Entity {
  static async getAll(url) {
    return http.get(url)
  }

  static async getDetails(property, name) {
    return http.get(`/${property}/entities/${name}`)
  }
}

export default Entity
