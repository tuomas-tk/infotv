<template lang="pug">
.container
  .fixed(v-if='!editing')
    .item(v-bind:class='statusClass')
      .title
        | {{ item.title }}
      .content
        | {{ item.content }}
    .actions
      .action(@click='moveup', v-bind:class='{disabled: firstlast.first}') Move up
      .action(@click='edit') Edit
      .action(@click='remove') Delete
      .action(@click='movedown', v-bind:class='{disabled: firstlast.last}') Move down

  .edit(v-else)
    .item(v-bind:class='statusClass')
      .label Title:
      input.input-title(v-model='input_title')
      .label Content:
      textarea.input-content(v-model='input_content')

      .label Status:
      .radiorow
        input(type='radio' id='status_info' value='info' v-model='input_status')
        label(for='status_info') Info
      .radiorow
        input(type='radio' id='status_normal' value='normal' v-model='input_status')
        label(for='status_normal') Normal
      .radiorow
        input(type='radio' id='status_important' value='important' v-model='input_status')
        label(for='status_important') Important

    .actions
      .action(@click='cancel') Cancel
      .action(@click='save') Save

</template>

<script>
export default {
  props: ['item', 'firstlast'],
  data: function() {
    return {
      'editing': this.item.id == undefined,
      'input_title': this.item.title,
      'input_content': this.item.content,
      'input_status': this.item.status
    };
  },
  computed: {
    statusClass: function() {
      return this.editing ? this.input_status : this.item.status;
    }
  },
  methods: {
    edit: function () {
      this.editing = true;
      this.input_title   = this.item.title;
      this.input_content = this.item.content;
      this.input_status  = this.item.status;
    },
    cancel: function () {
      this.editing = false;

      if (this.item.id == undefined) {
        this.$emit('creating-cancelled');
      }
    },
    save: function (event) {
      this.$emit('save', {
        id: this.item.id,
        title: this.input_title,
        content: this.input_content,
        status: this.input_status,
        sort: this.item.sort
      });
      this.editing = false;
    },
    moveup: function (event) {
      this.$emit('moveup', this.item.id);
    },
    movedown: function (event) {
      this.$emit('movedown', this.item.id);
    },
    remove: function (event) {
      this.$emit('remove', this.item.id);
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

    .action
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

      &.disabled
        color: #AAAAAA
        cursor: default
        &:hover
          text-decoration: none
          background-color: #E0E0E0


  .edit
    .item
      .label
        font-weight: 600
        color: #555555

      .input-title, .input-content
        width: 90%
        padding: 0.4em 0.4em
        margin-bottom: 1em
        font-family: inherit

      .input-title
        font-size: 1.3em
        font-weight: 500

      .input-content
        resize: vertical
        min-height: 6em
        font-size: 1.1em

      .radiorow
        margin-top: 0.5em
        input
          vertical-align: -3px
        label
          display: inline-block
          padding-left: 0.4em
          font-size: 1.1em

    .actions
      .action
        width: 50%

</style>
