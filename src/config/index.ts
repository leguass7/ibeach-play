import pkg from '../../package.json'

export const isDevMode = process.env.NODE_ENV !== 'production'
export const appName = pkg.name
export const appVersion = pkg.version
