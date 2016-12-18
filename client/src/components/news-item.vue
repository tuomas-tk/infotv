<template lang="pug">

.news-item(v-bind:class='statusClass')
  .title
    | {{ item.title }}
  .content
    | {{ item.content }}

</template>

<script>
export default {
  props: ['item'],
  computed: {
    statusClass: function() {
      return {
        important: this.item.status=='important',
        normal:    this.item.status=='normal',
        info:      this.item.status=='info'
      };
    }
  }
};
</script>

<style scoped>
.news-item
  border-top: 1px solid #AAAAAA
  border-bottom: 1px solid #AAAAAA
  border-right: 1px solid #AAAAAA
  border-left: 0.7em solid white

  border-radius: 0.3em 1em 1em 0.3em

  margin: 1em 1.3em 1em 1em
  padding: 1em 0.5em 1em 1em

  box-shadow: 0 1px 4px #B0B0B0;
  background-color: #FFFFFF;

  &.info
    border-left-color: #999999
  &.normal
    border-left-color: #008cff
  &.important
    border-left-color: #ff6625


  .title
    font-size: 2em;

  .content
    color: #333333

</style>
