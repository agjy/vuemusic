import { get } from './http'

export function getTopList() {
  return get('/toplist/detail')
}