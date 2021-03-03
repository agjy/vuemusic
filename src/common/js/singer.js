
export default class Singer {
  constructor({ id, name, avatar }) {
    this.id = id
    this.name = name
    this.avatar = avatar + '?imageView=1&thumbnail=100x0'
    this.bgImage = avatar + '?imageView=1&thumbnail=350x0'
  }
}