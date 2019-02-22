<template>
  <v-card>
    <v-card-title>
      <span class="headline">Join room?</span>
    </v-card-title>
    <v-card-text>
      <v-container grid-list-md>
        <v-layout wrap>
          <v-flex xs12 sm6 md4>
            <v-text-field label="your name" required v-model="name"></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" flat @click.prevent="closeDialog()">Cancel</v-btn>
      <v-btn color="blue darken-1" flat @click.prevent="joinGame()">Join</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { db } from '@/api/firestore.js'
export default {
  name: 'formjoinroom',
  props: ['roomdata'],
  data () {
    return {
      name: ''
    }
  },
  methods: {
    closeDialog () {
      this.$emit('closeDialog', false)
    },
    joinGame () {
      // this.$store.commit('getName', this.name)
      // this.name = '';
      // console.log(this.roomdata);
      let player = ''
      if (this.roomdata.player1 !== '') {
        player = 'player2'
        this.$router.push({
          name: 'game',
          params: {
            roomId: `${this.roomdata.id}`,
            player: `player2`
          }
        })
      } else {
        player = 'player1'
        this.$router.push({
          name: 'game',
          params: {
            roomId: `${this.roomdata.id}`,
            player: `player1`
          }
        })
      }
      db.collection('rooms')
        .doc(this.roomdata.id)
        .update({
          [player]: this.name
        })
        .then(data => {
          console.log('data updated')

          this.closeDialog()
        })
        .catch(err => {
          console.log(err)
          this.closeDialog()
        })
      console.log(this.roomdata)
    }
  }
}
</script>

<style>
</style>
