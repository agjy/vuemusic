import { get } from './http'

export function getSongUrl(SongId) {
  return get(`/song/url/v1?id=${SongId}&level=standard`)
}

export function getLyric(SongId) {
  return get(`/lyric?id=${SongId}`)
}
