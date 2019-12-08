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
      <ul id="blog-list">
        <li v-for="(blog, index) in blogs" :key="index" @click="jumpToBlog(blog.blogid)">
          <span class="blog-index">·{{index}}·</span>
          <span class="blog-title">{{blog.title}}</span>
          <div class="blog-like-wrapper">
            <img class="like-icon" src="../assets/like.png">
            <span class="like-num">{{blog.liked}}</span>
          </div>
        </li>
      </ul>
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
      blogs: []
    }
  },
  computed: {
  },
  methods: {
    loadBlogs () {
      this.axios.get('/api/user/' + this.username + '/blogs?token=' + this.$store.state.token).then(res => {
        console.log(res)
        this.blogs = []
        if (res.data.status !== 'fail' && res.data.blogs) {
          for (let i = 0; i < res.data.blogs.length; ++i) {
            this.blogs.push({
              'title': res.data.blogs[i],
              'liked': res.data.liked[i],
              'blogid': res.data.blog_ids[i]
            })
          }
        }
      }).catch(err => {
        console.log('error: ', err)
      })
    },
    jumpToBlog (blogid) {
      console.log(blogid)
      this.$router.push({
        path: '/' + this.username + '/home/blogs/' + blogid
      })
    },
    jumpToEditor () {
      this.$router.push({
        path: '/' + this.username + '/home/publish'
      })
    }
  },
  created () {
    this.username = this.$route.params.username
    this.blog_num = this.$store.state.blog_num
    document.title = this.$route.meta.title
    this.loadBlogs()
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
  margin-top: 30px;
  margin-left: 20px;
  color: #333333;
  font-size: 20px;
  font-weight: 100;
  text-decoration: underline;
  text-align: left;
  cursor: pointer;
  float: left;
}
.blog-like-wrapper {
  position: relative;
  margin-top: 70px;
  margin-left: 400px;
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
