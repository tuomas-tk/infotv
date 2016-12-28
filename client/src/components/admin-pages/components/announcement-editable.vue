<template lang="pug">
.container
  .fixed(v-if='!editing')
    .item(v-bind:class='statusClass')
      .title
        | {{ item.title }}
      .content
        | {{ item.content }}
    .actions
      .button(v-on:click='moveup') Move up
      .button(v-on:click='edit') Edit
      .button(v-on:click='remove') Delete
      .button(v-on:click='movedown') Move down

  .edit(v-else)
    .item(v-bind:class='statusClass')
      .label Title:
      input(v-model='input_title')
      .label Content:
      textarea(v-model='input_content')

      input(type='radio' id='status_info' value='info' v-model='input_status')
      label(for='status_info') Info
      input(type='radio' id='status_normal' value='normal' v-model='input_status')
      label(for='status_normal') Normal
      input(type='radio' id='status_important' value='important' v-model='input_status')
      label(for='status_important') Important

    .actions
      .button(v-on:click='cancel') Cancel
      .button(v-on:click='save') Save

</template>

<script>
export default {
  props: ['item'],
  data: function() {
    return {
      'editing': false,
      'input_title': this.item.title,
      'input_content': this.item.content,
      'input_status': this.item.status
    };
  },
  computed: {
    statusClass: function() {
      if (!this.editing) {
        return this.item.status;
      } else {
        return this.input_status;
      }
    }
  },
  methods: {
    edit: function () {
      this.editing = true;
    },
    cancel: function () {
      this.editing = false;
    },
    save: function (event) {
      var t = this;
      fetch('/api/announcements/edit', {
        method: 'POST',
        body: JSON.stringify({
          id: this.item.id,
          title: this.input_title,
          content: this.input_content,
          status: this.input_status
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function(response) {
          return response.json()
        }).then(function(json) {
          if (json.success) {
            t.editing = false;
            t.$emit('reload');
          } else {
            t.error += 'Server error 20: ' + json.data;
          }
        }).catch(function(ex) {
          console.log('parsing failed', ex)
          t.error += 'Server error 21';
        });

    },
    moveup: function (event) {

    },
    movedown: function (event) {

    },
    remove: function (event) {
      var t = this;
      fetch('/api/announcements/delete', {
        method: 'delete',
        body: '{"id": "' + this.item.id + '"}',
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function(response) {
          return response.json()
        }).then(function(json) {
          if (json.success) {
            console.log('success');
            t.$emit('reload');
          } else {
            t.error += 'Server error 20: ' + json.data;
          }
        }).catch(function(ex) {
          console.log('parsing failed', ex)
          t.error += 'Server error 21';
        });
    }
  }
};
</script>

<style scoped>
.container
  max-width: 900px

  .item
    border-top: 1px solid #AAAAAA
    border-bottom: 1px solid #AAAAAA
    border-right: 1px solid #AAAAAA
    border-left: 0.7em solid white

    border-radius: 0.3em 1em 1em 0.3em

    margin: 0
    padding: 1em 0.5em 1em 1em

    box-shadow: 0 1px 4px #B0B0B0
    background-color: #FFFFFF

    &.info
      border-left-color: #999999
    &.normal
      border-left-color: #008cff
    &.important
      border-left-color: #ff6625


    .title
      font-size: 2em

    .content
      color: #333333



  .actions
    margin: 0 3em 3em 3em
    border: 1px solid #AAAAAA
    border-top: 0
    border-radius: 0 0 1em 1em

    background-color: #E0E0E0
    box-shadow: 0 1px 4px #B0B0B0

    overflow: hidden

    .button
      display: inline-block
      width: 25%

      font-size: 1.2em
      line-height: 2em
      text-align: center
      font-weight: 600
      color: #333333

      cursor: pointer

      &:hover
          text-decoration: underline
          background-color: #D0D0D0






</style>
