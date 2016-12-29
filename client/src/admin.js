import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './components/app-admin.vue';
import Frontpage from './components/admin-pages/frontpage.vue';
import Announcements from './components/admin-pages/announcements.vue';
import Events from './components/admin-pages/events.vue';
import Preview from './components/admin-pages/preview.vue';

Vue.use(VueRouter);


const routes = [
  {
    path: '/',
    component: Frontpage
  }, {
    path: '/announcements',
    component: Announcements
  }, {
    path: '/events',
    component: Events
  }, {
    path: '/preview',
    component: Preview
  }
];


const router = new VueRouter({
  routes: routes
});


new Vue({
  router,
  el: 'app',
  components: {
    'app': App
  }
});
