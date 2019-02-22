<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>FindSong</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <createroom/>
    </v-toolbar>
    <router-view/>
  </v-app>
</template>

<script>

import createroom from '@/components/createroom.vue'

export default {
  name: 'App',
  components: {
    createroom
  },
  data () {
    return {
    }
  }
}
</script>
