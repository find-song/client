<template>
<div>
  <v-btn @click.prevent="playerStatus = true" color="info">Ready</v-btn>
  <v-btn @click.prevent="playerStatus = false" color="info">Cancel</v-btn>
    <v-card>
      <v-container
        fluid
        grid-list-lg
      >
        <v-layout row wrap>
          <v-flex xs12>
            <v-card color="blue-grey darken-2" class="white--text">
              <v-card-title primary-title>
                <div>
                  <div class="headline">SCORE</div>
                  <p>Your Win : {{playerWin}}</p>
                  <p>opponent Win : {{opponentWin}}</p>
                  <hr/>
                  <br>
                  <p>Poin: {{playerPoin}}</p>
                  <p>Poin opponent: {{opponentPoin}}</p>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
          </v-layout>
          </v-container>
          </v-card>

    <!-- <button @click.prevent="musicPlay = false"> stop</button> -->
    <!-- <button @click.prevent="next"> next</button> -->
    <div v-if="startTime">
      <v-card max-width="100px" flat color="transparent">
        <v-img  :src="storeNumber[Math.ceil(startTime / 2)-1]"/>
      </v-card>
    </div>

    <v-progress-circular
      v-if="loading"
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>

    <iframe
      v-if="musicPlay === true"
      :src="counter === 0 ? musics[total - 1] : musics[total]"
      allow="autoplay"
      style="display: none"
      id="iframeAudio"
    ></iframe>

    <div v-if="musicPlay === true">
      <v-card v-if="counter < 10" max-width="100px" color="transparent" flat>
        <v-img :src="numberLogo[9-counter]"/>
      </v-card>
      <v-card v-else max-width="100px" flat color="transparent">
        <v-img v-if="counter === 0" :src="numberLogo[9-counter]"/>
      </v-card>

    </div>

    <div v-if="musicPlay === true && canPick === true">
      <div v-for="(title,index) in randomAnswers" :key="index" >
         <v-btn color="cyan darken-1" v-if="index === correct" @click="next">{{randomAnswers[index]}}</v-btn>
        <v-btn color="cyan darken-1" v-else @click="wrong">{{randomAnswers[index]}}</v-btn>
      </div>
    </div>

</div>
</template>

<script>

