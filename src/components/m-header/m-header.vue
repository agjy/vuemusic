<template>
  <div class="m-header">
    <router-link to="/user" class="mine" tag="div">
      <i class="icon-mine"></i>
    </router-link>
    <div class="icon"></div>
    <h1 class="text">Vue Music</h1>
  </div>
</template>

<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"

  .m-header
    position: relative
    height 44px
    text-align center
    color: $color-theme
    font-size: 0
    .icon
      display: inline-block
      vertical-align: top
      margin-top: 6px
      width: 32px
      height: 32px
      margin-right: 9px
      bg-image('logo')
      background-size: 32px 32px
    .text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large
    .mine
      position: absolute
      top: 0
      left: 0
      .icon-mine
        display: block
        padding: 12px
        font-size: 20px
        color: $color-theme
</style>
