<template>
  <section class="section">
    <div class="container is-centered">

      <h2 class="subtitle">Response</h2>
      <p>{{ data }}</p>

      <b-field>
        <b-upload v-model="dropFiles"
                  accept="image/*"
                  drag-drop>
          <section class="section">
            <div class="content has-text-centered">
              <p>
                <b-icon icon="upload"
                        size="is-large">
                </b-icon>
              </p>
              <p>Click or drop, both also can</p>
            </div>
          </section>
        </b-upload>
      </b-field>

      <div class="tags">
        <span v-for="(file, index) in dropFiles"
              :key="index"
              class="tag is-primary">
          {{file.name}}
          <button class="delete is-small"
                  type="button"
                  @click="deleteDropFile(index)">
          </button>
        </span>
      </div>

      <button class="button is-primary"
              @click="sendToAzure">Ok steady</button>
    </div>
  </section>
</template>

<script>
require('dotenv').config()
import axios from 'axios'

export default {
  data () {
    return {
      data: null,
      dropFiles: [],
      name: 'kaixiang',
      url: process.env.FACIAL_RECOGNITION_URL
    }
  },
  methods: {
    deleteDropFile (index) {
      this.dropFiles.splice(index, 1)
    },
    sendToAzure () {
      if (this.dropFiles.length === 0) {
          this.$toast.open({
            duration: 5000,
            message: `Eh, kosong la sial`,
            type: 'is-danger'
          })
        return
      }
      axios.post(
        `${this.url}${this.name}`,
        this.dropFiles[0],
        {
          headers: {
            'Ocp-Apim-Subscription-Key': process.env.FACIAL_RECOGNITION_KEY,
            'Content-Type': 'application/octet-stream'
          }
      })
      .then(res => {
        console.log(res.data)
        this.data = res.data
      })
      .catch(e => console.error(e))
    }
  }
}
</script>
