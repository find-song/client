<template>
  <v-form v-model="valid">
    <v-container>
      <v-layout>
        <v-flex
          xs12
          md4
        >
          <v-text-field
            v-model="name"
            :rules="nameRules"
            :counter="10"
            label="Write Your Room Name"
            required
          ></v-text-field>
            <v-btn flat small color="primary" @click.prevent='create'>Create</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import { db } from '@/api/firestore.js'
export default {
  name: 'formcreate',
  data () {
    return {
      valid: false,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => v.length <= 10 || 'Name must be less than 10 characters'
      ]
    }
  },
  methods: {
    create () {
      db.collection('rooms').add({
        name: this.name,
        create_at: new Date(),
        player1: '',
        player2: '',
        player1Poin: 0,
        player2Poin: 0,
        player1Win: 0,
        player2Win: 0,
        player1Status: false,
        player2Status: false,
        roomStatus: false
      })
        .then(() => {
          console.log('created data')
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
