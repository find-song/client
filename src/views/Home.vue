<template>
   <v-container grid-list-md text-xs-center class="ma-4">
      <v-layout row wrap>
        <listroom class="ma-4"/>
      </v-layout>
    </v-container>
</template>

<script>
import listroom from '@/components/listRoom.vue'
export default {
  name: 'home',
  components: {
    listroom
  }
}
</script>

<style>

</style>
