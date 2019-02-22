<template>
  <div
    id="e3"
    style="max-width: 400px; margin: auto;"
    class="grey lighten-3"
  >
    <v-toolbar
      color="pink"
      dark
    >
      <v-toolbar-title>My Rooms</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card>
      <v-container
        fluid
        grid-list-lg
      >
        <eachroom v-for="room in this.$store.state.rooms" :key="room.id" :room='room'/>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import eachroom from '@/components/room.vue'
export default {
  name: 'room',
  components: {
    eachroom
  },
  created () {
    this.$store.dispatch('getAllRooms')
  }
}
</script>

<style>

</style>
