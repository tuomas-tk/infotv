<template lang="pug">
#page
  .box
    h1 Announcements

    .btn.btn-blue(
      v-if='!creating',
      v-on:click='creating = true'
    ) Create new

    announcement-editable(
      v-else,
      v-bind:item='{status: \'normal\'}',
      v-on:creating-cancelled = 'creating = false'
      v-on:save = 'create'
    )

    hr

    announcement-editable(
      v-for='item in announcements',
      v-bind:item = 'item',
      v-on:save   = 'save',
      v-on:remove = 'remove'
    )


</template>

<script>
import VueRouter from 'vue-router';
import AnnouncementEditable from './components/announcement-editable.vue';

var timeoutID;

export default {
  components: {
    'announcement-editable': AnnouncementEditable
  },
  data: function () {
    return {
      announcements: [],
      creating: false
    };
  },
  methods: {
    moveup: function (id) {
      console.log('move UP: ' + id);
    },
    movedown: function (id) {
      console.log('move DOWN: ' + id);
    },
    create: function (item) {
      this.creating = false;
      var t = this;

      fetch('/api/announcements/create', {
        method: 'PUT',
        body: JSON.stringify({
          title: item.title,
          content: item.content,
          status: item.status
        }),
        headers: {"Content-Type": "application/json"}
      }).then(function(response) {
          return response.json()
        }).then(function(json) {
          if (json.success) {
            t.load();
            t.$emit('clearerror', [510, 511]);
          } else {
            t.$emit('adderror', {code: 510, data: json.data});
          }
        }).catch(function(ex) {
          t.$emit('adderror', {code: 511, data: 'Creating failed (Can\'t connect to server)'});
        });
    },
    save: function (item) {
      console.log('save');
      console.log(item);

      var t = this;
      fetch('/api/announcements/edit', {
        method: 'POST',
        body: JSON.stringify({
          id: item.id,
          title: item.title,
          content: item.content,
          status: item.status,
          sort: item.sort
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function(response) {
          return response.json()
        }).then(function(json) {
          if (json.success) {
            t.load();
            t.$emit('clearerror', [520, 521]);
          } else {
            t.$emit('adderror', {code: 520, data: json.data});
          }
        }).catch(function(ex) {
          t.$emit('adderror', {code: 521, data: 'Saving failed (Can\'t connect to server)'});
        });
    },
    remove: function (id) {
      var t = this;
      fetch('/api/announcements/delete', {
        method: 'delete',
        body: '{"id": "' + id + '"}',
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function(response) {
          return response.json()
        }).then(function(json) {
          if (json.success) {
            t.load();
            t.$emit('clearerror', [530, 531]);
          } else {
            t.$emit('adderror', {code: 530, data: json.data});
          }
        }).catch(function(ex) {
          t.$emit('adderror', {code: 531, data: 'Deleting failed (Can\'t connect to server)'});
        });
    },

    load: function () {
      var t = this;
      console.log('loading...');

      if (timeoutID != undefined) {
        clearTimeout(timeoutID);
      }

      fetch('/api/announcements/list')
        .then(function(response) {
          return response.json()

        }).then(function(json) {
          if (json.success) {
            t.announcements = json.data;
            t.$emit('clearerror', [500, 501]);
          } else {
            t.announcements = {};
            t.$emit('adderror', {code: 500, data: json.data});
          }

        }).catch(function(ex) {
          t.announcements = {};
          t.$emit('adderror', {code: 501, data: 'Can\'t connect to server'});

        }).then(function() {
          timeoutID = setTimeout(t.load, 10000);
        });

    }
  },
  mounted: function () {
    this.load();
  },
  beforeRouteLeave: function (to, from, next) {
    if (timeoutID != undefined) {
      clearTimeout(timeoutID);
    }
    next();
  }
};

</script>

<style scoped>

</style>
