<template>
  <div class="tester">
    <h1>API from Back-end Testing</h1>
    <ul>
      <li v-for="blog in blogs" :key="blog">{{blog}}</li>
    </ul>
    <button @click="posttest">test post</button>
  </div>
</template>

<script>
export default {
  name: 'apitest',
  data () {
    return {
      blogs: {}
    }
  },
  methods: {
    posttest () {
      let data = {
        'username': 'testun',
        'password': 'testpw'
      }
      this.axios.post('/api/posttest', data).then(res => {
        console.log('res: ', res)
      }).catch(err => {
        console.log('error: ', err)
      })
    }
  },
  created () {
    this.axios.get('/api/blogs').then(res => {
      console.log(res)
      this.blogs = res.data.blogs
    }).catch(err => {
      console.log('error: ', err)
    })
  }
}
</script>
