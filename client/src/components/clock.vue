<template lang="pug">
.clock
  #date
    | {{ dayname }}, {{ day }}.{{ month }}.{{ year }}
  #time
    | {{ this.addzero(hour) }}:{{ this.addzero(minute) }}
    span#seconds
      | :{{ this.addzero(second) }}
</template>

<script>

export default {
  data: function () {
    return {
      dayname: '',
      day: 0,
      month: 0,
      year: 0,
      hour: 0,
      minute: 0,
      second: 0
    };
  },
  methods: {
    update: function () {
      var date = new Date();

      switch (date.getDay()) {
      case 0:
        this.dayname = 'Sunnuntai';
        break;
      case 1:
        this.dayname = 'Maanantai';
        break;
      case 2:
        this.dayname = 'Tiistai';
        break;
      case 3:
        this.dayname = 'Keskiviikko';
        break;
      case 4:
        this.dayname = 'Torstai';
        break;
      case 5:
        this.dayname = 'Perjantai';
        break;
      case 6:
        this.dayname = 'Lauantai';
        break;
      }

      this.month  = date.getMonth()+1;
      this.year   = date.getFullYear();
      this.day    = date.getDate();
      this.hour   = date.getHours();
      this.minute = date.getMinutes();
      this.second = date.getSeconds();

      setTimeout(this.update, 1000);
    },
    addzero: function(input) {
      if (input < 10) {
        return '0' + input;
      }
      return input;
    }
  },
  mounted: function() {
    this.update();
  }
};
</script>

<style scoped>
.clock
  background-color: #0083d6
  border-bottom: 1px solid darken(#0083d6, 5)
  padding-top: 1em
  padding-bottom: 1em
  text-align: center
  color: #FFFFFF
  font-weight: 500
  box-shadow: 5px 0 10px #888888
  text-shadow: 2px 2px 4px darken(#0083d6, 10)

  #date
    font-size: 1.8em

  #time
    font-size: 4em
    font-weight: 900

    #seconds
      padding-left: 3px
      font-size: 0.5em
      font-weight: 900
      color: #F0F0F0

</style>
