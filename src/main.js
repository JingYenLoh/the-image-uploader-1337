import Vue from 'vue'
import App from './App.vue'

// Buefy
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

Vue.use(Buefy)

new Vue({
  el: '#app',
  render: h => h(App)
})
