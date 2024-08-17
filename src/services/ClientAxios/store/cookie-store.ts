import Cookies from 'js-cookie'

import { Authorization } from '../client-axios.dto'
import { SetStoreParams, StoreInterface } from './store.interface'

export class CookieStore implements StoreInterface {
  private attributes: Cookies.CookieAttributes = {}

  private async assign(authorization?: Authorization | null): Promise<Authorization | null> {
    const oldAuth = (await this.get()) || {}
    return Object.assign({}, oldAuth || {}, authorization || {}) as Authorization
  }

  setAttributes(options: Cookies.CookieAttributes): CookieStore {
    this.attributes = options
    return this
  }

  async set(auth: SetStoreParams): Promise<void> {
    const newAuthorization = typeof auth === 'function' ? auth(await this.assign()) : this.assign(auth)
    const data = JSON.stringify(newAuthorization)
    Cookies.set('authorization', data, { secure: true, ...this.attributes })
  }

  async get(): Promise<Authorization | null> {
    try {
      const data = Cookies.get('authorization') || '{}'
      const auth = JSON.parse(data) as Authorization
      return auth
    } catch {
      return null
    }
  }

  async clear(): Promise<void> {
    Cookies.remove('authorization')
  }
}
