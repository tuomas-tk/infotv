<template lang="pug">
#app
  #left-block
    #announcement-container
      //img.full(src='/img/infotv.jpg')

      announcement-item(v-for='item in announcements', :item='item')

  #sidebar
    clock

  #bottom-bar
    | {{ message }}

  transition(name='fade')
    #error(v-if='error')
      .box
        h2 {{ error }}
        p This message will disappear automatically when connection to the server is possible
        p If this error happens often, please contact support.


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
  data: function () {
    return {
      message: 'Hello Vue!',
      announcements: [],
      events: [],
      error: ''
    };
  },
  methods: {
    load: function () {
      var t = this;
      console.log('loading...');

      fetch('/api/events/list')
        .then(function(response) {
          return response.json();
        }).then(function(json) {
          if (json.success) {
            t.events = json.data;
            t.error = '';
          } else {
            t.error = 'Server error 10: ' + json.data;
          }
        }).catch(function() {
          t.error = 'Can\'t connect to the server';
        });

      fetch('/api/announcements/list')
        .then(function(response) {
          return response.json();
        }).then(function(json) {
          if (json.success) {
            t.announcements = json.data;
            t.error = '';
          } else {
            t.error = 'Server error 20: ' + json.data;
          }
        }).catch(function() {
          t.error = 'Can\'t connect to the server';
        }).then(function() {
          setTimeout(t.load, 20000);
        });

    }
  },
  mounted: function () {
    this.load();
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
    top: 25%
    left: 25%

    padding: 1em 2em 2em 2em

    background-color: #FFFFFF
    border: 1px solid #AAAAAA
    border-radius: 0.5em
    box-shadow: 0 0.5em 2em -2px rgba(0,0,0,0.5)

    h2
      font-size: 2em
      color: #444444
    p
      font-size: 1.5em

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}

</style>
