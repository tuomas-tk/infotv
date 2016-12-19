<template lang="pug">
#app
  #header
    router-link(to='/')#logo infotv

    #navigation
      router-link(to='/') Home
      router-link(to='/announcements') Announcements
      router-link(to='/events') Events
      router-link(to='/preview') Preview the screen

  router-view

</template>

<script>
import VueRouter from 'vue-router';

export default {
  data: function () {
    return {
      message: 'Hello Vue!',
      items: [
        {
          status: 'important',
          title: 'Muistakaa!',
          content: 'Huomenna tapahtuu jotain tärkeää!!'
        },
        {
          status: 'normal',
          title: 'Normaalin tason ilmoitus',
          content: ''
        },
        {
          status: 'info',
          title: 'OPKH kokous',
          content: 'Luokassa 2 klo 12:00 Tää on vaan semmonen ei kovin tärkeä asia.'
        }
      ]
    };
  }
};
</script>

<style>
html, body, #app
  padding: 0
  margin: 0
  height: 100%
  overflow: hidden

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


</style>
