<template lang="pug">
#page

  #preview
    iframe(src='/infoscreen')

</template>

<script>
import VueRouter from 'vue-router';

export default {
};
</script>

<style>
#preview
  margin: 1em auto
  border: 1em solid #333333
  border-radius: 0.5em;
  height: calc(100vh - 3em - 4em);
  width: calc(( 100vh - 3em - 4em ) * 1.7777778 )
  box-shadow: 0 2px 10px -2px #000000;

  iframe
    width: 100%
    height: 100%
    border: 0
</style>
