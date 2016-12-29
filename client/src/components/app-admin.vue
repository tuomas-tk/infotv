<template lang="pug">
#app
  #header
    router-link(to='/')#logo infotv

    #navigation
      router-link(to='/') Home
      router-link(to='/announcements') Announcements
      router-link(to='/events') Events
      router-link(to='/preview') Preview the screen

  router-view(
    v-on:adderror   = 'addError'
    v-on:clearerror = 'clearError'
  )

  transition(name='fade')
    #error(v-if='errors.length > 0')
      .box
        h2(v-for='err in errors')
          | Error {{ err.code }}: {{ err.data }}

        p If this error happens often, please contact support.

        .btn.btn-blue(v-on:click='errors = []') OK

</template>

<script>
import VueRouter from 'vue-router';

export default {
  data: function () {
    return {
      errors: [{code: 100, data: 'App is not verified!'}]
    };
  },
  methods: {
    addError: function (data) {
      this.clearError([data.code]);
      this.errors.push({code: data.code, data: data.data});
    },
    clearError: function (data) {
      for (var data_i=0; data_i < data.length; data_i++) {

        for (var i=0; i < this.errors.length; i++) {
          if (this.errors[i].code === data[data_i]) {
            this.errors.splice(i, 1);
          }
        }

      }
    }
  }

};
</script>

<style>
html, body, #app
  padding: 0
  margin: 0

body
  font-family: 'Roboto', sans-serif
  font-size: 16px
  background-color: #E0E0E0

#header
  width: 100%
  height: 3em
  line-height: 3em
  background-color: #FFFFFF
  overflow: hidden;
  border-bottom: 1px solid #C0C0C0
  box-shadow: 0 -2px 7px #999999

  #logo
    display: inline-block
    vertical-align: top
    margin: 0
    padding: 0 1em 0 1em
    border-right: 1px solid #E0E0E0

    font-size: 2em
    line-height: 1.5em
    color: #333333
    font-weight: 300
    text-decoration: none

    &:hover
      text-decoration: underline
      background-color: #EEEEEE
      color: #000000

  #navigation
    display: inline-block
    vertical-align: top

    a
      display: inline-block
      height: 3em
      line-height: 3em
      text-decoration: none
      color: #222222
      padding: 0 0.7em
      border-right: 1px solid #E9E9E9

      &:hover
        text-decoration: underline
        background-color: #EEEEEE
        color: #000000

#page
  height: calc(100% - 3em);

  .box
    margin: 2em 2em
    border: 1px solid #B0B0B0
    border-radius: 1em
    padding: 1em 2em
    background-color: #FFFFFF
    box-shadow: 2px 2px 7px -2px #AAAAAA

  h1
    color: #333333
    font-weight: 400
    font-size: 2em
    padding-bottom: 0.3em
    border-bottom: 4px solid #F0F0F0

  h2
    color: #333333
    font-weight: 400
    font-size: 1.5em


#error
  position: fixed
  top: 0
  left: 0
  height: 100%
  width: 100%
  background-color: rgba(0, 0, 0, 0.2)

  .box
    position: fixed
    width: 50%
    top: 20%
    left: 25%

    padding: 1em 2em 2em 2em

    background-color: #FFFFFF
    border: 1px solid #AAAAAA
    border-radius: 0.5em
    box-shadow: 0 0.5em 2em -2px rgba(0,0,0,0.5)

    h2
      font-size: 1.5em
      color: #444444

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

hr
  border: 0
  border-top: 3px solid #E0E0E0
  margin-top: 1em
  margin-bottom: 2em


.btn
  display: inline-block
  cursor: pointer
  padding: 0.4em 1.2em
  margin: 1em 0

  box-shadow: 0 0.1em 0.4em -2px rgba(0,0,0,0.5)
  border-radius: 0.2em
  border: 1px solid #000000

  font-weight: 400

  &:hover
    text-decoration: underline;
    box-shadow: 0 0.1em 0.2em -2px rgba(0,0,0,0.5), 0 0 0.5em rgba(0,0,0,0.2) inset

  font-size: 1.3em
  &.btn-small
    font-size: 1em
  &.btn-large
    font-size: 1.6em

  &.btn-blue
    background-color: #008cff
    border-color: #0573cd
    color: #FFFFFF

    &:hover
      background-color: #097ede
      border-color: #0466b6



</style>
