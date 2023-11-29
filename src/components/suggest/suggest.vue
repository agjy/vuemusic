<template>
  <div ref="suggest" class="suggest">
    <ul class="suggest-list">
      <li @click="selectItem(query)" class="suggest-item">
        <div class="name">
          <p class="text query-text">搜索"{{query}}"</p>
        </div>
      </li>
      <li @click="selectItem(item.keyword)" class="suggest-item" v-for="(item, index) in suggest" :key="index">
        <div class="icon">
          <i class="icon-music"></i>
        </div>
        <div class="name">
          <p class="text" v-html="item.keyword"></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getSearchSuggest } from 'api/search'
import { ERR_OK } from 'api/http'

export default {
  props: {
    showSinger: {
      type: Boolean,
      default: true
    },
    query: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      page: 1,
      pullup: true,
      beforeScroll: true,
      suggest: [],
      singer: {},
      songs: [],
      isSearch: false
    }
  },
  methods: {
    search() {
      this.page = 1
      getSearchSuggest(this.query).then((res) => {
        if (res.code === ERR_OK) {
          this.suggest = res.result.allMatch
        }
      })
    },
    listScroll() {
      this.$emit('listScroll')
    },
    selectItem(keyword) {
      this.$emit('select', keyword)
    }
  },
  watch: {
    query(newQuery) {
      this.search(newQuery)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
        .query-text
          color: $color-theme
</style>