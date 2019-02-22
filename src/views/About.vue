<template>
  <v-container fluid class="mt-5">
    <v-layout row>
      <v-flex pa-1>
        <v-card dark height="100%">
          <h1>Chat Room</h1>
          <p v-if="messages.length == 0">[No messages yet]</p>
          <div class="messages">
            <div v-for="message in messages" :key="message.id">
              <span class="text-info">[{{ message.name }}]:</span>
              <span>{{message.message}}</span>
              <span class="text-secondary time">{{message.timestamp}}</span>
            </div>
          </div>
          <div class="card-action">
            <chatMessage />
          </div>
        </v-card>
      </v-flex>

      <v-flex xs9 pa-1>
        <v-card dark color="green darken-1" height="800px">
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
import chatMessage from '@/components/chatMessage.vue'
import boxmusic from '@/components/boxmusic.vue'
import { db } from '@/api/firestore.js'

export default {
  name: 'game',
  components: {
    boxmusic,
    chatMessage
  },
  data () {
    return {
      messages: []
    }
  },
  created () {
    const obs = db.collection('messages')
    obs.onSnapshot(qSnap => {
      qSnap.docChanges().forEach(change => {
        if (change.type === 'added') {
          let doc = change.doc
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            message: doc.data().message
          })
        }
      })
    })
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
      db.collection('rooms')
        .doc('this.$route.params.roomId')
        .update({
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
