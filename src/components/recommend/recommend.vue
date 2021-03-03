<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="discList">
      <!-- scroll只有第一个子元素会滚动，所以用一个div进行包裹 -->
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <div class="slider-content">
            <slider>
              <div v-for="item in recommends" :key="item.bannerId">
                <img @load="loadImage" :src="item.pic" alt="">
              </div>
            </slider>
          </div>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" v-for="item in discList" :key="item.id">
              <div class="icon">
                <img width="60" height="60" v-lazy="item.coverImgUrl">
              </div>
              <div class="text">
                <h2 class="name">{{item.creator.nickname}}</h2>
                <p class="desc" v-html="item.name"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <loading>
        </loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import { getRecommend, getDiscList } from 'api/recommend'
import { ERR_OK } from 'api/http'
import Slider from 'base/slider/slider'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'

export default {
  components: {
    Slider,
    Scroll,
    Loading
  },
  data() {
    return {
      recommends: [],
      discList: []
    }
  },
  created() {
    this._getRecommend()
    this._getDiscList()
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        if (res.code === ERR_OK) {
          this.recommends = res.banners
        }
      })
    },
    _getDiscList() {
      getDiscList().then(res => {
        if (res.code === ERR_OK) {
          this.discList = res.playlists
          this.discList.forEach(item => {
            item.coverImgUrl += '?imageView=1&thumbnail=100x0'
          })
        }
      })
    },
    loadImage() {
      // 如果有某一张图片把高度撑开，就不需要再触发计算
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"

.recommend
  position: fixed
  width: 100%
  top: 88px
  bottom: 0
  .recommend-content
    height: 100%
    overflow: hidden
    .slider-wrapper
      position: relative
      width: 100%
      height: 0
      padding-top: 40%
      overflow: hidden
      .slider-content
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
    .recommend-list
      .list-title
        height: 65px
        line-height: 65px
        text-align: center
        font-size: $font-size-medium
        color: $color-theme
      .item
        display: flex
        box-sizing: border-box
        align-items: center
        padding: 0 20px 20px 20px
        .icon
          flex: 0 0 60px
          width: 60px
          padding-right: 20px
        .text
          display: flex
          flex-direction: column
          justify-content: center
          flex: 1
          line-height: 20px
          overflow: hidden
          font-size: $font-size-medium
          .name
            margin-bottom: 10px
            color: $color-text
          .desc
            color: $color-text-d
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>