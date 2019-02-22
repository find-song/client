<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-btn
        slot="activator"
        color="red lighten-2"
        dark
      >
      <v-icon dark>add</v-icon>
      </v-btn>

      <v-card>
        <formcreate/>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import formcreate from '@/components/formcreate.vue'
export default {
  components: {
    formcreate
  },
  name: 'createroom',
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    setDialog (input) {
      this.dialog = input
      console.log('=================')
    }
  }
}
</script>
