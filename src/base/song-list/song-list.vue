<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(song, index)" v-for="(song, index) in songs" :key="song.id" class="item">
        <div v-if="rank" class="rank">
          <span :class="getRankCls(index)">{{index+1}}</span>
        </div>
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default: () => []
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    selectItem(item, index) {
      this.$emit('select', item, index)
    },
    getDesc(song) {
      return `${song.singer} - ${song.albumName}`
    },
    getRankCls(index) {
      if (index <= 2) {
        return 'topThree'
      } else {
        return 'text'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .song-list
    .item
      display: flex
      align-items: center
      box-sizing: border-box
      height: 64px
      font-size: $font-size-medium
      .rank
        flex: 0 0 25px
        width: 25px
        margin-right: 20px
        text-align: center
        .topThree
          color $color-sub-theme
          font-size: $font-size-large
        .text
          color: $color-theme
      .content
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          no-wrap()
          color: $color-text
        .desc
          no-wrap()
          margin-top: 4px
          color: $color-text-d
</style>