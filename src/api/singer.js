import { get } from './http'

export function getSinger() {
  return get('/top/artists?limit=150')
}

export function getSingerDetail(id) {
  return get('/artists?id=' + id)
}
