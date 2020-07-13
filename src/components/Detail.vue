<template>
  <div class="detail">
    <div class="content" v-bind="articleData">
      <h2><span>{{ articleData.title }}</span></h2>
      <div class="clr"></div>
      <div v-if="articleData.edit_mode===2">
        <p v-html="articleData.content"></p>
      </div>
      <div v-else>
        <p v-html="markdownContent" v-highlight></p>
      </div>

      <div class="previous-item">
        <input type="button" value="上一篇" @click="switchClick(previousData.id)">
        <span> : <a @click="switchClick(previousData.id)">{{previousData.title}}</a></span>
      </div>
      <div class="next-item">
        <input type="button" value="下一篇" @click="switchClick(nextData.id)">
        <span> : <a @click="switchClick(nextData.id)">{{nextData.title}}</a></span>
      </div>
    </div>

    <div class="content" v-if="!articleData">
      <h2>感谢您的关注！！！</h2>
      <div class="clr"></div>
      <p>此模块暂时没有内容哦！</p>

      <p>感谢您的关注！！！</p>
      <p><a href="#">Read more </a></p>
    </div>
  </div>
</template>

<script>
  import marked from 'marked'
import {getPost, getNote, getArticle} from '../api/api'

export default {
  name: 'detail',
  data () {
    return {
      articleId: 0,
      articleData: {},
      nextData: {},
      previousData: {},
    }
  },
  computed :{
    markdownContent () {
      if (this.articleData.content) {
        return marked(this.articleData.content)
      }
    }
  },
  methods: {
    getData (id) {
      var site_type = this.$route.matched[0].path
      if (site_type==='/blogs') {
        getPost(id).then((response) => {
          // console.log(response.data)
          this.articleData = response.data.result
          this.nextData = response.data.next || {'id': 0, 'title': '没有下一篇了'}
          this.previousData = response.data.previous || {'id': 0, 'title': '没有上一篇了'}
        })
          .catch(function (error) {
            console.log(error)
          })
      }
      if (site_type==='/forums') {
        getNote(id).then((response) => {
          console.log(response.data)
          this.articleData = response.data.result
          this.nextData = response.data.next || {'id': 0, 'title': '没有下一篇了'}
          this.previousData = response.data.previous || {'id': 0, 'title': '没有上一篇了'}
        })
          .catch(function (error) {
            console.log(error)
          })
      }
      if (site_type==='/tutorials') {
        getArticle(id).then((response) => {
          console.log(response.data)
          this.articleData = response.data.result
          this.nextData = response.data.next || {'id': 0, 'title': '没有下一篇了'}
          this.previousData = response.data.previous || {'id': 0, 'title': '没有上一篇了'}
        })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    switchClick (id) {
      var site_type = this.$route.matched[0].path
      if (site_type === '/blogs') {
        this.$router.push({name: 'blogsDetail', params: { articleId: id }})
      }
      if (site_type === '/forums') {
        this.$router.push({name: 'forumsDetail', params: { articleId: id }})
      }
      if (site_type === '/tutorials') {
        // this.$router.push({path:`/tutorials/detail/${id}`})
        this.$router.push({name: 'tutorialsDetail', params: { articleId: id }})
        // this.$router.push({name: 'about'})
      }
    }

  },
  created () {
    this.articleId = this.$route.params.articleId
    this.getData(this.articleId)
  },
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
      console.log(this.$route);
      this.articleId = to.params.articleId;
      this.getArticleData(this.articleId)
    }
  },
  // beforeRouteUpdate (to, from, next) {
  //   // react to route changes...
  //   // don't forget to call next()
  //   console.log(to)
  //   this.articleId = to.params.articleId
  //   this.getArticleData(this.articleId)
  //   next()
  // }
}
</script>

<style scoped>

.content{
  text-align: left;
  margin: 1px 20px;
  padding: 1px 20px;
  border-radius: 10px;
  background:#fefefe url(../static/images/tutorials/post_bg.gif) top repeat-x;
}
a:hover{
  color: #fa8341;
  cursor: pointer;
}
</style>
