<template>
  <scroll :data="songs" ref="result" class="result" :pullup="pullup"
    @scrollToEnd="searchMore">
    <div class="song-list-wrapper">
      <div v-show="singer.name" class="matchlist">
        <h3 class="title">最佳匹配</h3>
        <div class="artist" @click="selectSinger">
          <img class="avatar" :src="singer.avatar">
          <span class="name">歌手：{{singer.name}}</span>
        </div>
      </div>
      <song-list @select="selectItem" :songs="songs"></song-list>
      <loading v-show="hasMore" title="">
      </loading>
      <div v-show="!hasMore && !hasResult" class="no-result-wrapper">
        <no-result title="抱歉，暂无搜索结果"></no-result>
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'
import { mapActions, mapMutations } from 'vuex'
import { getMultimatch, getSearchSongs } from 'api/search'
import { ERR_OK } from 'api/http'
import Singer from 'common/js/singer'
import { createSong } from 'common/js/song'
import Loading from 'base/loading/loading'
import NoResult from 'base/no-result/no-result'

const pagesize = 30

export default {
  components: {
    Scroll,
    SongList,
    Loading,
    NoResult
  },
  props: {
    query: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      singer: {},
      songs: [],
      hasMore: true,
      page: 1,
      pullup: true,
      keyword: ''
    }
  },
  methods: {
    refresh() {
      this.$refs.result.refresh()
    },
    reset() {
      this.singer = {}
      this.songs = []
    },
    selectItem(item) {
      this.insertSong(item)
    },
    selectSinger() {
      this.$router.push({
        path: `/search/${this.singer.id}`
      })
      this.setSinger(this.singer)
    },
    getSearchResult(keyword) {
      this.keyword = keyword
      this.hasMore = true
      getMultimatch(keyword).then(res => {
        if (res.code === ERR_OK && !res.result.artist) {
          this.singer = {}
          return
        }
        this.singer = new Singer({
          id: res.result.artist[0].id,
          name: res.result.artist[0].name,
          avatar: res.result.artist[0].picUrl
        })
      })
      getSearchSongs(keyword, pagesize, this.page).then(res => {
        if (res.code === ERR_OK && res.result.songCount !== 0) {
          this.songs = this._normalizeSongs(res.result.songs)
        } else {
          this.songs = []
        }
        this._checkMore(res.result.songCount)
      })
    },
    searchMore() {
      if (!this.hasMore) {
        return
      }
      this.page++
      getSearchSongs(this.keyword, pagesize, this.page).then(res => {
        if (res.code === ERR_OK) {
          this.songs = this.songs.concat(this._normalizeSongs(res.result.songs))
          this._checkMore(res.result.songCount)
        }
      })
    },
    _checkMore(songCount) {
      if (!this.songs.length || this.songs.length >= songCount) {
        this.hasMore = false
      }
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach(musicData => {
        if (musicData.id && musicData.al.id) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    },
    ...mapActions([
      'insertSong'
    ]),
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  computed: {
    hasResult() {
      return this.singer.name || this.songs.length
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
.result
  height: 100%
  overflow: hidden
  .song-list-wrapper
    padding: 0 20px
    .title
      margin: 5px 0
      color: $color-theme
      font-size: $font-size-large
    .artist
      display: flex
      align-items: center
      .avatar
        width: 50px
        height: 50px
      .name
        margin-left: 20px
        font-size: $font-size-medium
  .matchlist
      padding-bottom: 10px
  .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
  .no-result-wrapper
    position: absolute
    width: 100%
    top: 50%
    left: 0
    transform: translateY(-50%)
</style>