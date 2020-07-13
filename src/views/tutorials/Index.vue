<template>
  <div class="container">
    <tutorial-sidebar v-bind:isMarkdown="false"></tutorial-sidebar>

    <div class="content">
  <!--    <h2>{{ selectData }}</h2>-->
      <div class="lists" v-for="cate in categoryData" :key="cate[0].id">
        <h2><a @click="getCategoryData({id: cate[0].id})">
          <span>{{ cate[0].name }}</span>
        </a></h2>
        <div class="clr"></div>
        <p>{{ cate[0].description }}</p>
      </div>

      <div class="lists" v-if="!categoryData">
        <h2>感谢您的关注！！！</h2>
        <div class="clr"></div>
        <p>此模块暂时没有内容哦！</p>
        <p>感谢您的关注！！！</p>
        <p><a @click="gohome">Read more </a></p>
      </div>
    </div>
  </div>
</template>

<script>
import tutorialSidebar from './tutorial_sidebar'
import {getTutorialsCategory} from '../../api/api'

export default {
  name: 'index',
  components: {
    'tutorial-sidebar': tutorialSidebar,
      // 'MakeTitleMenu': MakeTitleMenu
  },
  data () {
    return {
      // selectData: [],
      categoryData: []
    }
  },

  methods: {
    getCategoryData (params) {
      getTutorialsCategory(params).then((response) => {
        // console.log(response.data)
        this.categoryData = response.data
      })
        .catch(function (error) {
          console.log(error)
        })
    },
    gohome () {
      this.$router.push({name: 'Index'})
    }
  },
  created () {
    this.getCategoryData({})
  }
}
</script>

<style scoped>
.container{
  width: 100%;
  height: 100%;
  /*margin: 100px auto;*/
  /*border: 3px dashed red;*/
  display: inline-block;
}
.content{
  width: auto;
  margin-top: 10px;
  margin-left: 250px;
  position: relative;
}

.lists{
  margin: 10px 20px;
  padding: 1px 20px;
  border-radius: 10px;
  background:#fefefe url(../../static/images/tutorials/post_bg.gif) top repeat-x;
}
</style>
