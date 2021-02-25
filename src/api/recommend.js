import { get } from './http'

export function getRecommend() {
  return get('/banner?type=1')
}

export function getDiscList() {
  return get('/top/playlist?limit=10')
}