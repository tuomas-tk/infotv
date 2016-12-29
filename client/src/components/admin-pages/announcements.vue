<template lang="pug">
#page
  .box
    h1 Announcements

    .btn.btn-blue(
      v-if='!creating',
      @click='creating = true'
    ) Create new

    announcement-editable(
      v-else,
      :item='{status: \'normal\'}',
      @creating-cancelled = 'creating = false'
      @save = 'create'
    )

    hr

    announcement-editable(
      v-for='(item, index) in announcements',
      :item = 'item',
      :firstlast = '{first: index === 0, last: index === announcements.length-1}',
      :key = 'item.id',
      @save   = 'save',
      @remove = 'remove',
      @moveup = 'moveup',
      @movedown = 'movedown'
    )


</template>

<script>
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
    moveup: function (up_id) {
      var up_item, down_item;

      for (var i=1; i < this.announcements.length; i++) { // Finding the actual items
        if (this.announcements[i].id === up_id) {
          up_item = this.announcements[i];
          down_item = this.announcements[i-1];
          break;
        }
      }
      if (up_item == undefined || down_item == undefined) return; // if item not found -> cancel
      this.moveupanddown(up_item, down_item);

    },
    movedown: function (down_id) {
      var up_item, down_item;

      for (var i=0; i < this.announcements.length-1; i++) { // Finding the actual items
        if (this.announcements[i].id === down_id) {
          down_item = this.announcements[i];
          up_item = this.announcements[i+1];
          break;
        }
      }
      if (up_item == undefined || down_item == undefined) return; // if item not found -> cancel
      this.moveupanddown(up_item, down_item);
    },
    moveupanddown: function (up_item, down_item) {
      this.save({ // Saving up_item
        id:     up_item.id,
        title:  up_item.title,
        content:up_item.content,
        status: up_item.status,
        sort: down_item.sort       // !!
      });
      this.save({ // Saving down_item
        id:     down_item.id,
        title:  down_item.title,
        content:down_item.content,
        status: down_item.status,
        sort:     up_item.sort     // !!
      });
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
        headers: {'Content-Type': 'application/json'}
      }).then(function(response) {
        return response.json();
      }).then(function(json) {
        if (json.success) {
          t.load();
          t.$emit('clearerror', [510, 511]);
        } else {
          t.$emit('adderror', {code: 510, data: json.data});
        }
      }).catch(function() {
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
        headers: {'Content-Type': 'application/json'}
      }).then(function(response) {
        return response.json();
      }).then(function(json) {
        if (json.success) {
          t.load();
          t.$emit('clearerror', [520, 521]);
        } else {
          t.$emit('adderror', {code: 520, data: json.data});
        }
      }).catch(function() {
        t.$emit('adderror', {code: 521, data: 'Saving failed (Can\'t connect to server)'});
      });
    },
    remove: function (id) {
      var t = this;
      fetch('/api/announcements/delete', {
        method: 'delete',
        body: '{"id": "' + id + '"}',
        headers: {'Content-Type': 'application/json'}
      }).then(function(response) {
        return response.json();
      }).then(function(json) {
        if (json.success) {
          t.load();
          t.$emit('clearerror', [530, 531]);
        } else {
          t.$emit('adderror', {code: 530, data: json.data});
        }
      }).catch(function() {
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
          return response.json();
        }).then(function(json) {
          if (json.success) {
            t.announcements = json.data;
            t.$emit('clearerror', [500, 501]);
          } else {
            t.announcements = {};
            t.$emit('adderror', {code: 500, data: json.data});
          }

        }).catch(function() {
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
