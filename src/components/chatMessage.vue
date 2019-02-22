<template>
  <v-container>
    <form @submit.prevent="createMessage">
      <div class="form-group">
        <input
          type="text"
          name="message"
          class="form-control"
          placeholder="Enter message ..."
          v-model="newMessage"
        >
        <p class="text-danger" v-if="errorText">{{ errorText }}</p>
      </div>

      <button class="btn btn-primary" type="submit" name="action">Submit</button>
    </form>
  </v-container>
</template>

<script>
import { db } from '@/api/firestore.js'

export default {
  name: 'ChatMessage',
  data () {
    return {
      newMessage: null,
      errorText: null
    }
  },
  methods: {
    createMessage () {
      if (this.newMessage) {
        db.collection('messages')
          .add({
            message: this.newMessage,
            name: 'Anonymous',
            timestamp: Date.now()
          })
          .catch(err => {
            console.log(err)
          })
        this.newMessage = null
        this.errorText = null
      } else {
        this.errorText = 'A message must be entered!'
      }
    }
  }
}
</script>

<style>
</style>
