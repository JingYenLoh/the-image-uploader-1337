<template>
  <section class="section">
    <div class="container is-centered">

      <h2 class="subtitle">Response</h2>
      <div class="content">
        <pre>{{ data }}</pre>
      </div>

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
import axios from 'axios'

export default {
  data () {
    return {
      data: null,
      dropFiles: []
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
      const apiKey = 'YOUR-API-KEY' // PUT THE API KEY HERE

      axios.post(`${url}${name}`, this.dropFiles[0], {
        headers: {
          'Ocp-Apim-Subscription-Key': apiKey,
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
