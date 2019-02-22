<template>
<v-container fluid class="mt-5">
    <v-layout row>
      <v-flex
        pa-1
      >
        <v-card
          dark
          color="green darken-3"
          height="100%"
        >
          <v-card-text>Chat Room</v-card-text>
        </v-card>
      </v-flex>
      <v-flex
        xs9
        pa-1
      >
        <v-card
          dark
          color="green darken-1"
          height=800px
        >
          <v-card-text>Main Area</v-card-text>
          <boxmusic/>
        </v-card>
      </v-flex>
    </v-layout>
     <v-btn fab dark small color="primary" @click.prevent="leave">
      <v-icon dark>remove</v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import boxmusic from '@/components/boxmusic.vue'
import { db } from '@/api/firestore.js'
export default {
  name: 'game',
  components: {
    boxmusic
  },
  methods: {
    leave () {
      // console.log(this.$route.params.roomaId)
      // console.log(this.$route.params.name)
      let player = ''
      if (this.$routes.params.player) {
        player = 'player1'
      } else {
        player = 'player2'
      }
      db.collection('rooms').doc('this.$route.params.roomId').update({
        [player]: ''
      })
        .then(() => {
          console.log('leave room')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
