<template>
  <div id="app">
    <img id="title_img" src="./assets/title.png" @click="gohome">
    <router-view/>
  </div>
</template>

<script>
import ApiTest from './components/ApiTest'
import Register from './components/Register'
import SignIn from './components/SignIn'
import Home from './components/Home'
import BlogView from './components/BlogView'
import EditorView from './components/EditorView'
export default {
  name: 'App',
  components: {
    ApiTest,
    Register,
    SignIn,
    Home,
    BlogView,
    EditorView
  },
  methods: {
    gohome () {
      this.$router.push({
        path: '/' + this.$store.state.username + '/home'
      })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#title_img {
  margin-top: -50px;
  width: 500px;
}
</style>
