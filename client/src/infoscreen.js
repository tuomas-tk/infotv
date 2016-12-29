import Vue from 'vue';
import Infoscreen from './components/app-infoscreen.vue';


var vue = new Vue({
  el: 'app',
  components: {
    'app': Infoscreen
  },
  data: {
    data: {
      events: [],
      announcements: [],
      error: ''
    }
  },
  methods: {
    load: function () {
      var t = this;
      this.data.error = '';
      console.log('loading...');

      fetch('/api/events/list')
        .then(function(response) {
          return response.json();
        }).then(function(json) {
          if (json.success) {
            t.data.events = json.data;
          } else {
            t.data.error += 'Server error 10: ' + json.data;
          }
        }).catch(function(ex) {
          console.log('parsing failed', ex);
          t.data.error += 'Server error 11';
        });

      fetch('/api/announcements/list')
        .then(function(response) {
          return response.json();
        }).then(function(json) {
          if (json.success) {
            console.log(t.data.announcements);
            t.data.announcements = json.data;
          } else {
            t.data.error += 'Server error 20: ' + json.data;
          }
        }).catch(function(ex) {
          console.log('parsing failed', ex);
          t.data.error += 'Server error 21';
        });

      setTimeout(function() { vue.load(); }, 20000);

    }
  }
});

vue.load();
