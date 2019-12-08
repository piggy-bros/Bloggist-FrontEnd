import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user_name: '',
    blog_num: 0,
    token: ''
  }
})

export default store
