import Vue from 'vue';
import Infoscreen from './components/app-infoscreen.vue';


var vue = new Vue({
  el: 'app',
  components: {
    'app': Infoscreen
  }
});
