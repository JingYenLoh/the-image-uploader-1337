<template>
  <div class="columns is-centered">
    <div class="column is-half">

      <h1 class="title">Xavier smartlock access manager</h1>

      <b-field>
        <b-upload v-model="dropFiles"
                  accept="image/*"
                  @input="previewImage"
                  drag-drop>
          <section class="hero is-medium">
            <div class="hero-body has-text-centered">
              <p>
                <b-icon icon="upload"
                        size="is-large">
                </b-icon>
              </p>
              <p>Click or drop an image you would like to give access to. Kindly ensure that a face is present in the image.</p>
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

      <div class='columns'>
        <div class='column'>
          <img src="http://paulettealden.com/wp-content/uploads/2017/11/dummy.jpg"
               id="previewImg"
               alt="preview alt">

        </div>
        <div class='column'>
          <div class='fields'>
            <div class='controls'>
              <input class='input is-primary' v-model="name" placeholder="enter name" />
              <input class='input is-primary' type="password" v-model="password" placeholder="enter password">
                <button class="button is-info"
                              :disabled="isDisabled"
                              @click="sendToAzure">Add user</button>
                <button class="button is-danger"
                        :disabled='hasNoPersistedId'
                        @click="removeFromAzure">Remove user</button>


            </div>
          </div>
        </div>
      </div>
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
      response: `Nothing at the moment`,
      persistedId: null,
      name: null,
      password: null
    }
  },
  methods: {
    deleteDropFile (index) {
      this.dropFiles.splice(index, 1)
      document.getElementById('previewImg').setAttribute('src', 'http://paulettealden.com/wp-content/uploads/2017/11/dummy.jpg')

    },
    previewImage() {
      const reader = new FileReader()


      reader.addEventListener('load', function () {
        this.imagePreview = reader.result
        document.getElementById('previewImg').setAttribute('src', reader.result)
      },
      false)
      reader.readAsDataURL(this.dropFiles[0])
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
      const url = 'https://southeastasia.api.cognitive.microsoft.com/face/v1.0/facelists/xavier_demo/persistedFaces?userData='
      const name = this.name 
      const apiKey = 'api key' // PUT THE API KEY HERE

      axios.post(`${url}${name}`, this.dropFiles[0], {
        headers: {
          'Ocp-Apim-Subscription-Key': apiKey,
          'Content-Type': 'application/octet-stream'
        }
      })
      .then(res => {
        this.response = res
        this.status = res.status
        this.persistedId = res.data.persistedFaceId
        this.dropFiles = []
        this.password = ''
        console.log(this.persistedId)
      })
      .catch(e => {
        this.response = e
        this.status = e.response.status
      })
    },
    removeFromAzure() {
      const url = 'https://southeastasia.api.cognitive.microsoft.com/face/v1.0/facelists/xavier_demo/persistedFaces/'
      const apiKey = 'api key' // PUT THE API KEY HERE

      axios.delete(`${url}${this.persistedId}`, {
        headers: {
          'Ocp-Apim-Subscription-Key': apiKey,
          'Content-Type': 'application/octet-stream'
        }
      })
      .then(res => {
        this.response = res
        this.status = res.status
        this.persistedId = null
        document.getElementById('previewImg').setAttribute('src', 'http://paulettealden.com/wp-content/uploads/2017/11/dummy.jpg')
      })
      .catch(e => {
        this.response = e
        this.status = e.response.status
      })

    }
  },
  computed: {
    isDisabled () {
      return this.dropFiles.length === 0 || this.name === null || this.password !== 'xavier'
    },
    hasNoPersistedId () {
      return this.persistedId === null
    }
  }
}
</script>

<style scoped>

</style>
