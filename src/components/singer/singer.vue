<template>
  <div class="singer">
    <list-view @select="selectSinger" :data="singers"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>

import { getSinger } from 'api/singer'
import { ERR_OK } from 'api/http'
import pinyin from 'pinyin'
import Singer from 'common/js/singer'
import ListView from 'base/listview/listview'
import { mapMutations } from 'vuex'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

export default {
  components: {
    ListView
  },
  data() {
    return {
      singers: []
    }
  },
  mounted() {
    this._getSinger()
  },
  methods: {
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    _getSinger() {
      getSinger().then((res) => {
        if (res.code === ERR_OK) {
          res.artists.forEach((item) => {
            // 使用 pinyin 获取歌手页面右侧字母列表需要的姓氏拼音首字母，如果是英文名就用第一个字母
            if (item.name[0].match(/[a-zA-Z]/)) {
              item.findex = item.name[0].toUpperCase()
            } else {
              item.findex = pinyin(item.name, {
                style: pinyin.STYLE_FIRST_LETTER
              })[0][0].toUpperCase()
            }
          })
          this.singers = this._normalizeSinger(res.artists)
        }
      })
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }

      list.forEach((item, index) => {
        // 取前HOT_SINGER_LEN个歌手作为热门分组的歌手
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            id: item.id,
            name: item.name,
            avatar: item.img1v1Url
          }))
        }

        const key = item.findex
        // 把相同姓氏首字母大写的歌手放在同一组里
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.id,
          name: item.name,
          avatar: item.img1v1Url
        }))
      })
      // 对象的遍历并不能保证顺序，所以转换为数组
      let hot = []
      let ret = []
      for (const key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      // 把每个字母组按a-z的顺序排序
      ret.sort(function(a, b) {
        return a.title.charCodeAt() - b.title.charCodeAt()
      })
      return hot.concat(ret)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }
}
</script>

<style lang="stylus" scoped>
.singer
  position: fixed
  top: 88px
  bottom: 0
  width: 100%
</style>