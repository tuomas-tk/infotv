<template lang="pug">
#app
  #left-block
    #announcement-container
      //img.full(src='/img/infotv.jpg')

      announcement-item(v-for='item in data.announcements', :item='item')

  #sidebar
    clock

  #bottom-bar
    | {{ message }}

</template>

<script>
import 'whatwg-fetch';

import Clock    from './clock.vue';
import AnnouncementItem from './announcement-item.vue';

var component = {
  components: {
    'clock': Clock,
    'announcement-item': AnnouncementItem
  },
  props: [
    'data'
  ],
  data: function () {
    return {
      message: 'Hello Vue!',
      items: [/*
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
        },
        {
          status: 'info',
          title: 'OPKH kokous',
          content: 'Luokassa 2 klo 12:00 Tää on vaan semmonen ei kovin tärkeä asia.'
        },
        {
          status: 'info',
          title: 'OPKH kokous',
          content: 'Luokassa 2 klo 12:00 Tää on vaan semmonen ei kovin tärkeä asia.'
        },
        {
          status: 'info',
          title: 'OPKH kokous',
          content: 'Luokassa 2 klo 12:00 Tää on vaan semmonen ei kovin tärkeä asia.'
        }
      */]
    };
  }
};


export default component;


</script>

<style>
html, body, #app
  padding: 0
  margin: 0
  height: 100%
  overflow: hidden

#app
  font-family: 'Roboto', sans-serif
  font-size: 2.4vh

#left-block
  display: inline-block
  vertical-align: top
  width: 65.625%  //
  height: 88.888% // RATIO 4:3

  background-color: #E0E0E0;

  #announcement-container

    width  100%
    height 100%

    img.full
      border-radius: 5px;
      width: 100%;
      height: 100%;


#sidebar
  display: inline-block;
  vertical-align: top;
  width: calc(34.375% - 2px);

  background-color: #F0F0F0;
  box-shadow: 0 -2px 7px #999999;
  border-left: 1px solid #AAAAAA;
  height: 88.888%;

#bottom-bar
  position: relative;
  z-index: 100;
  width: 100%;
  height: 11.111%;
  box-shadow: 0 0 1em rgba(0,0,0,0.4);

  background-color: #555555;
  color: #FFFFFF;

</style>
