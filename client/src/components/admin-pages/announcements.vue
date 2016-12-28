<template lang="pug">
#page
  .box
    h1 Announcements

    .btn(
      v-if='!creating',
      v-on:click='creating = true'
    ) Create new

    announcement-editable(
      v-else,
      v-bind:item='{status: \'normal\'}',
      v-on:creating-cancelled = 'creating = false'
      v-on:save = 'create'
    )


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
      error: '',
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
      console.log('create');
      this.creating = false;

      var t = this;
      fetch('/api/announcements/create', {
        method: 'PUT',
        body: JSON.stringify({
          title: item.title,
          content: item.content,
          status: item.status
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(function(response) {
          return response.json()
        }).then(function(json) {
          if (json.success) {
            t.load();
          } else {
            t.error += 'Server error 20: ' + json.data;
          }
        }).catch(function(ex) {
          console.log('parsing failed', ex)
          t.error += 'Server error 21';
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
          } else {
            t.error += 'Server error 20: ' + json.data;
          }
        }).catch(function(ex) {
          console.log('parsing failed', ex)
          t.error += 'Server error 21';
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
            console.log('success');
            t.load();
          } else {
            t.error += 'Server error 20: ' + json.data;
          }
        }).catch(function(ex) {
          console.log('parsing failed', ex)
          t.error += 'Server error 21';
        });
    },

    load: function () {
      var t = this;
      this.error = '';
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
          } else {
            t.error += 'Server error 20: ' + json.data;
          }
        }).catch(function(ex) {
          console.log('parsing failed', ex)
          t.error += 'Server error 21';
        });

      timeoutID = setTimeout(this.load, 10000);
    }
  },
  mounted: function () {
    this.load();
  }
};

</script>

<style scoped>

.btn
  display: inline-block
  // background-color: #0088b3
  border: 4px solid #0193c2
  border-radius: 2em
  padding: 0 1em
  line-height: 2em
  margin-bottom: 2em
  font-size: 1.2em
  color: #444444
  font-weight: 600

  cursor: pointer

  &:hover
    background-color: #c8e9f4
    text-decoration: underline


</style>
