<template>
  <div id="wrapper">
    <h1 id="register-title"> Register </h1>
    <label for="info-username"><div :class="placeholder_class_0">Username</div></label>
    <input class="info-getter focus" @focus="setPlaceHolder(0)" @blur="setPlaceHolderBack(0)" id="info-username" v-model="username" type="text" />
    <label for="info-password"><div :class="placeholder_class_1">Password</div></label>
    <input class="info-getter" @focus="setPlaceHolder(1)" @blur="setPlaceHolderBack(1)" id="info-password" v-model="password" type="password" />
    <label for="info-password-confirm"><div :class="placeholder_class_2">Confirm Passoword</div></label>
    <input class="info-getter" @focus="setPlaceHolder(2)" @blur="setPlaceHolderBack(2)" id="info-password-confirm" v-model="password_confirm" type="password" />
    <button id="submit-btn" :disabled="button_status" type="submit" @click="validAndSubmit">comfirm</button>
    <p id="system-msg" v-show="msg_show">{{msg_content}}</p>
    <p id="bottom-info">Already registered? <a @click="jumpToSignIn">Sign In</a></p>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      username: '',
      password: '',
      password_confirm: '',
      placeholder_class_0: 'placeholder',
      placeholder_class_1: 'placeholder',
      placeholder_class_2: 'placeholder',
      msg_show: false,
      msg_content: {}
    }
  },
  computed: {
    button_status: function () {
      return !(this.username.length && this.password.length && this.password_confirm.length)
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
        case 2:
          this.placeholder_class_2 = 'placeholder placeholder_active'
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
        case 2:
          if (this.password_confirm.length === 0) {
            this.placeholder_class_2 = 'placeholder'
          }
          break
      }
    },
    validAndSubmit () {
      if (this.password !== this.password_confirm) {
        this.showMessage('password not match')
        return
      }
      var reg = /^[a-zA-Z0-9_]{4,16}$/
      if (!reg.test(this.username)) {
        this.showMessage('username should have more than 4~16 characters containing only letters, numbers and underline')
        return
      }
      if (!reg.test(this.password)) {
        this.showMessage('username should have more than 4~16 characters containing only letters, numbers and underline')
        return
      }
      this.showMessage('')
      var userinfo = {
        'username': this.username,
        'password': this.password
      }
      this.axios.post('/api/register', userinfo).then(res => {
        console.log(res)
        if (res.data.status === 'success') {
          this.showMessage('Register Success! Redirecting...')
          setTimeout(this.jumpToSignIn, 3000)
        } else {
          this.showMessage('Register Fail! Username already used...')
        }
      }).catch(err => {
        console.log('error: ', err)
      })
    },
    jumpToSignIn () {
      this.$router.push({
        path: '/signin'
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
  height: 700px;
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
