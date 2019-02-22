<template>
    <v-card color="blue-grey darken-2" class="white--text ma-2">
      <v-card-title >
        <div>
          <div class="headline">{{room.name}}</div>
        </div>
      </v-card-title>
      <p v-if='room.player1'>Player 1 : {{room.player1}}</p>
      <p v-if='room.roomStatus'> {{room.player1Poin}} VS {{room.player2Poin}} </p>
      <p v-if='room.player2'>Player 2 : {{room.player2}}</p>
      <v-card-actions>
      <v-dialog v-model="join" persistent max-width="600px">
        <v-btn  v-if='!room.player1 || !room.player2' slot="activator" dark>Join</v-btn>
        <formjoinroom @closeDialog="closeDialog()" :roomdata='room'/>
    </v-dialog>
        <v-btn v-if='!room.player1 && !room.player2' flat dark @click.prevent="deleteroom">Delete</v-btn>
      </v-card-actions>
    </v-card>
</template>

<script>
import { db } from '@/api/firestore.js'
import formjoinroom from '@/components/formjoinroom.vue'
export default {
  name: 'eachroom',
  props: ['room'],
  components: {
    formjoinroom
  },
  data () {
    return {
      join: false
    }
  },
  methods: {
    joinRoom () {

    },
    deleteroom () {
      db.collection('rooms')
        .doc(this.room.id).delete().then(function () {
          console.log('Document successfully deleted!')
        }).catch(function (err) {
          console.error('Error removing document: ', err)
        })
    },
    closeDialog (payload) {
      this.join = payload
    }
  }
}
</script>

<style>

</style>
