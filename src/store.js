import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '@/api/firestore.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    rooms: []
  },
  mutations: {
    getAllRooms (state, payload) {
      state.rooms = payload
    }
  },
  actions: {
    getAllRooms ({ commit }) {
      db.collection('rooms').onSnapshot((docs) => {
        let roomsResult = []
        docs.forEach(doc => {
          roomsResult.push({ id: doc.id, ...doc.data() })
        })
        commit('getAllRooms', roomsResult)
      })
    }
  }
})
