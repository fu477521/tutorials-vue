<template>
  <div class="container">
    <keep-alive>
      <tutorial-sidebar class="left-sidebar"></tutorial-sidebar>
    </keep-alive>
    
    <div class="content">
      <!--    <h2>{{ selectData }}</h2>-->
      <div class="lists" v-for="article in listData" :key="article.id">
  <!--      <a @click="getCategoryData({id: cate.id})">{{ cate.title }}</a>-->
        <router-link :to="'/tutorials/detail/' + article.id" class="article-link">{{ article.title }}</router-link>
        <div class="clr"></div>
        <span>[{{ article.created_time }}] / [{{ article.updated_time }}]</span>
        <p>{{ article.description }}</p>
      </div>

      <div class="lists" v-if="!listData">
        <h2>感谢您的关注！暂无内容！</h2>
        <p><a @click="gohome">Read more </a></p>
      </div>
      <Pagination class="pagination" pre-text="上页" next-text="下页" end-show="false" :page="curPage" :total-page='totalPage' @pagefn="pagefn"></Pagination>
    </div>
  </div>

</template>

<script>
import tutorialSidebar from './tutorial_sidebar'
import Pagination from '../../components/Pagination'
import {listArticle} from '../../api/api'

export default {
  name: 'index',
  // props: [
  //   'selectData'
  // ],
  data () {
    return {
      categoryId: '', // 当前选择的类别id
      curPage: 1, // 当前页码
      total: 0, // 文章总数量
      listData: [] // 选择类别的列表数据
    }
  },
  computed: {
    totalPage(){
      return  Math.ceil(this.total/10)
    }
  },
  components: {
    'Pagination': Pagination,
    'tutorial-sidebar': tutorialSidebar
  },
  methods: {
    getListArticle () {
      this.categoryId = this.$route.params.categoryId
      listArticle({
        page: this.curPage, //当前页码
        category_id: this.categoryId
      })
        .then((response) => {
        // console.log('===>', response.data)
        this.listData = response.data.data
        this.total = response.data.total
      })
    },
    gohome () {
      this.$router.push({name: 'Index'})
    },
    pagefn(value){//点击分页
      this.curPage = value.page;
      this.getListArticle()
    }
  },
  created () {
    // this.getCategoryData({})
    this.getListArticle()
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
  /*position: relative;*/
  /*background: #eeeeee url("../../static/images/tutorials/circuit.png") top repeat-x;*/
}
.content{
  width: auto;
  margin-top: 10px;
  margin-left: 250px;
  /*border: 3px solid green;*/
  position: relative;
  /*float: left;*/
}

.lists{
  height: 60px;
  /*border: 2px solid #ccc;*/
  margin: 10px 10px;
  padding: 3px 20px;
  border-radius: 10px;
  background:#fefefe url(../../static/images/tutorials/post_bg.gif) top repeat-x;
}
.article-link {
  color: #708090;
}
.article-link:hover{
  color: #fa8341;
}
.pagination{
  width: 400px;
  /*把元素变成定位元素*/
  /*position:absolute;*/
  /*设置元素的定位位置，距离上、下、左、右都为0*/
  left:0;
  right:0;
  /*top:0;*/
  /*bottom:0;*/
  /*设置元素的margin样式值为 auto*/
  margin:auto;
}
span{
  float: right;
  font-size: 10px;
}
</style>
