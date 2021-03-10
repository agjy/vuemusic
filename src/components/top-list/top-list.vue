<template>
  <transition name="slide">
    <music-list :rank="rank" :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import { getDiscDetail } from 'api/recommend'
import { createSong } from 'common/js/song'

export default {
  data() {
    return {
      songs: [],
      rank: true
    }
  },
  components: {
    MusicList
  },
  created() {
    this._getDiscDetail()
  },
  computed: {
    title() {
      return this.topList.name
    },
    bgImage() {
      if (this.songs.length) {
        return this.songs[0].image
      } else {
        return ''
      }
    },
    ...mapGetters(['topList'])
  },
  methods: {
    _getDiscDetail() {
      if (!this.topList.id) {
        this.$router.push('/rank')
        return
      }
      getDiscDetail(this.topList.id).then(res => {
        this.songs = this._normalizeSongs(res.playlist.tracks)
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach(item => {
        if (item.id && item.al.id) {
          ret.push(createSong(item))
        }
      })
      return ret
    }
  }
}
</script>

<style lang="stylus" scoped>
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>