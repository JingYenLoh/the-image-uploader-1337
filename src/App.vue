<template>
  <section class="section">
    <div class="container is-centered">
      <fuck-you-upload/>
    </div>
  </section>
</template>

<script>
import FuckYouUpload from './components/FuckYouUpload'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: { 
    'fuck-you-upload': FuckYouUpload
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.fields {
  padding-bottom: 16px
}

.input {
  margin-bottom: 8px
}
</style>
