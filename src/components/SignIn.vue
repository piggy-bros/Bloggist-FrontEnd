<template>
  <div id="wrapper">
    <h1 id="register-title"> Sign In </h1>
    <label for="info-username"><div :class="placeholder_class_0">Username</div></label>
    <input class="info-getter focus" @focus="setPlaceHolder(0)" @blur="setPlaceHolderBack(0)" id="info-username" v-model="username" type="text" />
    <label for="info-password"><div :class="placeholder_class_1">Password</div></label>
    <input class="info-getter" @focus="setPlaceHolder(1)" @blur="setPlaceHolderBack(1)" id="info-password" v-model="password" type="password" />
    <button id="submit-btn" :disabled="button_status" type="submit" @click="signin">comfirm</button>
    <p id="system-msg" v-show="msg_show">{{msg_content}}</p>
    <p id="bottom-info">Have no account yet? <a @click="jumpToRegister">Register</a></p>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data () {
    return {
      username: '',
      password: '',
      placeholder_class_0: 'placeholder',
      placeholder_class_1: 'placeholder',
      msg_show: false,
      msg_content: {}
    }
  },
  computed: {
    button_status: function () {
      return !(this.username.length && this.password.length)
    }
  },
  methods: {
    showMessage (msg) {
      this.msg_show = true
      this.msg_content = msg
    },
    setPlaceHolder (index) {
      switch (index) {
        case 0:
          this.placeholder_class_0 = 'placeholder placeholder_active'
          break
        case 1:
          this.placeholder_class_1 = 'placeholder placeholder_active'
          break
      }
    },
    setPlaceHolderBack (index) {
      switch (index) {
        case 0:
          if (this.username.length === 0) {
            this.placeholder_class_0 = 'placeholder'
          }
          break
        case 1:
          if (this.password.length === 0) {
            this.placeholder_class_1 = 'placeholder'
          }
          break
      }
    },
    signin () {
      var userinfo = {
        'username': this.username,
        'password': this.password
      }
      this.axios.post('/api/login', userinfo).then(res => {
        console.log(res)
        if (res.data.status === 'success') {
          this.showMessage('Sign In Success! Redirecting...')
          this.$store.state.blog_num = res.data.blog_num
          this.$store.state.username = this.username
          this.$store.state.token = res.data.token_string
          setTimeout(this.jumpToHome, 3000)
        } else {
          this.showMessage('Sign In Fail! Wrong username or password...')
        }
      }).catch(err => {
        console.log('error: ', err)
      })
    },
    jumpToHome () {
      this.$router.push({
        path: '/' + this.username + '/home'
      })
    },
    jumpToRegister () {
      this.$router.push({
        path: '/register'
      })
    }
  },
  created () {
    document.title = this.$route.meta.title
  }
}
</script>

<style lang="css" scoped>
* {
  transition: 0.5s;
}
#wrapper {
  position: relative;
  background-color: white;
  width: 500px;
  height: 600px;
  margin: auto;
  left: 0;
  right: 0;
  border-radius: 20px;
}
#register-title {
  position: relative;
  top: 60px;
  margin-bottom: 120px;
}
.info-getter {
  display: block;
  outline: none;
  font-size: 15px;
  width: 300px;
  height: 20px;
  margin: auto;
  left: 0;
  right: 0;
  padding: 5px;
  margin-bottom: 50px;
  border: none;
  border-bottom: 2px gray solid;
  background: none;
}
.info-getter:focus {
  border-bottom: 2px black solid;
}
#submit-btn {
  color: white;
  font-size: 15px;
  font-weight: bold;
  width: 310px;
  height: 50px;
  margin-top: 20px;
  border: none;
  outline: none;
  background: linear-gradient(to bottom, #555555, black)
}
.placeholder {
  z-index: 1;
  color: gray;
  position: relative;
  top: 20px;
  left: 100px;
  text-align: left;
}
.placeholder_active {
  color: black;
  top: -10px;
}
#system-msg {
  color: red;
  font-size: 14px;
}
#bottom-info {
  font-size: 14px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10px;
}
#bottom-info a {
  color: skyblue;
  cursor: pointer;
}
</style>
