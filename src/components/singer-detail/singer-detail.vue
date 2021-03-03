<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/http'
import { createSong } from 'common/js/song'
import MusicList from 'components/music-list/music-list'

export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.bgImage
    },
    ...mapGetters([
      'singer'
    ])
  },
  created() {
    this._getDetail(this.singer.id)
  },
  methods: {
    _getDetail(singerId) {
      if (!singerId) {
        this.$router.push('/singer')
      }
      getSingerDetail(singerId).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.hotSongs)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        if (item.id && item.al.id) {
          ret.push(createSong(item))
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="stylus" scoped>
  @import '~common/stylus/variable'
  .singer-detail
    position: fixed
    top: 0
    left: 0
    bottom: 0
    right: 0
    z-index: 100
    background-color $color-background
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>