import { get } from './http'

export function getRecommend() {
  return get('/banner?type=1')
}

export function getDiscList() {
  return get('/top/playlist?limit=10')
}

export function getDiscDetail(id) {
  return get(`/playlist/detail?id=${id}`)
}

export function getSongDetail(ids) {
  return get(`/song/detail?ids=${ids}`)
}