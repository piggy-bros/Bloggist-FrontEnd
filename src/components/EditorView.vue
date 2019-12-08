<template>
  <div id="wrapper">
    <div id="user-wrapper">
      <img id="avatar-img" src="../assets/avatar.png">
      <h3>- {{username}} -</h3>
      <h5>Post</h5>
      <h4>{{blog_num}}</h4>
      <div id="edit-wrapper" @click="publish">
        <img id="edit-img" src="../assets/edit.png">
        <span>publish</span>
      </div>
    </div>
    <div id="blog-wrapper">
      <input class="blog-getter" type="text" placeholder="Title" v-model="blog_title">
      <textarea class="blog-getter" rows="100" cols="50" v-model="blog_content" @blur="refillPlaceHolder"></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      username: '',
      blog_num: 0,
      blog_title: '',
      blog_content: 'My Blog Content...'
    }
  },
  methods: {
    refillPlaceHolder () {
      if (this.blog_content.length === 0) {
        this.blog_content = 'My Blog Content...'
      }
    },
    publish () {
      var blog = {
        'title': this.blog_title,
        'content': this.blog_content
      }
      this.axios.post('/api/user/' + this.username + '/publish?token=' + this.$store.state.token, blog).then(res => {
        console.log(res)
        this.$store.state.blog_num += 1
        this.jumpToHome()
      }).catch(err => {
        console.log('error: ', err)
      })
    },
    jumpToHome () {
      this.$router.push({
        path: '/' + this.username + '/home'
      })
    }
  },
  created () {
    console.log(this.$store.state)
    this.username = this.$route.params.username
    this.blog_num = this.$store.state.blog_num
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
  margin: auto;
  margin-top: 20px;
  width: 810px;
  left: 0;
  right: 0;
  border-radius: 20px;
}
#user-wrapper {
  background-color: white;
  width: 200px;
  height: 250px;
  float: left;
}
#user-wrapper h3 {
  position: relative;
  margin-bottom: -10px;
}
#user-wrapper h5 {
  position: relative;
  margin-bottom: -15px;
}
#user-wrapper h4 {
  text-decoration: underline;
}
#edit-wrapper {
  width: 100%;
  height: 50px;
  margin-top: -10px;
  border-top: 1px transparent solid;
  border-image: linear-gradient(to right, white, #e0e0e0, white);
  border-image-slice: 10;
  background-color: white;
  cursor: pointer;
}
#edit-wrapper:hover {
  background-color: #f5f5f5;
}
#edit-img {
  width: 20px;
  margin-top: 10px;
}
#avatar-img {
  width: 60px;
  margin-top: 20px;
}
#blog-wrapper {
  background-color: #e0e0e0;
  width: 600px;
  height: 800px;
  margin-left: 210px;
  overflow: scroll;
}
.blog-getter {
  color: gray;
  display: block;
  outline: none;
  font-size: 15px;
  width: 90%;
  height: 20px;
  margin: auto;
  left: 0;
  right: 0;
  padding: 5px;
  margin-top: 20px;
  border: none;
  border-bottom: 2px gray solid;
  background: none;
}
textarea.blog-getter {
  transition: 0s;
  max-width: 90%;
}
.blog-getter:focus {
  border-bottom: 2px black solid;
}
</style>
