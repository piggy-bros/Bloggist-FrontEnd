<template>
  <div id="wrapper">
    <div id="user-wrapper">
      <img id="avatar-img" src="../assets/avatar.png">
      <h3>- {{username}} -</h3>
      <h5>Post</h5>
      <h4>{{blog_num}}</h4>
      <div id="edit-wrapper" @click="jumpToEditor">
        <img id="edit-img" src="../assets/edit.png">
      </div>
    </div>
    <div id="blog-wrapper">
      <h1 id="blog-title">{{title}}</h1>
      <div class="blog-like-wrapper" @click="likeBlog">
        <img class="like-icon" src="../assets/like.png">
        <span class="like-num">{{liked}}</span>
      </div>
      <p id="blog-content">{{content}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BlogView',
  data () {
    return {
      username: '',
      blog_num: 0,
      blog_id: '',
      title: '',
      content: '',
      liked: 0
    }
  },
  computed: {
  },
  methods: {
    loadBlog () {
      this.axios.get('/api/user/' + this.username + '/blog/' + this.blog_id + '?token=' + this.$store.state.token).then(res => {
        console.log(res)
        if (res.data.title.length) {
          this.title = res.data.title
          this.content = res.data.content
          this.liked = res.data.liked
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
    jumpToEditor () {
      this.$router.push({
        path: '/' + this.username + '/home/publish'
      })
    },
    likeBlog () {
      this.axios.get('/api/user/' + this.username + '/blog/' + this.blog_id + '/like?token=' + this.$store.state.token).then(res => {
        console.log(res)
        if (res.data.liked) {
          this.liked = res.data.liked
        }
      }).catch(err => {
        console.log('error: ', err)
      })
    }
  },
  created () {
    this.username = this.$route.params.username
    this.blog_num = this.$store.state.blog_num
    this.blog_id = this.$route.params.blogid
    document.title = this.$route.meta.title
    this.loadBlog()
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
#blog-list {
  list-style: none;
}
#blog-list li {
  width: 550px;
  height: 100px;
  padding-top: 10px;
  border-bottom: 2px transparent solid;
  border-image: linear-gradient(to right, #e0e0e0, #aaaaaa, #e0e0e0);
  border-image-slice: 10;
  cursor: pointer;
}
.blog-index {
  color: gray;
  font-size: 50px;
  font-weight: 100;
  float: left;
  margin-left: -20px;
  margin-top: 10px
}
.blog-title {
  max-width: 450px;
  margin-top: 20px;
  margin-left: 20px;
  color: #333333;
  font-size: 16px;
  font-weight: 100;
  text-decoration: underline;
  text-align: left;
  cursor: pointer;
  float: left;
}
.blog-like-wrapper {
  position: relative;
  margin-left: 500px;
}
.like-icon {
  width: 20px;
  vertical-align: middle;
}
.like-num {
  color: #333333;
  font-size: 15px;
}
</style>
