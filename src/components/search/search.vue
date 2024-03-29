<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @focus="searchBoxFocus" @query="onQueryChange"></search-box>
    </div>
    <div ref="shortcutWrapper" class="shortcut-wrapper" v-show="!query">
      <scroll :refreshDelay="refreshDelay" ref="shortcut" class="shortcut" :data="shortcut">
        <div>
          <div class="hot-key">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li @click="selectKeyword(item.first)" class="item" v-for="(item, index) in hotKey" :key="index">
                <span>{{item.first}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span @click="showConfirm" class="clear">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list @delete="deleteSearchHistory" @select="selectKeyword" :searches="searchHistory"></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div class="suggest-result" v-show="query && !isResultShow" ref="suggestResult">
      <suggest @listScroll="blurInput" @select="selectKeyword" ref="suggest" :query="query"></suggest>
    </div>
    <div class="search-result" v-show="query && isResultShow" ref="searchResult">
      <search-result :query="query" ref="result"></search-result>
    </div>
    <confirm ref="confirm" @confirm="clearSearchHistory" text="是否清空所有搜索历史" confirmBtnText="清空"></confirm>
    <router-view></router-view>
  </div>
</template>

<script>
import SearchBox from 'base/search-box/search-box'
import SearchList from 'base/search-list/search-list'
import Scroll from 'base/scroll/scroll'
import Confirm from 'base/confirm/confirm'
import Suggest from 'components/suggest/suggest'
import SearchResult from 'components/search-result/search-result'
import { getHotKey } from 'api/search'
import { ERR_OK } from 'api/http'
import { playlistMixin, searchMixin } from 'common/js/mixin'
import { mapActions } from 'vuex'

export default {
  mixins: [playlistMixin, searchMixin],
  data() {
    return {
      hotKey: [],
      singer: {},
      songs: [],
      isResultShow: false
    }
  },
  computed: {
    shortcut() {
      return this.hotKey.concat(this.searchHistory)
    }
  },
  created() {
    this._getHotKey()
  },
  methods: {
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''

      this.$refs.searchResult.style.bottom = bottom
      this.$refs.result.refresh()

      this.$refs.shortcutWrapper.style.bottom = bottom
      this.$refs.shortcut.refresh()
    },
    selectKeyword(keyword) {
      this.saveSearchHistory(keyword)
      this.isResultShow = true
      this.$refs.searchBox.setQuery(keyword)
      this.$refs.result.getSearchResult(keyword)
    },
    showConfirm() {
      this.$refs.confirm.show()
    },
    searchBoxFocus() {
      this.isResultShow = false
      this.$refs.result.reset()
    },
    _getHotKey() {
      getHotKey().then((res) => {
        if (res.code === ERR_OK) {
          this.hotKey = res.result.hots
        }
      })
    },
    ...mapActions([
      'saveSearchHistory',
      'clearSearchHistory'
    ])
  },
  beforeRouteLeave(to, from, next) {
    this.$refs.searchBox.setQuery('')
    next()
  },
  watch: {
    query(newQuery) {
      if (!newQuery) {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }, 20)
      }
      if (newQuery === '') {
        this.$refs.result.reset()
      }
    }
  },
  components: {
    SearchBox,
    SearchList,
    Scroll,
    Confirm,
    Suggest,
    SearchResult
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"
@import "~common/stylus/mixin"

.search
  .search-box-wrapper
    margin: 20px
  .shortcut-wrapper
    position: fixed
    top: 165px
    bottom: 0
    width: 100%
    .shortcut
      height: 100%
      overflow: hidden
      .hot-key
        margin: 0 20px 20px 20px
        .title
          margin-bottom: 20px
          font-size: $font-size-medium
          color: $color-text-l
        .item
          display: inline-block
          padding: 5px 10px
          margin: 0 20px 10px 0
          border-radius: 6px
          background: $color-highlight-background
          font-size: $font-size-medium
          color: $color-text-d
      .search-history
        position: relative
        margin: 0 20px
        .title
          display: flex
          align-items: center
          height: 40px
          font-size: $font-size-medium
          color: $color-text-l
          .text
            flex: 1
          .clear
            extend-click()
            .icon-clear
              font-size: $font-size-medium
              color: $color-text-d
  .suggest-result, .search-result
    position: fixed
    width: 100%
    top: 165px
    bottom: 0
</style>