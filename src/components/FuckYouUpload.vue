<template>
  <div class="columns is-centered">
    <div class="column is-half">

      <h1 class="title">Sibei amazing upload responder</h1>

      <b-field>
        <b-upload v-model="dropFiles"
                  accept="image/*"
                  drag-drop>
          <section class="hero is-medium">
            <div class="hero-body has-text-centered">
              <p>
                <b-icon icon="upload"
                        size="is-large">
                </b-icon>
              </p>
              <p>Click or drop also can, but only image ah, also MUST HAVE FACE one hor!!! I repeat, MUST HAVE FACE HOR!!</p>
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

      <button class="button is-danger"
              :disabled="isDisabled"
              @click="sendToAzure">Ok steady</button>

      <h2 class="subtitle">Response: {{ status }}</h2>
      <div class="content">
        <pre>{{ response }}</pre>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      status: '',
      dropFiles: [],
      response: `Now got nothing la`
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
      const url = 'https://southeastasia.api.cognitive.microsoft.com/face/v1.0/facelists/iotfaces1/persistedFaces?userData='
      const name = 'kaixiang'
      const apiKey = 'YOUR API KEY' // PUT THE API KEY HERE

      axios.post(`${url}${name}`, this.dropFiles[0], {
        headers: {
          'Ocp-Apim-Subscription-Key': apiKey,
          'Content-Type': 'application/octet-stream'
        }
      })
      .then(res => {
        this.response = res
        this.status = res.response.status
      })
      .catch(e => {
        this.response = e
        this.status = e.response.status
      })
    }
  },
  computed: {
    isDisabled () {
      return this.dropFiles.length === 0
    }
  }
}
</script>

<style scoped>

</style>
