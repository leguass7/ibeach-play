// import { getBaseURL } from '~/config'

import { isDefined } from './validation'

// export function normalizeImageSrc(src = '', defaultImage?: string): string {
//   if (!src) return defaultImage || ''
//   if (src.startsWith('blob') || src.startsWith('data')) return src
//   return src.startsWith('http') ? src : `${getBaseURL()}${src}`
// }

export function querystring(_str?: Record<string, unknown>): string
export function querystring(_str?: string): Record<string, string>
export function querystring(_str?: unknown): unknown {
  if (typeof _str === 'string') {
    const keys = `${_str}`.split('&') // ['key=value']
    const obj = keys.reduce((acc: Record<string, string>, keyValue) => {
      const [k, v] = `${keyValue}`.split('=') // [key, value]
      if (k) {
        acc[k] = v || ''
      }
      return acc
    }, {})
    return obj
  } else if (typeof _str === 'object') {
    return Object.keys(_str || {})
      .map(k => {
        const o = _str as Record<string, unknown>
        return `${k}=${o?.[k]}`
      })
      .join('&')
  }
}

export function toBool(value: string | number): boolean {
  const valids = [
    [true, '1', 1, 'true', 'v', 'p'],
    [false, '0', 0, '', 'false', 'f', 'n']
  ]
  const found = valids.find(f => f.includes(value)) || undefined
  if (typeof value === 'number' && value <= 0) return false

  return ((isDefined(found) && found?.[0]) as boolean) || false
}

export function stringToColor(str = '') {
  if (!str) return '#000'
  let hash = 0
  let i: number

  for (i = 0; i < str?.length; i += 1) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }

  return color
}

export function stringAvatar(name = '') {
  const [n = '', s = ''] = name?.split(' ')
  return `${n[0] || ''}${s[0] || ''}`.toUpperCase()
}

export function toMaskMobile(mask: string, value: string) {
  // newReference = mask.replace(/#/g,function(m,o) {return reference[o];});

  return mask.replace(/9/g, (m, o) => value[o] || '')
}

/**
 * @function toMask
 * @example
 * toMask('XXX-XXXX', ABC1234) // ABC-1234
 */
export function toMask(mask: string, number: string, replace = 'X') {
  if (!number) return ''
  const s = `${number}`
  let r = ''
  for (let im = 0, is = 0; im < mask.length && is < s.length; im++) {
    r += mask.charAt(im) === replace ? s.charAt(is++) : mask.charAt(im)
  }
  return r
}

export function extension(fileName: string): string {
  const arr = fileName.split('.')
  return arr[arr.length - 1]
}

export function base64MimeType(dataBase64: string): string {
  if (dataBase64.startsWith('data')) {
    return dataBase64?.split?.(';')?.[0].split(':')?.[1]
  }
  return dataBase64?.split?.(';')?.[0]
}

export function firstLetter(str: string): string {
  const arrayName = str?.split(' ') || [' ', ' ']
  const firstLetter = arrayName?.[0]?.charAt(0)?.toUpperCase() || ' '

  if (arrayName?.length > 1) {
    const secondLetter = arrayName?.[1]?.charAt(0)?.toUpperCase() || ' '
    return `${firstLetter}${secondLetter}`.trim()
  }
  return firstLetter.trim()
}

export function limitString(string = '', limit = 0): string {
  if (string == null || !limit) {
    return string || ''
  }
  const result = string.substring(0, limit)
  if (result.length >= limit) {
    return `${result.slice(0, result.length - 3)}...`
  }
  return result
}

export function chunkString(str: string, size: number) {
  const numChunks = Math.ceil(str.length / size)
  const chunks = new Array(numChunks)

  for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
    chunks[i] = str.substr(o, size)
  }

  return chunks
}

export function addPrefixToCamelCase(prefix: string, variable: string): string {
  const words = variable.split(/(?=[A-Z])/) // Divide a string em palavras com base nas letras maiúsculas

  const camelCaseWords = words.map((word, index) => {
    if (index === 0) {
      return `${prefix}${word.charAt(0).toUpperCase()}${word.slice(1)}`
    }
    return word.charAt(0).toUpperCase() + word.slice(1)
  })

  const result = camelCaseWords.join('')
  return result
}

export function americanFormatValue(value: number) {
  if (value >= 1000) {
    const powers = ['', 'K', 'M', 'B', 'T']
    let power = 0

    while (value >= 1000 && power < powers.length - 1) {
      value /= 1000
      power++
    }

    return value.toFixed(1) + powers[power]
  } else {
    return value
  }
}

export function createUrlParams(baseUrl: string, params: Record<string, unknown> = {}) {
  const url = new URL(baseUrl)
  Object.keys(params).forEach(key => params?.[key] && url.searchParams.append(key, params?.[key] as string))
  return url.toString()
}

export function formatPhoneNumber(value = '') {
  // Remove todos os caracteres não numéricos
  const cleaned = value.replace(/\D/g, '')

  // Determina o formato do número com base no comprimento
  const formattedNumber =
    cleaned.length === 11
      ? cleaned.replace(/(\d{2})(\d{1})(\d{4})(\d{4})/, '($1) $2 $3-$4')
      : cleaned.length === 10
        ? cleaned.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
        : cleaned

  return formattedNumber
}

export function capitalize(str: string = '', lowerRest = false): string {
  const s = String(str)
  return s.slice(0, 1).toUpperCase() + (lowerRest ? s.slice(1).toLowerCase() : s.slice(1))
}