import { db } from '@/api/firestore.js'
import { setInterval } from 'timers'
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
      newTitles: [],
      newMusics: [],
      correct: 0,
      playerPoin: 0,
      playerWin: 0,
      opponent: 0,
      opponentPoin: 0,
      opponentWin: 0,
      roomStatus: false,
      playerStatus: false,
      opponentStatus: false,
      loading: false,
      storeNumber: ['http://www.pngall.com/wp-content/uploads/2016/04/1-Number-PNG.png', 'https://cdn.pixabay.com/photo/2015/02/13/09/48/pay-634913__340.png', 'http://www.pngall.com/wp-content/uploads/2016/04/3-Number-PNG.png'],
      // showButton: false
      numberLogo: ['https://cdn3.iconfinder.com/data/icons/letters-and-numbers-1/32/number_9_blue-128.png', 'https://cdn3.iconfinder.com/data/icons/letters-and-numbers-1/32/number_8_blue-128.png', 'https://cdn3.iconfinder.com/data/icons/letters-and-numbers-1/32/number_7_blue-256.png', 'https://cdn3.iconfinder.com/data/icons/letters-and-numbers-1/32/number_6_blue-256.png', 'https://cdn3.iconfinder.com/data/icons/letters-and-numbers-1/32/number_5_blue-256.png', 'https://cdn3.iconfinder.com/data/icons/letters-and-numbers-1/32/number_4_blue-256.png', 'https://cdn3.iconfinder.com/data/icons/letters-and-numbers-1/32/number_3_blue-256.png', 'https://cdn3.iconfinder.com/data/icons/letters-and-numbers-1/32/number_2_blue-256.png', 'https://cdn3.iconfinder.com/data/icons/letters-and-numbers-1/32/number_1_blue-256.png', 'https://cdn3.iconfinder.com/data/icons/letters-and-numbers-1/32/number_0_blue-256.png'
      ]
    }
  },

  created () {
    this.playTime()
    db.collection('rooms')
      .doc(this.$route.params.roomId) // diambil dari create room
      .onSnapshot(doc => {
        console.log(doc.data())
        if (this.$route.params.player === 'player1') {
          this.username = doc.data().player1
          this.playerPoin = doc.data().player1Poin
          this.playerWin = doc.data().player1Win
          this.opponent = doc.data().player2
          this.opponentPoin = doc.data().player2Poin
          this.opponentWin = doc.data().player2Win
          this.opponentStatus = doc.data().player2Status
        } else {
          this.username = doc.data().player2
          this.playerPoin = doc.data().player2Poin
          this.playerWin = doc.data().player2Win
          this.opponent = doc.data().player1
          this.opponentPoin = doc.data().player1Poin
          this.opponentWin = doc.data().player1Win
          this.opponentStatus = doc.data().player1Status
        }
        this.titles = doc.data().titles
        this.musics = doc.data().musics
        this.roomStatus = doc.data().roomStatus
      })
  },

  watch: {
    counter (val) {
      if (val < 0) {
        if (this.total < 0) {
          this.loading = false
          if (this.playerPoin > this.opponentPoin) {
            this.playerWin++
            db.collection('rooms').doc(this.$route.params.roomId).update({
              player1Poin: 0,
              player2Poin: 0,
              roomStatus: false,
              player1Status: false,
              player2Status: false,
              [`${this.$route.params.player}Win`]: this.playerWin
            })
          } else if (this.playerPoin === this.opponentPoin) {
            db.collection('rooms').doc(this.$route.params.roomId).update({
              player1Poin: 0,
              player2Poin: 0,
              roomStatus: false,
              player1Status: false,
              player2Status: false,
              [`${this.$route.params.player}Win`]: this.playerWin
            })
          }
          this.musicPlay = false
          this.newMusics = []
          this.newTitles = []
          // db.collection('rooms').doc(this.$route.params.roomId)
        }
        this.counter = 10
        this.total--
        this.canPick = true
        this.randomAnswers = []
        if (this.titles) {
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
      }
    },

    roomStatus (val) {
      if (val === true) {
        this.startPlay()
      } else {
        this.musicPlay = false
        db.collection('rooms').doc(this.$route.params.roomId).update({
          player1Poin: 0,
          player2Poin: 0,
          musics: [],
          titles: []
        })
      }
    },

    playerStatus (val) {
      db.collection('rooms').doc(this.$route.params.roomId).update({
        [`${this.$route.params.player}Status`]: this.playerStatus
      })
        .then(() => {
          this.loading = true
          console.log('1')
          if (this.playerStatus === true && this.opponentStatus === true) {
            for (let i = 0; i < 10; i++) {
              this.music()
            }
          }
        })
    },

    opponentStatus (val) {
      console.log(this.playerWin)
      if (this.roomStatus === true && val === false) {
        this.playerWin++
        db.collection('rooms').doc(this.$route.params.roomId).update({
          player1Poin: 0,
          player2Poin: 0,
          [`${this.$route.params.player}Win`]: this.playerWin,
          roomStatus: false
        })
      }
    },

    newMusics (val) {
      console.log(val)
      if (val.length === 10) {
        db.collection('rooms').doc(this.$route.params.roomId).update({
          musics: this.newMusics,
          titles: this.newTitles
        })
          .then(() => {
            console.log('2')
            db.collection('rooms').doc(this.$route.params.roomId).update({
              roomStatus: true
            })
              .then(() => {
                console.log('3')
              })
          })
      }
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
          // console.log(this.titles, 'ini title')
          // console.log(this.music, 'ini music')
          this.newTitles.push(data[random].title)
          this.newMusics.push(data[random].preview)
        })
        .catch(err => {
          console.log(err.response)
          console.log(err)
        })
    },

    playTime () {
      this.counter = 10
      setInterval(() => {
        this.counter -= 1
        if (this.startTime > 0) {
          this.startTime--
        }
        if (this.counter < 0) {
          // clearInterval(intervalId)
        }
      }, 1000)
    },

    startPlay () {
      this.loading = false
      this.startTime = 6
      setTimeout(() => {
        this.randomAnswers[Math.floor(Math.random() * 4)] = this.titles[this.total]
        for (let i = 0; i < 4; i++) {
          let random = this.titles[Math.floor(Math.random() * this.titles.length)]
          if (!this.randomAnswers[i]) {
            this.randomAnswers[i] = random
          }
          this.musicPlay = true
          this.counter = 10
          this.canPick = true
        }
      }, this.startTime * 1000)
    },

    next () {
      this.playerPoin += 10
      this.canPick = false
      let thisplayerPoin = this.$route.params.player + 'Poin'
      db.collection('rooms').doc(this.$route.params.roomId).update({
        [thisplayerPoin]: this.playerPoin
      })
    },

    wrong () {
      this.canPick = false
      this.playerPoin -= 5
      let thisplayerPoin = this.$route.params.player + 'Poin'
      db.collection('rooms').doc(this.$route.params.roomId).update({
        [thisplayerPoin]: this.playerPoin
      })
    }

  }
}
</script>

<style>

</style>
