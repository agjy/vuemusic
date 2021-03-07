import { getSongUrl, getLyric } from 'api/song'
import { ERR_OK } from 'api/http'

export default class Song {
  constructor({ id, albumId, singer, name, albumName, image }) {
    this.id = id
    this.albumId = albumId
    this.singer = singer
    this.name = name
    this.albumName = albumName
    this.image = image
  }

  getSongUrl() {
    if (this.url) {
      return Promise.resolve(this.url)
    }
    return new Promise((resolve, reject) => {
      getSongUrl(this.id).then(res => {
        if (res.code === ERR_OK) {
          this.url = res.data[0].url
          resolve(this.url)
        } else {
          reject(new Error('no url'))
        }
      })
    })
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.url)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.id).then(res => {
        if (res.code === ERR_OK) {
          this.lyric = res.lrc.lyric
          resolve(this.lyric)
        } else {
          reject(new Error('no lyric'))
        }
      })
    })
  }
}

export function createSong(hotSongs) {
  return new Song({
    id: hotSongs.id,
    albumId: hotSongs.al.id,
    singer: filterSinger(hotSongs.ar),
    name: hotSongs.name,
    albumName: hotSongs.al.name,
    image: hotSongs.al.picUrl + '?imageView=1&thumbnail=350x0',
    url: ''
  })
}

// 如果有多个歌手，以/拼接
export function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((item) => {
    ret.push(item.name)
  })
  return ret.join('/')
}