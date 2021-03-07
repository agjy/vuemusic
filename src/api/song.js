import { get } from './http'

export function getSongUrl(SongId) {
  return get(`/song/url?id=${SongId}`)
}

export function getLyric(SongId) {
  return get(`/lyric?id=${SongId}`)
}