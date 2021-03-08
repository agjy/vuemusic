<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import { getDiscDetail, getSongDetail } from 'api/recommend'
import { ERR_OK } from 'api/http'
import { createSong } from 'common/js/song'

export default {
  components: {
    MusicList
  },
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.disc.name
    },
    bgImage() {
      return this.disc.coverImgUrl
    },
    ...mapGetters([
      'disc'
    ])
  },
  created() {
    this._getDiscDetail()
  },
  methods: {
    _getDiscDetail() {
      if (!this.disc.id) {
        this.$router.push('/recommend')
        return
      }
      getDiscDetail(this.disc.id).then(res => {
        if (res.code === ERR_OK) {
          let ids = []
          res.playlist.trackIds.forEach(item => {
            ids.push(item.id)
          })
          return ids.join(',')
        }
      }).then(ids => {
        getSongDetail(ids).then(res => {
          if (res.code === ERR_OK) {
            this.songs = this._normalizeSongs(res.songs)
          }
        })
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach(musicData => {
        if (musicData.id && musicData.al.id) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>