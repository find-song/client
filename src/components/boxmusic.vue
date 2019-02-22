<template>
<div>
  <v-btn @click.prevent="startPlay" color="info">Start</v-btn>
 Score: {{playerPoin}}
 Score opponent: {{opponentScore}}
    <!-- <button @click.prevent="musicPlay = false"> stop</button> -->
    <!-- <button @click.prevent="next"> next</button> -->
    <div v-if="startTime">
      <v-card max-width="100px" color="transparent">
        <v-img :src="storeNumber[Math.ceil(startTime / 2)-1]"/>
      </v-card>
    </div>
    <iframe
      v-if="musicPlay === true"
      :src="counter === 0 ? musics[total - 1] : musics[total]"
      allow="autoplay"
      style="display: none"
      id="iframeAudio"
    ></iframe>
    <div v-if="musicPlay === true && canPick === true">
      <div v-for="(title,index) in randomAnswers" :key="index" >
         <v-btn color="cyan darken-1" v-if="index === correct" @click="next">{{randomAnswers[index]}}</v-btn>
        <v-btn color="cyan darken-1" v-else @click="wrong">{{randomAnswers[index]}}</v-btn>
      </div>
    </div>

    <div v-if="musicPlay === true">{{counter}}</div>
</div>
</template>

<script>

import { db } from '@/api/firestore.js'
import axios from 'axios'
export default {
  name: 'boxmusic',
  data () {
    return {
      number: '',
      username: 'maria', // diambil dari state
      messages: [],
      send: '',
      song: [
        'tulus',
        'raisa',
        'afgan',
        'isyana sarasvati',
        'payung teduh',
        'fourtwenty',
        'brisia jodie',
        'hivi',
        'sheila on 7',
        'ada band'
      ],
      musicLink: '',
      titles: [],
      musics: [],
      counter: 0,
      answerTime: 0,
      total: 9,
      musicPlay: false,
      randomAnswers: [],
      startTime: 0,
      canPick: false,
      correct: 0,
      playerPoin: 0,
      playerWin: 0,
      opponent: 0,
      opponentScore: 0,
      opponentWin: 0,
      storeNumber: ['http://www.pngall.com/wp-content/uploads/2016/04/1-Number-PNG.png', 'https://cdn.pixabay.com/photo/2015/02/13/09/48/pay-634913__340.png', 'http://www.pngall.com/wp-content/uploads/2016/04/3-Number-PNG.png']
    }
  },

  created () {
    db.collection('rooms')
      .doc(this.$route.params.roomId) // diambil dari create room
      .onSnapshot(doc => {
        console.log(doc.data())
        if (this.$route.params.player === 'player1') {
          this.username = doc.data().player1
          this.playerPoin = doc.data().player1Poin
          this.playerWin = doc.data().player1Win
          this.opponent = doc.data().player2
          this.opponentScore = doc.data().player2Poin
          this.opponentWin = doc.data().player2Win
        } else {
          this.username = doc.data().player2
          this.playerPoin = doc.data().player2Poin
          this.playerWin = doc.data().player2Win
          this.opponent = doc.data().player1
          this.opponentScore = doc.data().player1Poin
          this.opponentWin = doc.data().player1Win
        }
        this.musics = []
        for (let i = 0; i < 10; i++) {
          this.music()
        }
        this.playTime()
      })
  },

  watch: {
    counter (val) {
      if (val < 0) {
        if (this.total < 0) {
          this.musicPlay = false
          console.log('===')
          // db.collection('rooms').doc(this.$route.params.roomId)
        }
        this.counter = 5
        this.total--
        this.canPick = true
        this.randomAnswers = []
        this.randomAnswers[Math.floor(Math.random() * 4)] = this.titles[this.total]
        for (let i = 0; i < 4; i++) {
          let random = Math.floor(Math.random() * this.titles.length)
          let randomTitle = this.titles[random]
          if (!this.randomAnswers[i]) {
            this.randomAnswers[i] = randomTitle
          } else {
            this.correct = i
          }
        }
      }
    },

    randomAnswers (val) {
      console.log(val)
    }
  },
  methods: {
    music () {
      axios
        .get(
          'https://deezerdevs-deezer.p.rapidapi.com/search?q=' +
            this.song[Math.floor(Math.random() * (this.song.length))],
          {
            headers: {
              'X-RapidAPI-Key':
                'QKEExjDMUgmshaUir66B2BjsvQ64p1IygALjsn8aBs19syGJVK',
              Accept: 'text/plain'
            }
          }
        )
        .then(({ data: { data } }) => {
          let random = Math.floor(Math.random() * 2)
          this.titles.push(data[random].title)
          this.musics.push(data[random].preview)
          db.collection('rooms').doc(this.$route.params.roomId).update({

          })
        })
        .catch(err => {
          console.log(err.response)
          console.log(err)
        })
    },

    playTime () {
      this.counter = 5
      let intervalId = setInterval(() => {
        this.counter -= 1
        if (this.startTime > 0) {
          this.startTime--
        }
        if (this.counter < 0) {
          clearInterval(intervalId)
        }
      }, 1000)
    },

    startPlay () {
      this.startTime = 6
      setTimeout(() => {
        this.randomAnswers[Math.floor(Math.random() * 4)] = this.titles[this.total]
        for (let i = 0; i < 4; i++) {
          let random = this.titles[Math.floor(Math.random() * this.titles.length)]
          if (!this.randomAnswers[i]) {
            this.randomAnswers[i] = random
          }
          this.musicPlay = true
          this.counter = 5
          this.canPick = true
        }
      }, this.startTime * 1000)
    },

    next () {
      this.playerPoin += 10
      this.total--
      this.counter = 5
      this.canPick = true
      this.randomAnswers = []
      this.randomAnswers[Math.floor(Math.random() * 4)] = this.titles[this.total]
      for (let i = 0; i < 4; i++) {
        let random = Math.floor(Math.random() * this.titles.length)
        let randomTitle = this.titles[random]
        if (!this.randomAnswers[i]) {
          this.randomAnswers[i] = randomTitle
        } else {
          this.correct = i
        }
      }
      let thisplayerPoin = this.$route.params.player + 'Poin'
      db.collection('rooms').doc(this.$route.params.roomId).update({
        [thisplayerPoin]: this.playerPoin
      })
    },

    wrong () {
      this.canPick = false
      this.playerPoin -= 5
    }

  }
}
</script>

<style>

</style>
