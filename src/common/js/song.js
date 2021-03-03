export default class Song {
  constructor({ id, albumId, singer, name, albumName, image }) {
    this.id = id
    this.albumId = albumId
    this.singer = singer
    this.name = name
    this.albumName = albumName
    this.image = image
  }
}

export function createSong(hotSongs) {
  return new Song({
    id: hotSongs.id,
    albumId: hotSongs.al.id,
    singer: filterSinger(hotSongs.ar),
    name: hotSongs.name,
    albumName: hotSongs.al.name,
    image: hotSongs.al.picUrl + '?imageView=1&thumbnail=350x0'
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