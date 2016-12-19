<template lang="pug">
#page

  #preview
    infoscreen

</template>

<script>
import VueRouter from 'vue-router';
import InfoScreen from '../app-infoscreen.vue';

export default {
  components: {
    'infoscreen': InfoScreen
  },
  data: function () {
    return {
      message: 'Hello Vue!'
    };
  }
};
</script>

<style>
#preview
  margin: 1em auto
  border: 1em solid #333333
  border-radius: 0.5em;
  height: calc(100vh - 3em - 4em);
  width: calc(( 100vh - 3em - 4em ) * 1.77777 )
  box-shadow: 0 2px 10px -2px #000000;

  #app
    font-size: calc(( 100vh - 3em - 4em ) * 0.024 )
</style>
