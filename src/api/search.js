import { get } from './http'

export function getHotKey() {
  return get('/search/hot')
}

export function getSearchSuggest(query) {
  return get(`/search/suggest?keywords=${query}&type=mobile`)
}

export function getMultimatch(keywords) {
  return get(`/search/multimatch?keywords=${keywords}`)
}

export function getSearchSongs(keywords, pagesize, page) {
  return get(`/cloudsearch?keywords=${keywords}&limit=${pagesize}&offset=${(page - 1) * pagesize}`)
}